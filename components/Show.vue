<template>
<div>
  <h3>{{ title }}</h3>
  <h4>{{ message }} {{ $store.state.custInfo[0].AMOUNT }}</h4>
  <table border="1">
      <tr>
        <th>{{ tableDate }}</th>
        <th>{{ tableSendAmount }}</th>
        <th>{{ tableStockAmount }}</th>
      </tr>
      <tr v-for="history in histories">
        <td>{{ history.DATE }}</td>
        <td>{{ history.DEPOSIT_AMOUNT }}</td>
        <td>{{ history.STOCK_AMOUNT }}</td>
      </tr>      
    </table>
    <button v-on:click="send">{{ button }}</button>
    <p>顧客情報ストア：{{ $store.state.custInfo }}</p>
    <p>取引履歴ストア：{{ $store.state.historyInfo }}</p>
</div>
</template>

<script>
let axios = require('axios');
let baseUrl = 'http://localhost:3333/';

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
  props: {
    histories: Array,
    user: Array
  },
  methods:{
    send: function(){
      console.log('INFO: 振込画面へ');

      console.log('DEBUG: this.$store.state.custNo : ' + this.$store.state.custNo);

      let url = baseUrl + 'histories';
      let result = axios.get(url)
      .then(response => {
        console.log('DEBUG: DATE : ' + response.data[0].DATE);
      })
      .catch(function(error){
        console.log('ERROR: ' + error);
      });
      
    }
  }  
}
</script>