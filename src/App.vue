<template>
    <!--  HEADER  -->
    <Header></Header>
    <!--  HEADER END  -->

    <!--  BODY  -->
    <div id="section-body">
        <nav id="nav-main" class="wrapper-navigation">
            <ol>
                <li>
                    <a href="/">SONGS</a>
                </li>
                <li>
                    <a href="/albums">ALBUMS</a>
                </li>
                <li>
                    <a href="/about">ABOUT</a>
                </li>
            </ol>
        </nav>
        <router-view class="section-router"></router-view>
    </div>
    <!--  BODY END  -->

    <!--  PLAYER  -->
    <div id="section-player">
        <AudioPlayer />
    </div>
    <!--  PLAYER END  -->
</template>

<script>
    import Header from '@/components/HeaderComponent.vue';
    import AudioPlayer from '@/components/AudioPlayerComponent.vue';

    export default {
        components: {
            Header,
            AudioPlayer
        }
    }
</script>
