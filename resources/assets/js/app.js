require('./bootstrap');
import router from './routes';


//Vue.component('movie-list', require('./components/MovieList.vue'));
window.eventHub = new Vue();

new Vue({
    el: '#app',
    router
});
