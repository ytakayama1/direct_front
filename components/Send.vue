<template>
<div>
  <h3>{{ title }}</h3>
  <h4>{{ message }} {{ sendAmount }}</h4>
    <button>{{ button }}</button>
</div>
</template>

<script>
export default {
  data: function(){
    return {
      title: '振込画面',
      message: '振込額：',
      sendAmount: '1,000',      
      button: '振込実行'
    };
  }
}
</script>