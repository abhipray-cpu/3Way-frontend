<template>
    <div id="chat-header">
        <h2>{{ name }}</h2>
        <h3>{{ id }}</h3>
        <div class="indicate" style="background:red" v-if="status=='pending'"></div>
            <div class="indicate" style="background:green" v-else></div>
        <div id="btn" v-if="Status" @click="changeStatus">
            <h3>Accept Offer</h3>
        </div> 
    </div>
</template>

<script>
export default {
    props:['name','id','status'],
    computed:{
        Status(){
            return this.status == 'pending' && localStorage.getItem('role') == 'transporter'
        }
    },
    methods:{
        async changeStatus(){
          this.$store.dispatch('changeStatus',{value:this.id})
        }
    }
}
</script>

<style scoped>
@media only screen and (min-width:900px){
    #chat-header{
        width:100vw;
        height:fit-content;
        padding-top:3vh;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.412);
        padding-bottom:1vh;
       } 
       #chat-header h2{
        font-size:24px;
        font-weight: 600;
        color:rgba(0, 0, 0, 0.786);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-left:2vw;
        margin-bottom:0px;
        margin-top:0px;
       }
       #chat-header h3{
        font-size:20px;
        font-weight: 450;
        color:rgba(0, 0, 0, 0.786);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-left:2vw;
        margin-top:5px;
       }
       .indicate{
        width:30px;
        height:30px;
        border-radius: 30px;
        float:left;
        margin-top:-9vh;
        margin-left:56vw;
    }
    #btn{
        width:10vw;
        height:30px;
        background: green;
        margin-bottom:6px;
        margin-left:25vw;
        cursor: pointer;
        border-radius:5px;
        box-shadow:2px 2px 4px rgba(0, 0, 0, 0.57)
    }
    #btn h3{
        color:white;
        line-height: 30px;
        text-align: center;
    }
}
@media only screen and (max-width:480px){
   #chat-header{
    width:100vw;
    margin-top:0px;
    height:fit-content;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.412);
    padding-bottom: 1vh;
   } 
   #chat-header h2{
    font-size:24px;
    font-weight: 600;
    color:rgba(0, 0, 0, 0.786);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-left:2vw;
    margin-bottom:0px;
   }
   #chat-header h3{
    font-size:20px;
    font-weight: 450;
    color:rgba(0, 0, 0, 0.786);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-left:2vw;
    margin-top:5px;
   }
   .indicate{
    width:20px;
    height:20px;
    border-radius: 20px;
    float:right;
    margin-right:4vw;
    margin-top:-7vh;
}
#btn{
    width:50vw;
    height:30px;
    background: green;
    margin-bottom:6px;
    margin-left:25vw;
    cursor: pointer;
    border-radius:5px;
    box-shadow:2px 2px 4px rgba(0, 0, 0, 0.57)
}
#btn h3{
    color:white;
    line-height: 30px;
    text-align: center;
}
}
</style>