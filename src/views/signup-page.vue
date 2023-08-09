<template>
    <div id="signup-page">
        <div v-if="Msg" id="alert">
            <h3>{{ Message }}</h3>
        </div>
        <div id="intro">
            <img :src="require('/src/assets/login/icon-small.png')" alt="" id="small-img">
            <img :src="require('/src/assets/login/icon-large.png')" alt="" id="large-img">
            <h2>Signup</h2>
            <h3>Please fill your details!!</h3>
        </div>
        <div id="form">
            <input type="text" placeholder="username" v-model="username" name="username" id="username">
            <input type="email" placeholder="email" v-model="email" name="email" id="email">
            <input type="text" placeholder="contact" v-model="contact" name="contact" id="contact">
            <input type="password" name="password" id="password" v-model="password" placeholder="password">
            <select v-model="selectedOption">
                <option disabled value="">You are?</option>
                <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
        </div>
          <div id="button" @click="submit">
            <h3>Signup</h3>
        </div>
        <div id="alternative">
            <h3>Have an account? <span id="alter" @click="redirect">Login</span></h3>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            username:'',
            password:'',
            email:'',
            contact:'',
            selectedOption:'',
            options:[
                {label:'manufacturer',value:'manufacturer'},
                {label:'transporter',value:'transporter'}
            ],
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
        redirect(){
            this.$router.push({name:'login'})
        },
        validate(){
            if(this.username=='' || this.password=='' || this.email=='' || this.contact =='' || this.selectedOption == ''){
               this.message= 'fill all details'
               this.msg=true;
               setTimeout(()=>{
                this.msg=false
               },2000)
               return false;
            }
            else
            return true;
        },
        async submit(){
            let val = await this.validate();
          try{
            if(val){
                 // sending req
                 const response = await axios.post('http://localhost:4000/signup', { data: {
                    username:this.username,
                    email:this.email,
                    password:this.password,
                    contact:this.contact,
                    role:this.selectedOption
                 } })
                 this.username=''
                 this.email=''
                 this.password=''
                 this.contact=''
                 this.role=''
                  if(response.status==200){
                    this.message= 'Account created'
               this.msg=true;
               localStorage.setItem('user',response.data.user)
                    localStorage.setItem('authenticated',true)
                    localStorage.setItem('token',response.data.token)
                    const currentTime = new Date();
                    localStorage.setItem('expiry',new Date(currentTime.getTime() + 2400 * 1000))
               setTimeout(()=>{
                this.msg=false
               },2000)
               this.$router.push({name:'login'})
               // will redirect to home page here
                  }
                  if(response.status==501){
                    this.message= 'Server side error'
               this.msg=true;
               setTimeout(()=>{
                this.msg=false
               },2000)
                  }
                  if(response.status==422){
                    this.message= response.data.msg
               this.msg=true;
               setTimeout(()=>{
                this.msg=false
               },2000)
                  }          
}
          }
          catch(err){
            this.message= 'server error'
               this.msg=true;
               setTimeout(()=>{
                this.msg=false
               },2000)
          }
            
        }
    }
}
</script>

<style scoped>
#signup-page{
    height:100vh;
    width:100vw;
    overflow: hidden;
}
@media only screen and (min-width:900px){
    #intro{
        margin-top:3vh;
       }
       #intro h2{
           font-size:48px;
           font-family: 'Times New Roman', Times, serif;
           color:rgba(0, 0, 0, 0.837);
           font-weight: 560;
           padding-top:20px;
           padding-left:10px;
           margin-bottom:0px;
       }
       #intro h3{
        font-size:28px;
        font-family: 'Times New Roman', Times, serif;
        color:rgba(0, 0, 0, 0.637);
        font-weight: 460;
        margin-top:8px;
       }
       #large-img{
        margin-left:2vw;
        float:left;
    }
    #small-img{
        display: none;
    }
    #form{
        width:100vw;
        padding-left:30vw;
        display: grid;
        grid-template-rows: repeat(2,auto);
    }
    #form input{
    width:40vw;
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
    #form input,
    #form input:focus,
    #forom input::selection{
        border:2px solid rgba(0, 0, 0, 0.464);
        outline: none;
    }
    #form select{
        width:40vw;
        height:7vh;
    margin-top:3vh;
    margin-bottom:3vh;
    border-radius: 10px;
    padding-left:1vw;
    font-size:24px;
    }
    #button{
        width:10vw;
        height:7vh;
        background: rgba(0, 0, 0, 0.853);
        margin-left:60vw;
        border-radius: 10px;
        margin-top:3px;
        cursor: pointer;
    
    }
    #button h3{
        color:white;
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        line-height: 7vh;
    }
    #alternative h3{
        text-align: center;
        font-size:24px;
        color:rgba(0, 0, 0, 0.682);
        margin-top:5vh;
    }
    #alter{
        text-align: center;
        font-size:30px;
        color:rgba(0, 0, 0, 0.982);
        cursor: pointer;
        margin-top:10vh; 
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
    #intro{
        margin-top:3vh;
       }
       #intro h2{
           font-size:28px;
           font-family: 'Times New Roman', Times, serif;
           color:rgba(0, 0, 0, 0.837);
           font-weight: 560;
           padding-top:10px;
           padding-left:10px;
           margin-bottom:0px;
       }
       #intro h3{
        font-size:21px;
        font-family: 'Times New Roman', Times, serif;
        color:rgba(0, 0, 0, 0.637);
        font-weight: 460;
        margin-top:8px;
       }
       #large-img{
        display: none;
    }
    #small-img{
        margin-left:2vw;
        float:left;
        margin-top:10px;
    }
    #form{
        width:100vw;
        padding-left:10vw;
        display: grid;
        grid-template-rows: repeat(2,auto);
        padding-top:2vh;
    }
    #form input{
    width:80vw;
    height:50px;
    margin-top:1.5vh;
    margin-bottom:1vh;
    border-radius: 10px;
    padding-left:2vw;
    font-size:24px;
    color:rgba(0, 0, 0, 0.721);
    font-weight: 450;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    #form input,
    #form input:focus,
    #forom input::selection{
        border:2px solid rgba(0, 0, 0, 0.464);
        outline: none;
    }
    #button{
        width:40vw;
        height:60px;
        background: rgba(0, 0, 0, 0.853);
        margin-left:30vw;
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
    #alternative h3{
        text-align: center;
        font-size:24px;
        color:rgba(0, 0, 0, 0.682);
        margin-top:10vh;
    }
    #alter{
        text-align: center;
        font-size:30px;
        color:rgba(0, 0, 0, 0.982);
        cursor: pointer;
        margin-top:10vh; 
    }
    #form h3{
        font-size:24px;
        margin-top:10px;
        color:rgba(0, 0, 0, 0.738);
        font-weight:350;
        margin-bottom:0px;
    }
    #form select{
        width:80vw;
    height:50px;
    margin-top:1.5vh;
    margin-bottom:1vh;
    border-radius: 10px;
    padding-left:1vw;
    font-size:24px;
    padding-left:2vw;
    }
    /*styling for error message*/
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