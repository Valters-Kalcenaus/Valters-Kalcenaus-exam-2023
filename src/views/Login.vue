<template>
    <div id="login-view">
        <form class="login-form" @submit="login">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input id="input-email" placeholder="E-mail" v-model="email" />
            <input id="input-password" placeholder="Password" v-model="passW"/>
            <button id="btn-submit" :disabled="disabled" type="submit">LOGIN</button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.js'

export default {
    data() {
        return {
            email: '',
            passW: ''
        }
    },
    computed: {
        disabled() {
            return !(this.email && this.passW.length >= 6);
        }
    },
    methods: {
        login(event) {
        event.preventDefault(); 
            const authStore = useAuthStore();
        authStore.authenticate(this.email, this.passW);
    }
    }
}


</script>