<template>
    <!--  HEADER  -->
    <Header v-if="authStore.is_authenticated"></Header>
    <!--  HEADER END  -->

    <!--  BODY  -->
    <div id="section-body">
        <NavigationComponent v-if="authStore.is_authenticated"/>
        <router-view class="section-router"></router-view>

    </div>
    <!--  BODY END  -->

    <!--  PLAYER  -->
    <div id="section-player" v-if="authStore.is_authenticated">
        <AudioPlayer />
    </div>
    <!--  PLAYER END  -->
</template>

<script>
    import { useAuthStore } from './stores/auth';
    import Header from '@/components/HeaderComponent.vue';
    import AudioPlayer from '@/components/AudioPlayerComponent.vue';
    import NavigationComponent from '@/components/NavigationComponent.vue'

    export default {
        components: {
            Header,
            AudioPlayer,
            NavigationComponent
        },
        setup() {
        const authStore = useAuthStore()
        return {
            authStore,
        }
    },
    }
</script>
