<template>
<div id="album-view">
    <div class="wrapper-header">
        <h1>ALBUMS</h1>
        <div class="settings">
            <button id="btn-grid" v-on:click="setView(1)" v-bind:class="{ active : view == 1}" >
                <IconGrid />
            </button>
            <button id="btn-list" v-on:click="setView(2)" v-bind:class="{ active : view == 2}" >
                <IconList />
            </button>
        </div>
    </div>
    <ul v-bind:class="{grid : view == 1}" id="list-albums">
        <li v-on:dblclick="selectAlbum(album)" v-bind:class="{ active : checkIfPlaying(album.id) }" v-for="album in albums" class="album" :key="album" >
            <img id="img-album" :src="album.images[1].url" alt="Album Art"/>
            <div class="album-info">
            <h4 id="txt-album-name">
                {{ album.name }}
            </h4>
            <p id="txt-album-artists">
                {{ album.artists[0].name }}
            </p>
            <div class="album-year">
                <p id="txt-album-year">
                {{ getYear(album.release_date) }}
                </p>
         <p id="txt-album-tracks">
            {{ countTracks(album.name) }}
        </p>
    </div>
</div>

        </li>
    </ul>
</div>
</template>

<script>
import { usePlayerStore } from '../stores/player.js'
import songData from '../data/songs.js'
import IconGrid from '../components/icons/IconGrid.vue'
import IconList from '../components/icons/IconList.vue'



export default {
    data(){
        return {
            view : 1,
            nowPlayingAlbum: this.playerStore.getNowPlayingAlbumID
        }

    },
    setup() {
        const playerStore = usePlayerStore()
        return {
            playerStore
        }
    },
    components : {
        IconGrid,
        IconList
    },

    computed: {
        albums: {
            get() {
                const songs = songData;
                const albumSet = new Set();

                const albumList = songs.filter(song => {
                if (!albumSet.has(song.album.name)) {
                    albumSet.add(song.album.name);
                    return true;
                }
                return false;
                }).map(song => song.album);
                return albumList;
            }
        }

    },

    methods: {
        setView(value) {
            this.view = value;
        },
        getYear(date) {
            return date.substring(0, 4);
        },
        getTracks(name) {
            return songData.filter(song => song.album.name === name);
        },
        countTracks(name) {
            return this.getTracks(name).length;
        },
        selectAlbum(album) {
            const tracks = this.getTracks(album.name);
            if (tracks.length) {
            this.playerStore.setPlaylist(tracks);
            }
        },
        checkIfPlaying(albumID) {
            return albumID === this.playerStore.getNowPlayingAlbumID;
        }
    }

}
</script>