<template>
    <div id="text-box">
        <input type="text" name="msg" id="msg" placeholder="....." v-model="msg">
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none" id="send" @click="sendMessage">
            <path d="M26.8584 3.08648C27.5208 1.25399 25.7451 -0.52176 23.9127 0.142229L1.51774 8.24198C-0.320777 8.9075 -0.543117 11.4162 1.1482 12.3961L8.29681 16.5349L14.6803 10.1511C14.9695 9.87181 15.3568 9.71724 15.7588 9.72074C16.1609 9.72423 16.5455 9.8855 16.8298 10.1698C17.1141 10.4541 17.2753 10.8387 17.2788 11.2408C17.2823 11.6429 17.1278 12.0302 16.8485 12.3195L10.465 18.7033L14.6051 25.8523C15.5834 27.5437 18.092 27.3198 18.7575 25.4827L26.8584 3.08648Z" fill="white"/>
          </svg>
    </div>
</template>

<script>
import SocketioService from '../socketio.service.js';
export default {
    props:['manufacturer','transporter','id'],
    data(){
        return{
            msg:''
        }
    },
    methods:{
        async sendMessage(){
            if(this.msg!=''){
                let msgData={}
                let sender,receiver;
                if(this.manufacturer == localStorage.getItem('user')){
                    msgData['sender'] = this.manufacturer;
                    msgData['receiver'] = this.transporter;
                    sender = this.manufacturer;
                    receiver = this.transporter;
                }
                else{
                    msgData['sender'] = this.transporter;
                    msgData['receiver'] = this.manufacturer;
                    sender = this.transporter;
                    receiver = this.manufacturer
                }
                msgData['id'] = this.id
                msgData['msg'] = this.msg
                this.$store.commit('updateCurrChats',{
                    value:{
                        msg:this.msg,
                        sender:sender,
                        receiver:receiver
                    }
                })
            await SocketioService.sendNew(msgData)
            this.msg=''
            }
        }
    }
}
</script>

<style scoped>
@media only screen and (min-width:900px){
    #text-box{
        position: fixed;
        width:58vw;
        margin-left:1vw;
        height:60px;
        background: rgba(0, 0, 0, 0.645);
        border-radius:10px;
        bottom:20px;
        
    }
    #msg,
    #msg:focus,
    #msg::selection{
        border: none;
        outline: none;
    }
    #msg{
        width:50vw;
        height:60px;
        margin-top:0px;
        margin-left:0px;
        background: transparent;
        color:white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size:20px;
        font-weight: 500;
        padding-left:.8vw;
    }
    #msg::placeholder{
        color:white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size:20px;
        font-weight: 500;
        padding-left:.8vw;
    }
    #send{
margin-top:15px;
margin-left:4vw;
cursor: pointer;
    }
}
@media only screen and (max-width:480px){
    #text-box{
        position: fixed;
        bottom:20px;
        width:96vw;
        margin-left:1.5vw;
        height:60px;
        background: rgba(0, 0, 0, 0.645);
        border-radius:10px;
    }
    #msg,
    #msg:focus,
    #msg::selection{
        border: none;
        outline: none;
    }
    #msg{
        width:80vw;
        height:60px;
        margin-top:0px;
        margin-left:0px;
        background: transparent;
        color:white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size:20px;
        font-weight: 500;
        padding-left:2vw;
    }
    #msg::placeholder{
        color:white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size:20px;
        font-weight: 500;
        padding-left:2vw;
    }
    #send{
margin-top:10px;
    }
}
</style>