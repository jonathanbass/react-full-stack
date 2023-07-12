import axios from 'axios';
import { IMovie } from './movie';

export class MoviesService {
    private static moviesUrl = "https://e22csgx4l2.execute-api.eu-west-1.amazonaws.com/movies/movies";

    static async getMovies() {
        const response = await axios.get<IMovie[]>(this.moviesUrl);
        return response;
    }

    static async addMovie(movie: IMovie) {
        const response = await axios.post(this.moviesUrl, movie);
        return response;
    }

    static async deleteMovie(id: string) {
        await axios.delete(`${this.moviesUrl}/${id}`);
    }
}
