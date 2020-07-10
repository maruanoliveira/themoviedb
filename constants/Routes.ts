export default {
    baseUrl: 'https://api.themoviedb.org/3/',
    movie: {
        image: 'https://image.tmdb.org/t/p/w500',
        searchByTitle: 'search/movie?query=',
        trending: '/trending/movie/day',
        byGenre: '/discover/movie?include_video=true&with_genres=',
        genreList: '/genre/movie/list'
    },
};
