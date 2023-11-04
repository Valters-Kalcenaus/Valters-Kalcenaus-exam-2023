import { defineStore } from 'pinia'
import router from '../router';

export const useAuthStore = defineStore('user', {
    state: () => ({
        user: {
            name: 'Valters',
            surname: 'Kalcenaus',
            code: 'IT21020',
            favorite_songs: localStorage.favorite_songs?? []
        },
        authenticated : false
    }),
    getters: {
        is_authenticated() {
           // localStorage.is_authenticated ?? this.authenticated;
            console.log(this.authenticated, localStorage.is_authenticated)
            return this.authenticated;
        },
        getFavoriteSongs() {
            return this.user.favorite_songs;
        }
    },
    actions: {
        setUserData(name, surname, code) {
            this.user.name = name;
            this.user.surname = surname;
            this.user.code = code;

        },
        authenticate(email, password) {
            if (email == 'valters.kalcenaus@va.lv' && password == '123456') {
                this.authenticated = true;
                localStorage.is_authenticated = true;
                router.push('/');
            }
             
        },
        logout() {
            localStorage.clear();
            this.authenticated = false;
            localStorage.is_authenticated = false;
            router.push('/login');
        },
        toggleFavorite(songId) {
            if (this.user.favorite_songs.includes(songId)) {
                this.user.favorite_songs.splice(this.user.favorite_songs.indexOf(songId), 1)
            }
            else {
                this.user.favorite_songs.push(songId);
            }
            localStorage.favorite_songs = this.user.favorite_songs;
        },
    }
})



