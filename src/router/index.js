import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from '../stores/auth'
import Login from '../views/Login.vue'
import Songs from '../views/Songs.vue'
import Albums from '../views/Albums.vue'
import About from '../views/About.vue'


const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/',
            component: Songs
        },
        {
          path: '/about',
          component: About
        },
        {
          path: '/albums',
          component: Albums
        },
        {
            
            path: '/login',
            component: Login
        }
        
    ]
})

// ENG
// Middleware is a function that is executed before the route is changed
// argument "to" stores the address where we want to navigate/go
// argument "from" stores the address from where we're coming from

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  console.log(authStore.is_authenticated)
    if (!authStore.is_authenticated && to.path !== '/login') {
      return '/login';
  }
    else if (authStore.is_authenticated && to.path === '/login') {
    return from ? from.path : '/';
}

})

export default router
