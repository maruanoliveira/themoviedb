import Routes from "../constants/Routes";

export const MovieAdapter = (movie: any) => {

    const poster_url = Routes.movie.image + movie.poster_path;

    const backdrop_url = Routes.movie.image + movie.backdrop_path;

    return {
        ...movie,
        poster_url,
        backdrop_url
    }

};
