<template>
 <div class="app-shop">
    <h1>商品列表</h1>
 </div>
</template>
<script>
 export default {
   data(){
     return {}
   },
   created(){
     //console.log(this.$route.query.id);
     console.log(this.$route.params.id);
   }
 }
</script>
<style>
</style>