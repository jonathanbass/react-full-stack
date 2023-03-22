import { useEffect } from "react";
import { Box, CircularProgress } from '@mui/material';
import AddMovie from "./AddMovie";
import MoviesList from "./MoviesList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMoviesAsync, loadingStatus, setMovies } from "./moviesSlice";
import "./Movies.css";
import { IMovie } from "./movie";
import { socket } from "../../socket";

function Movies() {
    const updateMovies = (movies: IMovie[]) => {
        dispatch(setMovies(movies));
    }

    const loading = useAppSelector(loadingStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMoviesAsync());
        socket.on('movies-updated', updateMovies);
    }, [dispatch]);

    if (loading === "idle") {
        return (
            <>
                <h1>Movies</h1>
                <AddMovie></AddMovie>
                <MoviesList></MoviesList>
            </>
        );
    }

    return (
        <Box>
            <CircularProgress />
        </Box>
    );
}

export default Movies;
