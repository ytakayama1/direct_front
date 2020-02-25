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
let baseUrl = 'http://localhost:3333/';

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
    /**
     * ログインリクエストを送る処理
     */
    login: function(){
      console.log('INFO: ログイン処理開始');
      console.log('DEBUG: お客様番号：' + this.inputCustNo);

      // // POSTリクエスト送信
      // axios.post(baseUrl + 'users', {
      //   custNo: this.inputCustNo,
      //   password: this.inputPassword
      // })
      // // レスポンス
      // .then(response => {
      //   console.log('INFO: POST成功');
      // })
      // // 例外処理
      // .catch(function (error) {
      //   if(error.response) {
      //     console.log('DEBUG: error status : ' + error.response.status);
      //     console.log('DEBUG: error status text : ' + error.response.statusText);
      //     console.log('DEBUG: error headers : ' + error.response.headers);
      //   }else if(error.request){
      //     console.log('DEBUG: error request : ' + error.request);
      //   }else{
      //     console.log('ERROR: error message : ' + error.message);
      //   }
      // });

      // 口座情報を取得
      axios.get(baseUrl + 'users?' + 'CUST_NO=' + this.inputCustNo)
      .then(response => {
        console.log('INFO: 口座情報取得成功');
        console.log('DEBUG: response : ' + response.data);
        // 口座情報をストアに保存
        this.$store.commit('storeCustInfo', response.data);
        console.log('DEBUG: ストアに口座情報を保存：' + response.data);
      })
      .catch(function(error){
        if(error.response){
          console.log('DEBUG: error status : ' + error.response.status);
          console.log('DEBUG: error status text : ' + error.response.statusText);
          console.log('DEBUG: error headers : ' + error.response.headers);
        }else if(error.request){
          console.log('DEBUG: error request : ' + error.request);
        }else{
          console.log('ERROR: error message : ' + error.message);
        }
      });

      // 取引履歴を取得
      axios.get(baseUrl + 'histories?' + 'CUST_NO=' + this.inputCustNo)
      .then(response => {
        console.log('INFO: 取引履歴取得成功');
        console.log('DEBUG: response : ' + response.data);
        // 取引履歴をストアに保存
        this.$store.commit('storeHistoryInfo', response.data);
        console.log('DEBUG: ストアに取引履歴を保存：' + response.data);
      })
      .catch(function(error){
        if(error.response){
          console.log('DEBUG: error status : ' + error.response.status);
          console.log('DEBUG: error status text : ' + error.response.statusText);
          console.log('DEBUG: error headers : ' + error.response.headers);
        }else if(error.request){
          console.log('DEBUG: error request : ' + error.request);
        }else{
          console.log('ERROR: error message : ' + error.message);
        }
      })

      // 残高照会画面へ遷移
      this.$router.push('/show');
    }
  }
}
</script>