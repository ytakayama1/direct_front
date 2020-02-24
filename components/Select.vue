<template>
<div>
  <h3>{{ title }}</h3>
  <table border="1">
      <tr>
        <th>{{ tableRadio }}</th>
        <th>{{ tableSendCustName }}</th>
      </tr>
      <tr>
        <td><input type="radio" name="radio"></td>
        <td>{{ sendCustName }}</td>
      </tr>      
    </table>
    <button>{{ button }}</button>
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
      sendCustName: 'IBM 五味',
      button: '次へ'
    };
  }
}
</script>