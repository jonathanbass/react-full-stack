import axios from 'axios';
import { IMovie } from './movie';

export class MoviesService {
    private static moviesUrl = "http://localhost:3001/movies";

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
