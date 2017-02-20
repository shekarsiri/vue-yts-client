export default {
	getMovieList (params) {
		return axios.get('https://yts.ag/api/v2/list_movies.json', {
			params: params
		})
	} 
}