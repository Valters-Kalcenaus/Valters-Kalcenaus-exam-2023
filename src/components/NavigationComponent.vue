<template>
    <nav id="nav-main" class="wrapper-navigation">
            <ol>
                <li v-for="link in this.navigationLinks" :key="link" >
                    <router-link :to=link.path>{{link.name}}</router-link>
                </li>
            </ol>
        </nav>
</template>

<script>
export default {
    data() {
        return {
            navigationLinks: [
                {path: "/", name: "SONGS"},
                {path: "/albums", name: "ALBUMS"},
                {path: "/about", name: "ABOUT"},
            ]
        }
    }
}
</script>
