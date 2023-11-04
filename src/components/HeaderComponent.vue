<template>
    <div id="main-header" class="active">
        <div class="wrapper-logo">
            <img src="@/assets/logo.svg" alt="logo"/>
            <h2>KRAKEN.FM</h2>
        </div>
        <div class="wrapper-profile">
            <div class="section-user">
                <span class="avatar"></span>
                <h3 id="txt-full-name">{{ fullName }}</h3>
            </div>
            <button id="btn-logout" v-on:click="logOut">LOGOUT</button>
        </div>
    </div>
</template>


<script>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '../stores/auth';

export default {
    setup() {
        const authStore = useAuthStore();
        const formEditable = ref(false);
        const inputNameValue = ref('');
        const inputSurnameValue = ref('');

        const fullName = computed(() => {
            return `${authStore.user.name} ${authStore.user.surname}`;
        });

        watch(fullName, (newValue) => {
            const [name, surname] = newValue.split(' ');
            authStore.user.name = name;
            authStore.user.surname = surname;
        });

        const handleLogout = () => {
            authStore.logout();
        };

        return {
            fullName,
            handleLogout,
        };
    },
    methods: {
        logOut() {
            this.handleLogout();
        },
    }
};
</script>

 
