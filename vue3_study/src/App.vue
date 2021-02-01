<template>
  <div>
    <button @click="add">按钮</button>
  </div>
</template>
<script ang="ts">
import { defineComponent,onBeforeMount, ref } from 'vue';

export default defineComponent({
 setup(props) {
   console.log('111');
    onBeforeMount(()=>{
      console.log('122');
    }) 
 }
})
</script>
