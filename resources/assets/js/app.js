require('./bootstrap');
import router from './routes';


//Vue.component('movie-list', require('./components/MovieList.vue'));

new Vue({
    el: '#app',
    router
});
