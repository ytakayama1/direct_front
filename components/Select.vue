<template>
<div>
  <h3>{{ title }}</h3>
  <table border="1">
      <tr>
        <th>{{ tableRadio }}</th>
        <th>{{ tableSendCustName }}</th>
      </tr>
      <tr v-for="registedCust in $store.state.registedCusts">
        <td><input type="radio" name="registedCust" v-bind:value="registedCust" v-model="selectedCustNo"></td>
        <td>{{ registedCust }}</td>
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
      button: '次へ',
      selectedCustNo: '',
    };
  },
  methods:{
    next: function(registedCust){
      console.log('INFO: 振込金額入力画面へ');
      console.log('DEBUG: 振込先お客様番号：' + this.selectedCustNo);
      // 振込先お客様番号をストアに保存
      this.$store.commit('storeSendCustNo', this.selectedCustNo);
      // 振込画面へ遷移
      this.$router.push('/send');
    }
  }  
}
</script>