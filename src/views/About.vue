<template>
    <div id="about-view">
    <div class="wrapper-header">
        <h1>ABOUT ME</h1>
        <div class="settings">
            <button id="btn-edit" v-bind:class="{ 'is-active': isEditing }" v-on:click="editToggle" v-text="currentButtonText()">
            </button>
            <button id="btn-save" v-if="formEditable" v-on:click="saveData">
            Save Changes
            </button>


        </div>
    </div>
    <form>
        <div class="wrapper-input">
            <label>NAME</label>
            <input v-if="formEditable" id="input-name" :placeholder="currentName" v-model="inputNameValue" :key="currentName"/>
            <p id="txt-name" v-if="!formEditable">{{ currentName }}</p>

        </div>
        <div class="wrapper-input">
            <label>SURNAME</label>
            <input v-if="formEditable" id="input-surname" :placeholder="currentSurname" v-model="inputSurnameValue" :key="currentSurname"/>
            <p id="txt-surname" v-if="!formEditable">{{ currentSurname }}</p>
        </div>

        <div class="wrapper-input">
            <label>STUDENT CODE</label>
            <input v-if="formEditable" id="input-code" :placeholder="currentCode" v-model="inputCodeValue" :key="currentCode"/>
            <p id="txt-code" v-if="!formEditable">{{ currentCode }}</p>
        </div>
        <div class="wrapper-songs">
            <label>FAVORITE SONGS</label>
            <ul>
                <li>
                    <ul v-if="favorites.length">
                        <li v-for="song in favorites" :key="song.id">
                            <img id="img-album" :src="song.album.images[0].url" />
                            <div class="song-info">
                            <p id="txt-song" class="title">{{ song.name }}</p>
                            <p id="txt-artist" class="artist">{{ fetchArtists(song) }}</p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <div id="txt-empty" class="empty" v-if="favorites.length == 0">NO SONGS FOUND</div>
        </div>
    </form>
</div>
</template>

<script>
import { useAuthStore } from '../stores/auth.js';


export default {
    data() {
        return {
            formEditable: false,
            inputNameValue: '',
            inputSurnameValue: '',
            inputCodeValue: '',
        };
    },
    setup() {
        const authStore = useAuthStore()
        return {
            authStore,
        }
    },
    computed: {
        currentName() {
            return this.authStore.user.name;
        },
        currentSurname() {
            return this.authStore.user.surname;
        },
        currentCode() {
            return this.authStore.user.code;
        },
        favorites() {
            return this.authStore.getFavoriteSongs;
        }
    },
    methods: {
        editToggle() {
            this.formEditable = !this.formEditable;
            if (!this.formEditable) {
                this.inputNameValue = '';
                this.inputSurnameValue = '';
                this.inputCodeValue = '';
            }
        },
        currentButtonText() {
            return this.formEditable ? "Cancel" : "Edit";
        },
        saveData() {
        if (this.inputNameValue || this.inputSurnameValue || this.inputCodeValue) {
            const name = this.inputNameValue || this.currentName;
            const surname = this.inputSurnameValue || this.currentSurname;
            const code = this.inputCodeValue || this.currentCode;
            this.authStore.setUserData(name, surname, code);
            this.editToggle();
        }
    },
        fetchArtists(song) {
            return song.artists.map(artist => artist.name).join(", ");
        },
    }
};
</script>