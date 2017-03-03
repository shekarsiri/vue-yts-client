<template>
    <div>
        <div class="container">

            <div class="columns">
                <div class="column is-one-quarter">

                    <div class="options">
                        <p class="control">
                            <input type="text" class="input" v-model="settings.params.query_term" v-on:keyup="queryEntered"/>
                        </p>

                        <p class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="settings.media">
                                Show Media
                            </label>
                        </p>

                        <p class="control">
                        <span class="select is-fullwidth">
                            <select name="" v-model="settings.params.genre" v-on:change="reloadData()">
                                <option value="">All</option>
                                <option v-bind:value="opt" v-for="opt in generations">{{ opt }}</option>
                            </select>
                        </span>
                        </p>

                        <p class="control">
                        <span class="select is-fullwidth">
                            <select name="" id="" v-model="settings.params.sort_by" v-on:change="reloadData()">
                                <option v-bind:value="opt" v-for="opt in sort_by">{{ opt }}</option>
                            </select>
                        </span>
                        </p>

                        <p class="control">
                        <span class="select is-fullwidth">
                            <select name="" v-model="settings.params.minimum_rating" v-on:change="reloadData()">
                                <option value="8">8</option>
                                <option value="7">7</option>
                                <option value="6">6</option>
                                <option value="5">5</option>
                            </select>
                        </span>
                        </p>

                        <a href="" class="button is-primary" @click.prevent="loadMore()">Load More</a>
                    </div>
                </div>
                <div class="column">
                    <div class="movie-list-container">
                        <!-- Details -->
                        <nav class="level is-mobile is-primary">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Total</p>
                                    <p class="title">{{ total }}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Loaded</p>
                                    <p class="title">{{ movies.length }}</p>
                                </div>
                            </div>
                        </nav>

                        <div class="movie-list" v-infinite="loadMore">
                            <!-- Movie List -->
                            <movie-list :movies="movies" v-if="movies.length"></movie-list>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import router from '../routes'
    import MovieList from '../components/MovieList.vue';
    import API from '../api';
    import _ from 'underscore';

    export default{
        data(){
            return {
                settings: null,
                total: null,
                movies: [],
                generations: [
                    'Action',
                    'Animation',
                    'Comedy',
                    'Documentary',
                    'Family',
                    'Film-Noir',
                    'Horror',
                    'Musical',
                    'Romance',
                    'Sport',
                    'War',
                    'Adventure',
                    'Biography',
                    'Crime',
                    'Drama',
                    'Fantacy',
                    'History',
                    'Music',
                    'Mystery',
                    'Sci-Fi',
                    'Thriller'
                ],
                sort_by: [
                    'title',
                    'year',
                    'rating',
                    'peers',
                    'seeds',
                    'download_count',
                    'like_count',
                    'date_added'
                ]
            }
        },

        methods: {
            fetchData: function () {
                API.getMovieList(this.settings.params).then(function (res) {
                    this.total = res.data.data.movie_count;
                    this.movies = this.movies.concat(res.data.data.movies);
                    API.loading = false;
                }.bind(this)).catch(function (error) {
                    console.log('failed...');
                    console.log(error);
                });
            },

            loadMore: function () {
                if (API.loading) return;

                this.settings.params.page++;
                this.fetchData();
            },

            reloadData: function () {
                this.movies = [];
                this.settings.params.page = 1;
                this.fetchData();
            },

            events: {
                scrolled: function () {
                    alert('Reached');
                }
            },

            queryEntered: _.debounce(function () {
                this.reloadData();
            }, 500)
        },

        created() {
            this.settings = API.settings;
            this.fetchData();
            eventHub.$on('scrolled', this.loadMore);
        },

        components: {
            'movie-list': MovieList
        },

        directives: {
            infinite: {
                bind: function (el, bind) {
                    console.log(bind);
                    el.addEventListener("scroll", function (e) {
                        //console.log(e.target.scrollHeight + ' : ' + e.target.scrollTop);
                        var per = (e.target.scrollTop * 100) / e.target.scrollHeight;
                        if (per >= 50)
                            eventHub.$emit('scrolled');
                        //console.log(e.target.scrollTop);
                    }.bind(this));
                },

                inserted: function (el) {

                }
            }
        }
    }
</script>