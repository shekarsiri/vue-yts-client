<template>
    <div>
        <div class="box" v-for="movie in movies">
            <movie :movie="movie"></movie>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import Movie from './Movie.vue';
    export default{
        props: ['movies'],
        data(){
            return {}
        },
        components: {
            'movie': Movie
        }
    }
</script>
