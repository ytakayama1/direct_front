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
let baseUrl = '';

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

      // POSTリクエスト送信
      axios.post(baseUrl, {
        custNo: this.inputCustNo,
        password: this.inputPassword
      })
      // レスポンス
      .then(response => {
        console.log('INFO: POST成功');
      })
      // 例外処理
      .catch(function (error) {
        if(error.response) {
          console.log('DEBUG: error status : ' + error.response.status);
          console.log('DEBUG: error status text : ' + error.response.statusText);
          consoel.log('DEBUG: error headers : ' + error.response.headers);
        }else if(error.request){
          console.log('DEBUG: error request : ' + error.request);
        }else{
          console.log('DEBUG: error message : ' + error.message);
        }
      });

            
    }
  }
}
</script>