import axios from 'axios';
import { IMovie } from './movie';

export class MoviesService {
    private static moviesUrl = "http://localhost:3001/movies";

    static async getMovies() {
        const response = await axios.get<IMovie[]>(`${this.moviesUrl}`);
        return response;
    }
}
