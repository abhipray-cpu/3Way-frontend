<template>
    <div id="home">
        <h2 id="intro">Welcome back {{ Name }}</h2>
        <h3 id="introh3">Filters</h3>
        <h3 v-if="Chats.length==0" style="text-align:center;font-size:32px;font-weight:450">No chats found</h3>
        <manu-sort :transporters="transporters" v-if="show"></manu-sort>
        <trans-sort v-else :transporters="manufacturer"></trans-sort>
        <form-comp v-if="Form" :transporters="transporters"></form-comp>
        <div id="chats">
            <div v-for="chat,index in Chats" :key="index" class="chat" @click="redirect(chat._id)">
            <h2 v-if="chat.manufacturer == User">{{ chat.transporter }}</h2>
            <h2 v-else>{{ chat.manufacturer }}</h2>
            <div class="indicate" style="background:red" v-if="chat.status=='pending'"></div>
            <div class="indicate" style="background:green" v-else></div>
            <h3>{{ chat.chats[chat.chats.length-1].msg}}</h3>
            </div>
        </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" id="add-small" @click="toggleForm" v-if="show">
            <path d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 35.598 12.402 45 24 45Z" fill="#242528"/>
            <path d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 35.598 12.402 45 24 45Z" fill="#242528"/>
            <path d="M21 14H27V34H21V14Z" fill="white"/>
            <path d="M14 21H34V27H14V21Z" fill="white"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78" fill="none" id="add-large" @click="toggleForm" v-if="show">
            <path d="M39 73.125C57.8467 73.125 73.125 57.8467 73.125 39C73.125 20.1533 57.8467 4.875 39 4.875C20.1533 4.875 4.875 20.1533 4.875 39C4.875 57.8467 20.1533 73.125 39 73.125Z" fill="#242528"/>
            <path d="M39 73.125C57.8467 73.125 73.125 57.8467 73.125 39C73.125 20.1533 57.8467 4.875 39 4.875C20.1533 4.875 4.875 20.1533 4.875 39C4.875 57.8467 20.1533 73.125 39 73.125Z" fill="#242528"/>
            <path d="M34.125 22.75H43.875V55.25H34.125V22.75Z" fill="white"/>
            <path d="M22.75 34.125H55.25V43.875H22.75V34.125Z" fill="white"/>
          </svg>
    </div>
</template>

<script>
import FormComp from '../components/form-comp.vue'
import SocketioService from '../socketio.service.js';
import ManuSort from '../components/manufacturer-sorting.vue'
import TransSort from '../components/transporter-sort.vue'
export default {
    components:{FormComp,ManuSort,TransSort},
    computed:{
        Chats(){
            return this.$store.getters['getChats']
        },
        User(){
            return localStorage.getItem('user');
        },
        Name(){
            let name = localStorage.getItem('user')
            try{
            name = name.split(' ')[0]
            return name
            }
            catch(err){
return name
            }

        },
        show(){
            return localStorage.getItem('role') == 'manufacturer';
        },
        Form(){
            return this.$store.getters['getForm'] 
        }
    },
    data(){
        return{
            transporters:[],
        manufacturer:[]
        }
    },
    methods:{
        toggleForm(){
            this.$store.commit('setForm')
        },
        redirect(val){
            this.$router.push(`/chat/${val}`)
        }
    },
    async mounted(){
    try{
        await SocketioService.getNewMessage()
        await this.$store.dispatch('getChats',{value:localStorage.getItem('user')})
        this.transporters = await this.$store.dispatch('getTransporters')
        this.manufacturer = await this.$store.dispatch('getManufacturers')
        
    }
    catch(err){
        console.log(err)
    }
    }
}
</script>

<style scoped>
#home{
    height:100vh;
    width:100vw;
    overflow-x: hidden;
    overflow-y:auto;  
    padding-bottom:5vh;
}
#home::-webkit-scrollbar{
    display:none
}
@media only screen and (min-width:900px){
    #intro{
        font-size:42px;
        color:rgba(0, 0, 0, 0.766);
        font-weight: 450;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-top:3vh;
        text-align: center;
        margin-bottom:0px;
    }
    #introh3{
        font-size:32px;
        color:rgba(0, 0, 0, 0.766);
        font-weight: 450;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-top:0vh;
        text-align: center;
    }
    #add-large{
        position: fixed;
        bottom:7vh;
        float: left;
        margin-left:90vw;
        z-index: 1;
        cursor: pointer;
    }
    #add-small{
        display: none;
    }
    .chat{
        width:50vw;
        margin-left:25vw;
        box-shadow:2px 2px 4px rgba(0, 0, 0, 0.429);
        border-radius: 10px;
        height:14vh;
        overflow: hidden;
        padding-bottom:10px;
        margin-top:1vh;
        margin-bottom:1vh;
    }
    .chat h2{
        margin-left:2vw;
        margin-top:1vh;
        margin-bottom:0px;
        font-size:24px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
       font-weight: 450;
    }
    .chat h3{
        margin-top:8px;
        font-size:18px;
        font-weight: 350;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-left:2vw;
        margin-left:2vw;
    }
    .indicate{
        width:20px;
        height:20px;
        border-radius: 20px;
        float:right;
        margin-right:4vw;
        margin-top:1vh;
    }
}
@media only screen and (max-width:480px){
    #intro{
        font-size:24px;
        color:rgba(0, 0, 0, 0.766);
        font-weight: 450;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-top:3vh;
        text-align: center;
    }
    #introh3{
        font-size:20px;
        color:rgba(0, 0, 0, 0.766);
        font-weight: 450;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-top:2vh;
        text-align: center;
    }
    #add-large{
        display: none;
    }
    #add-small{
        position: fixed;
        bottom:7vh;
        float: left;
        margin-left:83vw;
        z-index: 1;
    }
    .chat{
        width:98vw;
        margin-left:1vw;
        box-shadow:2px 2px 4px rgba(0, 0, 0, 0.429);
        border-radius: 10px;
        height:14vh;
        overflow: hidden;
        padding-bottom:10px;
        margin-top:1vh;
        margin-bottom:1vh;
    }
    .chat h2{
        margin-left:2vw;
        margin-top:1vh;
        margin-bottom:0px;
        font-size:24px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
       font-weight: 450;
    }
    .chat h3{
        margin-top:8px;
        font-size:18px;
        font-weight: 350;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-left:2vw;
        margin-left:2vw;
    }
    .indicate{
        width:10px;
        height:10px;
        border-radius: 10px;
        float:right;
        margin-right:8vw;
        margin-top:1vh;
    }
}

</style>