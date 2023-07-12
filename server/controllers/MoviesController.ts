import { Request, Response } from "express";
import { MoviesClient } from "../clients/MoviesClient";

export class MoviesController {
    private moviesClient: MoviesClient;

    private constructor() {
        this.moviesClient = MoviesClient.Create();
    }

    public static Create = () => { 
        const instance = new MoviesController();
        return instance;
    };

    getMovie = async (req: Request, res: Response) => {
        const movie = await this.moviesClient.GetMovie(req.params.id);
        res.send(movie);
    }

    getMovies = async (_: Request, res: Response) => {
        const movies = await this.moviesClient.GetMovies();
        res.send(movies);
    }

    createMovie = async (req: Request, res: Response) => {
        const id = await this.moviesClient.CreateMovie(req.body);
        res.send({ id: id });
    }

    updateMovie = async (req: Request, res: Response) => {
        await this.moviesClient.UpdateMovie(req.params.id, req.body);
        res.send();
    }

    deleteMovie = async (req: Request, res: Response) => {
        const id = req.params.id;
        await this.moviesClient.DeleteMovie(id);
        res.send(`Movie with Id='${id}' deleted successfully.`);
    }
}
