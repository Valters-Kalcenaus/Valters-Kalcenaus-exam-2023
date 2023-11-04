import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        playlist   : [],
        now_playing: {}, // SONG OBJECT
        index: -1
    }),
    getters: {
        getNextSong(){
            if (this.index == this.playlist.length -1) {
                return false;
            }
             return this.playlist[this.index + 1];


        },
        getPreviousSong() {
            if (this.index == 0) {
                return false;
            }
            return this.playlist[this.index - 1];


        },
        getNowPlayingSongId() {
            return this.now_playing?.id;
        },
        getNowPlaying() {
            return this.now_playing;

        },
        getNowPlayingAlbumID() {
            return this.now_playing?.album?.id ?? null;
        },
        getNowPlayingSongName() {
            return this.now_playing?.name ?? '';
        },
        getNowPlayingSongImage() {
            return this.now_playing?.album?.images[1].url ?? '';
        },
        getNowPlayingArtists() {
            return this.now_playing?.artists?.map(artist => artist.name).join(', ');
        },
        getNowPlayingSongPreview() {
            return this.now_playing?.preview_url;
        }
    },
    actions: {
        setPlaylist(songs) {
            this.playlist = songs;
            this.now_playing = songs[0]
        },
        setNowPlaying(song) {
            this.index = this.playlist.indexOf(song);
            this.now_playing = song;

        },
        resetNowPlaying() {
            this.now_playing = {};
        },
    }
})
