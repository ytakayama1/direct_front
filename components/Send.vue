<template>
<div>
  <h3>{{ title }}</h3>
  <table>
    <tr>
      <th>振込額：</th>
      <td><input type="number" v-model="sendAmount"></td>
    </tr>
  </table>
  <button v-on:click="send">{{ button }}</button>
</div>
</template>

<script>
export default {
  data: function(){
    return {
      title: '振込画面',
      message: '振込額：',
      button: '振込実行',
      sendAmount: ''
    };
  },
  methods:{
    send: function(){
      console.log('INFO: 振込処理開始');
      console.log('DEBUG: 振込額：' + this.sendAmount);

      // 振込APIをリクエスト
      axios.post(
        baseUrl + 'send',
        {
          custNo:this.$store.state.custInfo,
          sendAmount: this.sendAmount,
          sendCustNo: this.sendCustNo
        }
      )
      .then(response => {
        console.log('INFO: 振込API成功');
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

      window.alert('振込が完了しました　振込金額：' + this.sendAmount + '円');

      // 残高照会画面へ遷移
      this.$router.push('show');
    }
  }  
}
</script>