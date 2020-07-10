import {get} from "./ApiService";
import Routes from "../constants/Routes";
import {MovieAdapter} from "../adapters/MoviesAdapter";

export default class MoviesService {

    static async getByTitle(searchTitle: string) {

        const response = await get(Routes.movie.searchByTitle + searchTitle);

        if (response.total_results === 0) return []

        return response.results.map((item: any) => MovieAdapter(item))

    }

    static async getTrending() {

        const response = await get(Routes.movie.trending);

        if (response.total_results === 0) return []

        return response.results.map((item: any) => MovieAdapter(item))

    }

    static async getGenreList() {

        const response = await get(Routes.movie.genreList);

        return response.genres;

    }

    static async getByGenre(id: number) {

        const response = await get(Routes.movie.byGenre + id);

        if (response.total_results === 0) return []

        return response.results.map((item: any) => MovieAdapter(item))

    }

}
