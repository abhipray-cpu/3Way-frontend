<template>
    <div id="manu-sort">
        <select v-model="selectedFrom" class="selection">
            <option disabled value="">Pickup From</option>
            <option v-for="option in from" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-model="selectedTo" class="selection">
            <option disabled value="">Deliever To</option>
            <option v-for="option in to" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-model="selectedTransporter" class="selection">
            <option disabled value="">Transporter</option>
            <option v-for="option in transporters" :key="option.userName" :value="option.userName">{{ option.userName }}</option>
          </select>
    </div>
</template>

<script>
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
            selectedFrom:'',
            selectedTo:'',
            selectedTransporter:''
        }
    },
    watch:{
        async selectedFrom(val){
        await this.$store.dispatch('getChats',{value:localStorage.getItem('user')})
          this.$store.commit('updateChats',{value:val,key:'from'})
        },
        async selectedTo(val){
            await this.$store.dispatch('getChats',{value:localStorage.getItem('user')})
            this.$store.commit('updateChats',{value:val,key:'to'})
        },
        async selectedTransporter(val){
            await this.$store.dispatch('getChats',{value:localStorage.getItem('user')})
            this.$store.commit('updateChats',{value:val,key:'transporter'})
        }
    }
}
</script>

<style scoped>
@media only screen and (min-width:900px){
#manu-sort{
    padding-left:20vw;
}
    .selection{
        font-size: 28px;
        margin-left:5vw;
        margin-right:5vw;
        margin-bottom:4vh;

    }
}
@media only screen and (max-width:480px){
.selection{
    font-size: 16px;
    margin-left:2vw;
    margin-right:2vw;
}
}
</style>