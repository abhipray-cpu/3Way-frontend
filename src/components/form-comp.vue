<template>
    <div id="form-modal">
        <div v-if="Msg" id="alert">
            <h3>{{ Message }}</h3>
        </div>
        <select v-model="selectedFrom">
            <option disabled value="">Pickup From</option>
            <option v-for="option in from" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-model="selectedTo">
            <option disabled value="">Deliever To</option>
            <option v-for="option in to" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-model="selectedTransporter">
            <option disabled value="">Select Transporter</option>
            <option v-for="option in transporters" :key="option.userName" :value="option.userName">{{ option.userName }}</option>
          </select>
          <input type="number" name="quantity" id="quantity" v-model="quantity" placeholder="Product Quantity">
          <input type="text" name="address" id="address" v-model="address" placeholder="Pickup Address">
          
          <div id="button" @click="connect">
            <h3>Connect</h3>
        </div>
    </div>
</template>

<script>
import SocketioService from '../socketio.service.js';
export default {
    props:['transporters'],
    data(){
        return{
            from:[{value:'address1',label:'address1'},
            {value:'address2',label:'address2'},
            {value:'address3',label:'address3'},
            {value:'address4',label:'address4'},
            ],
            to:[
                {value:'address1',label:'address1'},
            {value:'address2',label:'address2'},
            {value:'address3',label:'address3'},
            {value:'address4',label:'address4'},
            ],
            quantity:0,
            address:'',
            selectedFrom:'',
            selectedTo:'',
            selectedTransporter:'',
            msg:false,
            message:''
        }

    },
    computed:{
        Msg(){
            return this.msg;
        },
        Message(){
            return this.message;
        }
    },
    methods:{
        async connect(){
              // will emmit message here in this function

              if(this.validate()==true){
                let dat  = {
                "quantity":this.quantity,
                'address':this.address,
                "from":this.selectedFrom,
                "to":this.selectedTo,
                "transporter":this.selectedTransporter,
                "manufacturer":localStorage.getItem('user')
              }
              await SocketioService.send(dat);
              this.$store.commit('setForm')
              }
        },
        validate(){
            if(this.quantity==0 || this.address=='' || this.selectedFrom == '' || this.selectedTo=='' || this.selectedTransporter==''){
                this.message= 'fill all details'
               this.msg=true;
               setTimeout(()=>{
                this.msg=false
               },2000)
                return false;
            }
            else if(this.selectedFrom === this.selectedTo){
                this.message= 'same address!!'
               this.msg=true;
               setTimeout(()=>{
                this.msg=false
               },2000)
                return false;
            }
            else
            return true;
        }
    }
   
}
</script>

<style>
@media only screen and (min-width:900px){
    #form-modal{
        width:50vw;
        height:60vh;
        z-index: 1;
        position: absolute;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.504);
        border-radius: 10px;
        margin-left:25vw;
        padding-top:3vh;
        padding-left:10vw;
        background: whitesmoke;
    }
    #form-modal input{
    width:39vw;
    height:7vh;
    margin-top:1vh;
    margin-bottom:1vh;
    border-radius: 10px;
    padding-left:1vw;
    font-size:24px;
    color:rgba(0, 0, 0, 0.721);
    font-weight: 450;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    #form-modal input,
    #form-modal input:focus,
    #forom-modal input::selection{
        border:2px solid rgba(0, 0, 0, 0.464);
        outline: none;
    }
    #form-modal select{
        width:40vw;
        height:7vh;
        margin-top:1vh;
        margin-bottom:1vh;
    border-radius: 10px;
    padding-left:1vw;
    font-size:24px;
    }
    #button{
        width:10vw;
        height:7vh;
        background: rgba(0, 0, 0, 0.853);
        border-radius: 10px;
        margin-top:3px;
        cursor: pointer;
        margin-left:15vw;
    
    }
    #button h3{
        color:white;
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        line-height: 7vh;
    }
    #alert{
        width:10vw;
        height:50px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.879);
       margin-left:45vw;
       animation: horizontal-shaking;
       animation-duration: 1s;
    }
    #alert h3{
        font-size:20px;
        text-align: center;
        line-height: 50px;
    color:white;
    }
    @keyframes horizontal-shaking {
        0% { transform: translateX(0) }
        25% { transform: translateX(5px) }
        50% { transform: translateX(-5px) }
        75% { transform: translateX(5px) }
        100% { transform: translateX(0) }
       }
}
@media only screen and (max-width:480px){
    #form-modal{
        width:90vw;
        height:60vh;
        z-index: 1;
        position: absolute;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.504);
        border-radius: 10px;
        margin-left:5vw;
        padding-top:3vh;
        background: whitesmoke;
    }
    #form-modal input{
        width:79vw;
        height:45px;
        margin-top:1.5vh;
        margin-bottom:1vh;
        border-radius: 10px;
        margin-left:5vw;
        font-size:20px;
        color:rgba(0, 0, 0, 0.721);
        font-weight: 450;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }
        #form-modal input,
        #form-modal input:focus,
        #forom-modal input::selection{
            border:2px solid rgba(0, 0, 0, 0.464);
            outline: none;
        }
        #form-modal select{
            width:80vw;
        height:45px;
        margin-top:1.5vh;
        margin-bottom:1vh;
        border-radius: 10px;
        font-size:20px;
        margin-left:5vw;
        }
#button{
        width:40vw;
        height:60px;
        background: rgba(0, 0, 0, 0.853);
        margin-left:25vw;
        border-radius: 10px;
        margin-top:9px;
        cursor: pointer;
    
    }
    #button h3{
        color:white;
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        line-height: 60px;
    }
    
    #alert{
        width:40vw;
        height:50px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.879);
       margin-left:30vw;
       animation: horizontal-shaking;
       animation-duration: 1s;
    }
    #alert h3{
        font-size:20px;
        text-align: center;
        line-height: 50px;
    color:white;
    }
    @keyframes horizontal-shaking {
        0% { transform: translateX(0) }
        25% { transform: translateX(5px) }
        50% { transform: translateX(-5px) }
        75% { transform: translateX(5px) }
        100% { transform: translateX(0) }
       }
}
</style>