<template>
<div>
  <h3>{{ title }}</h3>
  <table border="1">
      <tr>
        <th>{{ tableRadio }}</th>
        <th>{{ tableSendCustName }}</th>
      </tr>
      <tr>
        <td><input type="radio" v-bind:name="$store.state.custInfo[0].REGISTED_CUST_1"></td>
        <td>{{ $store.state.custInfo[0].REGISTED_CUST_1 }}</td>
      </tr>
      <tr>
        <td><input type="radio" v-bind:name="$store.state.custInfo[0].REGISTED_CUST_2"></td>
        <td>{{ $store.state.custInfo[0].REGISTED_CUST_2 }}</td>
      </tr>
      <tr>
        <td><input type="radio" v-bind:name="$store.state.custInfo[0].REGISTED_CUST_3"></td>
        <td>{{ $store.state.custInfo[0].REGISTED_CUST_3 }}</td>
      </tr>
      <tr>
        <td><input type="radio" v-bind:name="$store.state.custInfo[0].REGISTED_CUST_4"></td>
        <td>{{ $store.state.custInfo[0].REGISTED_CUST_4 }}</td>
      </tr>
      <tr>
        <td><input type="radio" v-bind:name="$store.state.custInfo[0].REGISTED_CUST_5"></td>
        <td>{{ $store.state.custInfo[0].REGISTED_CUST_5 }}</td>
      </tr>
    </table>
    <button v-on:click="next">{{ button }}</button>
</div>
</template>

<script>
export default {
  data: function(){
    return {
      title: '振込先選択画面',
      message: '口座残高：',
      tableRadio: '選択',
      tableSendCustName: '振込先',
      button: '次へ'
    };
  },
  methods:{
    next: function(){
      console.log('INFO: 振込金額入力画面へ');

      console.log('DEBUG: 振込先お客様番号：' + this.$store.state.custInfo[0].REGISTED_CUST_1);

      // 振込画面へ遷移
      this.$router.push('/send');
    }
  }  
}
</script>