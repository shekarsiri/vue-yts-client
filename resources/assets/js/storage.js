const KEY = "favourites";
let movies = [];

class Storage {
    constructor() {

        movies = JSON.parse(localStorage.getItem(KEY));
    }
}

export default {
    favourite: function (movie) {

    }
}