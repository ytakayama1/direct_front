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
      console.log('DEBUG: お客様番号：' + this.inputCustNo);

      // ログイン認証APIをリクエスト
      axios.post(
        baseUrl + 'users',
        {
          custNo: this.inputCustNo,
          password: this.inputPassword
        }
      )
      .then(response => {
        console.log('INFO: POST成功');
      })
      .catch(function (error) {
        if(error.response) {
          console.log('DEBUG: error : ' + error.response);
          this.$router.push('/login');
          return;
        }else if(error.request){
          console.log('DEBUG: error request : ' + error.request);
          this.$router.push('/login');
        }else{
          console.log('ERROR: error message : ' + error.message);
          this.$router.push('/login');
        }
      });

      // 残高照会APIをリクエスト
      axios.post(
        baseUrl + 'users',
        {
          custNo: this.inputCustNo
        }
      )
      .then(response => {
        console.log('INFO: 口座情報取得成功');
        console.log('DEBUG: response : ' + response.data);
        // 口座情報をストアに保存
        this.$store.commit('storeCustInfo', response.data);
        console.log('DEBUG: ストアに口座情報を保存：' + response.data);
      }) 
      .catch(function(error){
        if(error.response){
          console.log('DEBUG: error : ' + error.response);
        }else if(error.request){
          console.log('DEBUG: error request : ' + error.request);
        }else{
          console.log('ERROR: error message : ' + error.message);
        }
      });

      // 取引履歴取得APIをリクエスト
      axios.post(
        baseUrl + 'histories',
      {
        custNo: this.inputCustNo
      })
      .then(response => {
        console.log('INFO: 取引履歴取得成功');
        console.log('DEBUG: response : ' + response.data);
        // 取引履歴をストアに保存
        this.$store.commit('storeHistoryInfo', response.data);
        console.log('DEBUG: ストアに取引履歴を保存：' + response.data);
      })
      .catch(function(error){
        if(error.response){
          console.log('DEBUG: error : ' + error.response);
        }else if(error.request){
          console.log('DEBUG: error request : ' + error.request);
        }else{
          console.log('ERROR: error message : ' + error.message);
        }
      });

      // 残高照会画面へ遷移
      this.$router.push('/show');
    }
  }
}
</script>