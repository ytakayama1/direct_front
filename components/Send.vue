<template>
<div>
  <h3>{{ title }}</h3>
  <table>
    <tr>
      <th>振込額</th>
      <td><input type="number" v-model="sendAmount"></td>
    </tr>
    <tr>
      <th>振込先お客様番号</th>
      <td>{{ $store.state.sendCustNo }}</td>
      </tr>
  </table>
  <button v-on:click="send">{{ button }}</button>
</div>
</template>

<script>
const axios = require('axios');
let baseUrl = process.env.baseUrl;

export default {
  data: function(){
    return {
      title: '振込画面',
      message: '振込額：',
      button: '振込実行',
      sendAmount: '',
    };
  },
  methods:{
    send: function(){
      console.log('INFO: 振込処理開始');
      console.log('DEBUG: 振込額：' + this.sendAmount);

      // 振込APIをリクエスト
      console.log('INFO: 振込API実行');
      let sendParams = new URLSearchParams();
      sendParams.append('custNo', this.$store.state.custInfo.CUST_NO,);
      sendParams.append('sendAmount', this.sendAmount);
      sendParams.append('sendCustNo', this.$store.state.sendCustNo);
      axios.post(baseUrl + 'send', sendParams)
        .then(response => {
          console.log('INFO: 振込完了');
          window.alert('振込が完了しました　振込金額：' + this.sendAmount + '円');

          // 残高照会APIをリクエスト
          console.log('INFO: 残高照会APIリクエスト実行');
          let showParams = new URLSearchParams();
          showParams.append('custNo', this.$store.state.custInfo.CUST_NO);
          axios.post(baseUrl + 'show', showParams)
            .then(response => {
              console.log('DEBUG: 残高照会結果：' + response.data);
              // 口座情報をストアに保存
              this.$store.commit('storeCustInfo', response.data);
              console.log('INFO: ストアに口座情報を保存');

              // 取引履歴取得APIをリクエスト
              console.log('INFO: 取引履歴取得APIリクエスト実行');
              let historyParams = new URLSearchParams();
              historyParams.append('custNo', this.$store.state.custInfo.CUST_NO);
              axios.post(baseUrl + 'history', historyParams)
                .then(response => {
                  console.log('DEBUG: 取引履歴取得結果：' + response.data);
                  // 取引履歴をストアに保存
                  this.$store.commit('storeHistoryInfo', response.data);  

                  // 登録済振込先を取得
                  let registedCustParams = new URLSearchParams();
                  registedCustParams.append('custNo', this.$store.state.custInfo.CUST_NO);
                  axios.post(baseUrl + 'registedCust', registedCustParams)
                    .then(response => {
                      console.log('DEBUG: 登録済振込先取得結果：' + response.data);
                      // 振込先情報をストアに保存
                      this.$store.commit('storeRegistedCusts', response.data);
                      // 残高照会画面へ遷移
                      this.$router.push('/show');

                    }).catch(error => {
                      console.log('ERROR @登録済振込先取得API：' + error);
                      // 残高照会画面へ遷移
                      this.$router.push('/show');
                    })
                }).catch(error => {
                  console.log('ERROR @取引履歴取得API：' + error);
                  // 残高照会画面へ遷移
                  this.$router.push('/show');
                })
            }).catch(error => {
              console.log('ERROR @残高照会API：' + error);
              // 残高照会画面へ遷移
              this.$router.push('/show');
            })
      }).catch(error => {
        console.log('ERROR: ' + error);
        // 残高照会画面へ遷移
        window.alert('振込が失敗しました');
        this.$router.push('show');
      })
    }
  }  
}
</script>