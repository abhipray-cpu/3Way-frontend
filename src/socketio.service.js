import { io } from 'socket.io-client';
import store from './store/index.js'
class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://localhost:4000', {
        query: {
          userId:localStorage.getItem('user')
        }
      });
  }
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
send(data){
    this.socket.emit('my message',data);
}
setUsername(){
    this.socket.emit('setUsername',localStorage.getItem('user'))
}
getNewMessage(){
  this.socket.on('message', () => {
    //based on the sender will update the last message of sender
    console.log('this is fired')
    store.dispatch('getChats',{value:localStorage.getItem('user')})
  });
}
sendNew(data){
  this.socket.emit('new msg',data);
}
updateMessage(){
  this.socket.on('new',(msg)=>{
    //updating message state for real time updation
    store.commit('updateCurrChats',{
      value:{
        sender:msg.sender,
        receiver:msg.receiver,
        msg:msg.msg
      }
    })
  })
}
}

export default new SocketioService();