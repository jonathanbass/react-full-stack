import { useEffect } from "react";
import { Box, CircularProgress } from '@mui/material';
import AddMovie from "./AddMovie";
import MoviesList from "./MoviesList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMoviesAsync, loadingStatus } from "./moviesSlice";
import "./Movies.css";

function Movies() {
    const loading = useAppSelector(loadingStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMoviesAsync());
    }, []);

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
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

export default Movies;
