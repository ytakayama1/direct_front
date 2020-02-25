<template>
  <Show v-bind:histories="histories" v-bind:user="user"></Show>
</template>

<script>
import Show from '~/components/Show.vue'
let axios = require('axios');
let baseUrl = 'http://localhost:3333/';

export default {
  components: {
    Show
  },
  /**
   * 取引履歴を取得する同期処理
   */
  asyncData: async function(){
    console.log('INFO: asyncData取得');

    // 取引履歴を取得
    let histories = await axios.get(baseUrl + 'histories?' + 'CUST_NO=' + '2222222');
    // 口座情報を取得
    let user = await axios.get(baseUrl + 'users');
    return {
      histories: histories.data,
      user: user.data
    };
  }
}
</script>