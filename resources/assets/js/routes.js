import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./views/home.vue'),
    }
];

export default new VueRouter({
    routes
});