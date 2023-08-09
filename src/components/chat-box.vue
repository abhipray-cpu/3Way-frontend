<template>
    <div id="chat-box">
        <div  v-for="chat,index in Chats" :key="index" id="daddy">
            <div :class="chat.sender == Sender?'sender-chat':'receiver-chat'" style="margin-top:2vh;margin-bottom:2vh;">
                <h3>{{ chat.msg }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import SocketioService from '../socketio.service.js';
export default {
    props:['manufacturer','transporter'],
   computed:{
    Chats(){
        return this.$store.getters['getCurrChats']
    },
    Sender(){
    return localStorage.getItem('user')
   }
   },
   async mounted(){
    SocketioService.updateMessage();
   }
   
}
</script>

<style scoped>
@media only screen and (min-width:900px){
    #chat-box{
        width:60vw;
        height:55vh;
        overflow-y:scroll;
        overflow-x:hidden;
        padding-bottom:1vh;
    }
    #chatbox::-webkit-scrollbar{
        display: none ;
    }
    #daddy{
      
    }
        .sender-chat{
            float: right;
            clear: right;
    margin-right: 1vw;
    height: fit-content;
    max-width:35vw;
    width:fit-content;
    border-radius: 10px;
    box-shadow: 2px 2px 4px black;
    background: rgba(0, 0, 0, 0.705);
    padding-left:.8vw;
    padding-right:.8vw;
    padding-top:.8vh;
    padding-bottom:.8vh;
    margin-top:2vh;
    margin-bottom:2vh;
    }
    .sender-chat h3{
        color:white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size:20px;
        font-weight: 350;
        text-align: center;
    }
    .receiver-chat{
        float:left;
        clear: left;
        margin-left: 1vw;
        height: fit-content;
        max-width:35vw;
        width:fit-content;
        border-radius: 10px;
        box-shadow: 2px 2px 4px black;
        background: rgba(243, 159, 3, 0.705);
        padding-left:.8vw;
        padding-right:.8vw;
        padding-top:.8vh;
        padding-bottom:.8vh;
        margin-top:2vh;
        margin-bottom:2vh;
    }
    .receiver-chat h3{
        color:white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size:20px;
        font-weight: 350;
        text-align: center;
    }
}
@media only screen and (max-width:480px){
#chat-box{
    width:100vw;
    height:70vh;
    overflow-y:scroll;
    overflow-x:hidden;
    padding-bottom:10px;
}
#chatbox::-webkit-scrollbar{
    display: none ;
}
#daddy{
  
}
    .sender-chat{
        float:right;
        clear: right;
margin-right: 2vw;
height: fit-content;
max-width:70vw;
width:fit-content;
border-radius: 10px;
box-shadow: 2px 2px 4px black;
background: rgba(0, 0, 0, 0.705);
padding-left:.8vw;
padding-right:.8vw;
padding-top:.8vh;
padding-bottom:.8vh;
margin-top:2vh;
margin-bottom:2vh;
}
.sender-chat h3{
    color:white;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:18px;
    font-weight: 450;
    text-align: center;
}
.receiver-chat{
    float:right;
    clear: right;
    margin-left: 2vw;
    height: fit-content;
    max-width:70vw;
    width:fit-content;
    border-radius: 10px;
    box-shadow: 2px 2px 4px black;
    background: rgba(243, 159, 3, 0.705);
    padding-left:.8vw;
    padding-right:.8vw;
    padding-top:.8vh;
    padding-bottom:.8vh;
    margin-top:2vh;
    margin-bottom:2vh;
}
.receiver-chat h3{
    color:white;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:18px;
    font-weight: 450;
    text-align: center;
}
}
</style>