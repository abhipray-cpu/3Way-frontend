<template>
    <div id="welcome-page">
        <div id="intro">
            <img :src="require('/src/assets/login/icon-small.png')" alt="" id="small-img">
            <img :src="require('/src/assets/login/icon-large.png')" alt="" id="large-img">
            <h2>Way Studio</h2>
            <h3>Thanks for choosing us!</h3>
        </div>
        <div id="about">
            Accelerating Your Drive Into The Metaverse With Development, Design, And Marketing At One Place.
        </div>
        <div id="button" @click="click">
            <h3>Start</h3>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        click(){
            this.$router.push({name:'login'})
        }
    },
    mounted(){
        // here we will check for a jwt token
        if(JSON.parse(localStorage.getItem('authenticated'))==true){
            // will redirect to the home page of user
            this.$router.push({name:'home'})
        }
    }
}
</script>

<style scoped>
#welcome-page{
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
#about{
    color: rgba(0,0,0,0.9);
text-align: center;
font-family: Istok Web;
font-size: 49px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top:12vh;
width:60vw;
margin-left:20vw;
}
#button{
    width:10vw;
    height:7vh;
    background: rgba(0, 0, 0, 0.853);
    margin-left:45vw;
    border-radius: 10px;
    margin-top:7vh;
    cursor: pointer;

}
#button h3{
    color:white;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 7vh;
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
#about{
    color: rgba(0,0,0,0.9);
text-align: center;
font-family: Istok Web;
font-size: 32px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top:8vh;
}
#button{
    width:40vw;
    height:60px;
    background: rgba(0, 0, 0, 0.853);
    margin-left:30vw;
    border-radius: 10px;
    margin-top:9vh;
    cursor: pointer;

}
#button h3{
    color:white;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 60px;
}
}
</style>