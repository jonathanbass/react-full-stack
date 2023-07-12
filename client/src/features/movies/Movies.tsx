import { useCallback, useEffect, useRef } from "react";
import { Box, CircularProgress } from '@mui/material';
import AddMovie from "./AddMovie";
import MoviesList from "./MoviesList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMoviesAsync, loadingStatus, setMovies } from "./moviesSlice";
import "./Movies.css";

function Movies() {
    const loading = useAppSelector(loadingStatus);
    const dispatch = useAppDispatch();
    
    const socket = useRef<WebSocket | null>(null);

    const updateMoviesList = useCallback((message: any) => {
        const data = JSON.parse(message.data);
        const movies = data["movies-updated"];
        dispatch(setMovies(movies));
    }, []);

    const connectWs = useCallback(() => {
        if (socket.current?.readyState !== WebSocket.OPEN) {
            const url = "wss://x2m3y2i03d.execute-api.eu-west-1.amazonaws.com/production";
            socket.current = new WebSocket(url);
    
            socket.current.onopen = () => {
                console.log("websocket connected.");
                socket!.current!.onmessage = updateMoviesList;
            };
        }
    }, []);

    useEffect(() => {
        connectWs();

        dispatch(getMoviesAsync());

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
