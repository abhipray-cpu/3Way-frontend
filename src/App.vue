<template>
  <div id="container">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import SocketioService from './socketio.service.js';
export default {
  async mounted(){
    await SocketioService.setupSocketConnection();
        await SocketioService.setUsername()
  },
  async unmounted(){
    await SocketioService.disconnect()
  },
  async beforeUpdate(){
    await SocketioService.disconnect()
  },
  async beforeMount(){
    await SocketioService.disconnect()
  }

}
</script>

<style scoped>
#container{
  width:100vw;
height:100vh;
overflow-x:hidden;
overflow-y:auto;
position:fixed;
left:0;
top:0;
padding:0;

}
#container::-webkit-scrollbar{
  display: none;
}
</style>