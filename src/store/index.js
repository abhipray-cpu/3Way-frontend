import { createStore } from 'vuex'
import axios from 'axios';
export default createStore({
  state: {
    chats:[],
    serverError:false,
    form:false,
    currChats:[]
  },
  getters: {
    getChats(state){
      return state.chats;
    },
    getServerError(state){
      return state.serverError;
    },
    getForm(state){
      return state.form;
    },
    getCurrChats(state){
      return state.currChats
    }
  },
  mutations: {
    setChat(state,payload){
      state.chats = payload.value
    },
    setServerError(state,payload){
     state.serverError = payload.value;
    },
    setForm(state){
      state.form = ! state.form
    },
    updateChats(state,payload){
      let newChat = []
      for(let i=0;i<state.chats.length;i++){
        if(state.chats[i][payload.key] == payload.value){
           newChat.push(state.chats[i])
        }
      }
      state.chats = newChat
    },
    setCurrChats(state,paylaod){
      state.currChats = paylaod.value;
      console.log(state.currChats)
    },
    updateCurrChats(state,payload){
        state.currChats.push(payload.value)
        console.log(state.currChats)
    }
  },
  actions: {
    // this will fetch all the chats
    async getChats(context,payload){
      try{
        let response = await axios.get(`http://localhost:4000/home/${payload.value}`)
        console.log(response)
        if(response.status==200){
         if(response.data.msg == 'No chats found!!'){
          context.commit('setChat',{value:[]})
         }
         else{
            context.commit('setChat',{value:response.data.chat})
         }
        }
        else if(response.status==501){
          context.commit('setChat',{value:[]})
          context.commit('setServerError',{value:true})
        }
      }
      catch(err){
        context.commit('setChat',{value:[]})
        console.log(err)
      }
    },
    async getTransporters(context){
     try{
      let response = await axios.get('http://localhost:4000/transporters')
      if(response.status==200){
         let transporters = response.data.transporters;
         return transporters;
      }
      else if(response.status==501){
        context.commit('setServerError',{value:true})
        return []
      }
     }
     catch(err){
      console.log(err);
      return []
     }
    },
    async getManufacturers(context){
      try{
       let response = await axios.get('http://localhost:4000/manufacturers')
       if(response.status==200){
          let transporters = response.data.transporters;
          return transporters;
       }
       else if(response.status==501){
         context.commit('setServerError',{value:true})
         return []
       }
      }
      catch(err){
       console.log(err);
       return []
      }
     },
     async changeStatus(context,payload){
      try{
        await axios.get(`http://localhost:4000/change-status/${payload.value}`)
      }
      catch(err){
        console.log(err)
      }
     }
  },
  modules: {
  }
})
