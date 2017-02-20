export default {
    settings: {
        media: false,
        params: {
            page: 1,
            limit: 10,
            sort_by: 'year',
            minimum_rating: 7,
            genre: 'Action',
            query_term: ''
        }
    },
    getMovieList (params) {
        return axios.get('https://yts.ag/api/v2/list_movies.json', {
            params: params
        })
    }
}