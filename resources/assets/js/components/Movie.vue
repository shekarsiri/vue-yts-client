<template>
    <div>
        <article class="media" v-if="movie">
            <div class="media-left" v-if="settings.media">
                <figure class="image is-128x128">
                    <img v-bind:src="movie.medium_cover_image" alt="Image">
                </figure>

            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong><a v-bind:href="getYouTubeLink(movie)" target="_blank">{{ movie.title_long }}</a></strong>
                        <small class="tag is-light">{{ movie.rating }}</small>
                        <!--<small>31m</small>-->
                        <br>
                        {{ movie.description_full }}
                    </p>
                </div>
                <div class="level">
                    <div class="level-left">
                        <div class="level-item has-text-centered" v-for="gen in movie.genres">
                            <span class="tag is-light">{{ gen }}</span>
                        </div>
                    </div>
                </div>
                <nav class="level">
                    <div class="level-left">
                        <a class="level-item" v-bind:href="getMagnetLink(movie, tor)" v-for="tor in movie.torrents">
                            <span class="button is-primary is-small">{{ tor.quality }}</span>
                        </a>
                    </div>
                </nav>
                <div class="is-clearfix"></div>
            </div>
        </article>
    </div>
</template>
<style>

</style>
<script>
    import API from '../api';
    export default{
        props: ['movie'],
        data(){
            return {
                trackers: [
                    'udp://open.demonii.com:1337/announce',
                    'udp://tracker.openbittorrent.com:80',
                    'udp://tracker.coppersurfer.tk:6969',
                    'udp://glotorrents.pw:6969/announce',
                    'udp://tracker.opentrackr.org:1337/announce',
                    'udp://torrent.gresille.org:80/announce',
                    'udp://p4p.arenabg.com:1337',
                    'udp://tracker.leechers-paradise.org:6969',
                ]
            }
        },
        methods: {
            getYouTubeLink: function (movie) {
                return "https://www.youtube.com/watch?v=" + movie.yt_trailer_code;
            },

            getMagnetLink: function (movie, tor) {
                var url = 'magnet:?';

                // URL (HASH)
                url += 'xt=urn:btih:' + tor.hash;

                // Title
                url += '&dn=' + movie.title_long + ' - ' + tor.quality;

                // Trackers
                for (var i = 0, length = this.trackers.length; i < length; i++)
                    url += '&tr=' + this.trackers[i];

                // Topic
                url += '&kt=Movie';

                return encodeURI(url);
            }
        },
        created() {
            this.settings = API.settings;
        },
    }
</script>
