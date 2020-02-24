<template>
<div>
  <h3>{{ title }}</h3>
  <h4>{{ message }} {{ stockMoney }}</h4>
  <table border="1">
      <tr>
        <th>{{ tableDate }}</th>
        <th>{{ tableSendAmount }}</th>
        <th>{{ tableStockAmount }}</th>
      </tr>
      <tr>
        <td>{{ date }}</td>
        <td>{{ sendAmount }}</td>
        <td>{{ stockAmount }}</td>
      </tr>      
    </table>
    <button>{{ button }}</button>
</div>
</template>

<script>
export default {
  data: function(){
    return {
      title: '残高照会画面',
      message: '口座残高：',
      tableDate: '日付',
      tableSendAmount: '振込額',
      tableStockAmount: '預入額',
      date: '2020-01-01',
      sendAmount: '1,000',
      stockAmount: '10,000',
      stockMoney: '1,000,000',
      button: 'お振込みへ'
    };
  }
}
</script>