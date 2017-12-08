export default {
    loading: false,
    settings: {
        media: false,
        params: {
            page: 1,
            limit: 10,
            sort_by: 'date_added',
            minimum_rating: 7,
            genre: '',
            query_term: ''
        }
    },
    getMovieList (params) {
        this.loading = true;
        return axios.get('https://yts.am/api/v2/list_movies.json', {
            params: params,
            onDownloadProgress: function(progressEvent) {
                //console.log(progressEvent);
            }
        })
    }
}
