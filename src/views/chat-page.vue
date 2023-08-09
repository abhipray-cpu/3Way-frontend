<template>
    <div id="chat-page">
     <chat-header :name="Name" :id="order._id" :status="order.status"></chat-header>
     <chat-box :manufacturer="order.manufacturer" :transporter="order.transporter"></chat-box>
     <text-box :manufacturer="order.manufacturer" :transporter="order.transporter" :id="order._id"></text-box>
    </div>
</template>

<script> 
import axios from 'axios';
import ChatHeader from '../components/chat-header.vue'
import TextBox from '../components/text-box.vue'

import ChatBox from '../components/chat-box.vue'
export default {
    components:{ChatHeader,TextBox,ChatBox},
    data(){
        return{
            chats:[],
            order:{}
        }
    },
    computed:{
        Name(){
            if(this.order.manufacturer == localStorage.getItem('user')){
                return this.order.transporter;
            }
            else
            return this.order.manufacturer;
        },
        Role(){
            return localStorage.getItem('role') == 'transporter'
        }
    },
    async mounted(){
        
        let id = this.$route.params.orderID
        try{
            let response = await axios.get(`http://localhost:4000/getChat/${id}`)
            if(response.status == 200){
                this.order = response.data.chat;
                this.chats = response.data.chat.chats; 
                this.$store.commit('setCurrChats',{value:this.chats})               
            }
            else{
                this.chats == []
            }
        }
        catch(err){
           this.chats =[]
        }

    }
}
</script>

<style scoped>
#chat-page{
    overflow-x:hidden;
    overflow-y:auto;
    padding-top:0px;
}
#chat-page::-webkit-scrollbar{
    display: none;
}
@media only screen and (min-width:900px){
    #chat-page{
        width:60vw;
        height:90vh;
        margin-left:20vw;
        margin-top:10vh;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.721);
        border-radius: 10px;
        padding-top:0px;

    }
   
}
@media only screen and (max-width:480px){
#chat-page{
    width:100vw;
    height:100vh;
    padding-top:0px;
    margin-top:0px;
}
}
</style>