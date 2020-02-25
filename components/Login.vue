<template>
<div>
  <h3>{{ title }}</h3>
  <table>
      <tr>
        <td>{{ custNo }}</td>
        <td><input type="text" v-model="inputCustNo"></td>
      </tr>
      <tr>
        <td>{{ password }}</td>
        <td><input type="password" v-model="inputPassword"></td>
      </tr>
    </table>
      <button v-on:click="login">{{ btn }}</button>
</div>

</template>

<script>
const axios = require('axios');
let baseUrl = process.env.baseUrl;

export default {
  data: function(){
    return {
      title: 'ログイン画面',
      custNo: 'お客様番号',
      password: 'パスワード',
      inputCustNo: '',
      inputPassword: '',
      btn: 'ログイン'
    };
  },
  methods: {
    login: function(){

      console.log('INFO: ログイン処理開始');

      let custNo = this.inputCustNo;
      let password = this.inputPassword;
      
      console.log('DEBUG: お客様番号：' + this.inputCustNo);

      // ログイン認証APIをリクエスト
      console.log('INFO: ログイン認証APIリクエスト実行');
      console.log('DEBUG: リクエスト先URI：' + baseUrl + 'login');

      let loginParams = new URLSearchParams();
      loginParams.append('custNo', custNo);
      loginParams.append('password', password);
      axios.post(baseUrl + 'login', loginParams)
        .then(response => {
          console.log('DEBUG: 認証結果：' + response.data);

          // 残高照会APIをリクエスト
          console.log('INFO: 残高照会APIリクエスト実行');
          let showParams = new URLSearchParams();
          showParams.append('custNo', custNo);
          axios.post(baseUrl + 'show', showParams)
            .then(response => {
              console.log('DEBUG: 残高照会結果：' + response.data);
              // 口座情報をストアに保存
              this.$store.commit('storeCustInfo', response.data);
              console.log('INFO: ストアに口座情報を保存');

              // 取引履歴取得APIをリクエスト
              console.log('INFO: 取引履歴取得APIリクエスト実行');
              let historyParams = new URLSearchParams();
              historyParams.append('custNo', custNo);
              axios.post(baseUrl + 'history', historyParams)
                .then(response => {
                  console.log('DEBUG: 取引履歴取得結果：' + response.data);
                  // 取引履歴をストアに保存
                  this.$store.commit('storeHistoryInfo', response.data);  

                  // 残高照会画面へ遷移
                  this.$router.push('/show');

                }).catch(error => {
                  console.log('ERROR: 取引履歴取得API：' + error);
                })
            }).catch(error => {
              console.log('ERROR: 残高照会API：' + error);
            })
        }).catch(error => {
          console.log('ERROR: ログイン認証API：' + error);
        });

      // axios.post(
      //   baseUrl + 'login',
      //   {
      //     custNo: this.inputCustNo,
      //     password: this.inputPassword
      //   }
      // ).then(response => {
      //   // 残高照会APIをリクエスト
      //   console.log('INFO: 残高照会APIリクエスト実行');
      //   console.log('DEBUG: リクエスト先URI：' + baseUrl + 'show');
      //   axios.post(
      //     baseUrl + 'show',
      //     {
      //       custNo: this.inputCustNo
      //     }
      //   ).then(response => {
      //     console.log('INFO: 口座情報取得成功');
      //     // console.log('DEBUG: response : ' + response.data);
          
      //     // 口座情報をストアに保存
      //     this.$store.commit('storeCustInfo', response.data);
      //     console.log('INFO: ストアに口座情報を保存');

      //     // 取引履歴取得APIをリクエスト
      //     console.log('INFO: 取引履歴取得APIリクエスト実行');
      //     console.log('DEBUG: リクエスト先URI：' + baseUrl + 'history');
      //     axios.post(
      //       baseUrl + 'history',
      //     {
      //       custNo: this.inputCustNo
      //     }).then(response => {
      //       console.log('INFO: 取引履歴取得成功');
      //       // console.log('DEBUG: response : ' + response.data);
      //       // 取引履歴をストアに保存
      //       this.$store.commit('storeHistoryInfo', response.data);
      //       console.log('INFO: ストアに取引履歴を保存');

      //       // 残高照会画面へ遷移
      //       this.$router.push('/show');

      //     }).catch(function(error){
      //       console.log('ERROR 取引履歴取得API：' + error);
      //     });
      //   }).catch(function(error){
      //     console.log('ERROR 残高照会API：' + error);
      //   });
      // }).catch(function(error){
      //   console.log('ERROR ログイン認証API：' + error);
      // });
    }
  }
}
</script>