<template>
<div id="songs-view" @scroll="handleScroll">
    <div class="wrapper-header">
        <h1>SONGS</h1>
        <div class="wrapper-search">
            <input v-model="input" id="input-search" placeholder="Search by title..." />

        </div>
        <div class="wrapper-settings">
            <button v-bind:class ="{active : show_favorites}" v-on:click="showFavorites()" id="btn-show-favorites">Show Favorites</button>
        </div>
    </div>
    <div class="wrapper-songs">
        <table cellspacing="0" cellpadding="0">
            <tr ref="header">
                <th id="th-id" >#</th>
                <th v-bind:class="{'active' : sortByTitle}" v-on:click="sortBy('a')" id="th-title">
                 Title
                <IconCaretUp v-if="sortByTitle === true" v-bind:class="{'flip-vertical' : sortState === 2 }" />
                </th>
                <th id="th-artist">Artist</th>
                <th id="th-album">Album</th>
                <th v-bind:class ="{active : sortByLength}" v-on:click="sortBy('b')" id="th-duration">
                    Duration
                    <IconCaretUp v-if="sortByLength === true" v-bind:class ="{'flip-vertical' : sortState == 2}" />
                </th>
            </tr>
            <!-- Loop goes on this <tr> element -->
            <tr class="song" v-for="(song, index) in songs" :key="index" v-on:dblclick="selectSong(song)" :class="{active : isPlaying(song)}">
                <td id="td-index">
                    <IconPlay v-if="isPlaying(song)" />
                    <span v-text="index+1" v-if="!isPlaying(song)" id="txt-index"></span>
                </td>
                <td id="td-title">
                    <img :src="song.album.images[0].url" />
                    <span>{{song.name}}</span>
                </td>
                <td v-text="getArtists(song)" id="td-artist"></td>
                <td id="td-album">{{song.album.name}}</td>
                <td id="td-duration">
                    {{ getTime(song) }}
                    <IconHeart v-bind:class="{active : isFavorite(song)}" v-on:click="togFav(song)" />
                </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
import IconCaretUp from '../components/icons/IconCaretUp.vue'
import {usePlayerStore} from '../stores/player.js'
import IconPlay from '../components/icons/IconPlay.vue'
import IconHeart from '../components/icons/IconHeart.vue'
import {useAuthStore} from '../stores/auth.js'
import songData from '../data/songs.js'



export default {
    data(){
        return {
            input : "",
            show_favorites : false,
            sortByTitle : false,
            sortByLength : false,
            sortState : 0,
            changedSongs : []
        }

    },
    computed: {

        songs() {
            let sourceArray = this.show_favorites ? this.authStore.getFavoriteSongs() : this.changedSongs;
            return sourceArray.length > 0 ? this.searchSongs(sourceArray) : this.searchSongs(songData);
        }

    },
    setup() {
        const authStore = useAuthStore()
        const playerStore = usePlayerStore()
        return {
            authStore,
            playerStore
        }
    },
    components : {
        IconCaretUp,
        IconPlay,
        IconHeart
    },



    methods: {
        handleScroll(event) {
            this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
        },
        showFavorites() {
            if (this.show_favorites) {
                this.show_favorites = false;
            }
            else {
                this.show_favorites = true;
            }
        },
        sortBy(value) {
        let sorted = this.show_favorites ? this.authStore.getFavoriteSongs() : [...songData];
        
        sorted = this.searchSongs(sorted);

        const sortProperty = value === 'a' ? 'name' : 'duration_ms';
        this.sortByTitle = value == 'a';
        this.sortByLength = value == 'b';

        if (this.sortState === 0 || this.sortState === 2) {
            sorted.sort((a, b) => {
                const propA = (sortProperty === 'name' ? a[sortProperty].toLowerCase() : a[sortProperty]);
                const propB = (sortProperty === 'name' ? b[sortProperty].toLowerCase() : b[sortProperty]);
                return propA < propB ? -1 : (propA > propB ? 1 : 0);
            });
            this.sortState = 1;
        } else {
            sorted.reverse();
            this.sortState = 2;
        }
        
            this.changedSongs = sorted;
        },

        selectSong(song) {
            this.playerStore.setPlaylist(this.songs)
            this.playerStore.setNowPlaying(song)
        },
        isPlaying(song) {
            return this.playerStore.getNowPlaying.id == song.id;
        },
        getArtists(song){
            return song.artists.map(artist => artist.name).join(", ");
        },
        getTime(song){
            const durationInMs = song.duration_ms
            const formatsongTime = (durationInMs) => {
            const minutes = Math.floor(durationInMs / 60000);
            const seconds = Math.round((durationInMs % 60000) / 1000);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds === 60 ? '00' : seconds}`;
            };
            return formatsongTime(durationInMs);
        },
        isFavorite(song) {
            return localStorage.favorite_songs !== undefined && localStorage.favorite_songs.includes(song.id);
        },

        togFav(song) {
            this.authStore.toggleFavorite(song.id)
        },

        searchSongs(source) {
            if (!this.input) return source;
            return source.filter(song => song.name.toLowerCase().includes(this.input.toLowerCase()));
        }

    }
}
</script>