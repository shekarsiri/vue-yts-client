<template>
    <div>
        <div v-if="data" class="container">
            <nav class="level is-mobile">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Total</p>
                        <p class="title">{{ data.movie_count }}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Loaded</p>
                        <p class="title">{{ movies.length }}</p>
                    </div>
                </div>
            </nav>

            <div class="box" v-for="movie in movies">
                <article class="media">
                    <div class="media-left" v-if="media">
                        <figure class="image is-64x64">
                            <img v-bind:src="movie.small_cover_image" alt="Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ movie.title_long }}</strong>
                                <small class="tag is-light">{{ movie.rating }}</small>
                                <!--<small>31m</small>-->
                                <br>
                                {{ movie.description_full }}
                            </p>

                        </div>
                        <nav class="level">
                            <div class="level-left">
                                <a class="level-item" v-bind:href="tor.url" target="_blank" v-for="tor in movie.torrents">
                                    <span class="button is-primary is-small">{{ tor.quality }}</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>

            <a href="" class="button is-primary" @click.prevent="loadMore()">Load More</a>
        </div>
    </div>
</template>

<script>
    //import router from '../routes'
    import API from '../api';

    export default{
        data(){
            return {
                media: false,
                data: null,
                movies: [],
                params: {
                    page: 2,
                    limit: 15,
                    sort_by: 'year',
                    minimum_rating: 7
                }
            }
        },

        methods: {
            fetchData: function () {
                console.log(API);
                API.getMovieList(this.params).then(function (res) {
                    this.data = res.data.data;
                    this.movies = this.movies.concat(res.data.data.movies);
                }.bind(this)).catch(function (error) {
                    console.log('failed...');
                    console.log(error);
                });
            },

            loadMore: function() {
                this.params.page++;
                this.fetchData();
            }
        },

        created() {
            this.fetchData();
        }
    }
</script>