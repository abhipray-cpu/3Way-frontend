import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/login-page.vue'
import SignupPage from '../views/signup-page.vue'
import WelcomePage from '../views/welcome-page.vue'
import HomePage from '../views/home-page.vue'
import ChatPage from '../views/chat-page.vue'
const routes = [
  {
    nanme:'welcome',
    path:'/',
    component:WelcomePage
  },
{
  name:'login',
  path:'/login',
  component:LoginPage
},
{
  name:'signup',
  path:'/signup',
  component:SignupPage
},
{
  name:'home',
  path:'/home',
  component:HomePage
},
{
  name:'chat',
  path:'/chat/:orderID',
  component:ChatPage
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
