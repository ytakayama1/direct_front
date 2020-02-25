<template>
<div>
  <h3>{{ title }}</h3>
  <h4>{{ message }} {{ $store.state.custInfo }}</h4>
  <table border="1">
      <tr>
        <th>{{ tableDate }}</th>
        <th>{{ tableSendAmount }}</th>
        <th>{{ tableStockAmount }}</th>
      </tr>
      <tr v-for="history in $store.state.historyInfo">
        <td>{{ history.DATE }}</td>
        <td>{{ history.DEPOSIT_AMOUNT }}</td>
        <td>{{ history.STOCK_AMOUNT }}</td>
      </tr>      
    </table>
    <button v-on:click="send">{{ button }}</button>
</div>
</template>

<script>
let axios = require('axios');
let baseUrl = process.env.baseUrl;

export default {
  data: function(){
    return {
      title: '残高照会画面',
      message: '口座残高：',
      tableDate: '日付',
      tableSendAmount: '振込額',
      tableStockAmount: '預入額',
      stockMoney: '',
      button: 'お振込みへ',
      storeValue: ''
    };
  },
  methods:{
    send: function(){
      console.log('INFO: 振込先選択画面へ');

      // 振込先選択画面へ遷移
      this.$router.push('/select');
    }
  }  
}
</script>