window._ = require('lodash');
import Vue from 'vue';
import VueRouter from 'vue-router';

window.Vue = Vue;
Vue.use(VueRouter);

window.axios = require('axios');
window.axios.defaults.headers.common = {
    //'X-CSRF-TOKEN': window.Laravel.csrfToken,
    //'X-Requested-With': 'XMLHttpRequest'
};