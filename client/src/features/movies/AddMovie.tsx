import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import "./AddMovie.css";
import { addMovieAsync } from './moviesSlice';
import { IMovie } from "./movie";

function AddMovie() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(1900);
    const [runtime, setRuntime] = useState(0);

    const dispatch = useAppDispatch();

    const addMovie = (event: any) => {
        event.preventDefault();
        const newMovie: IMovie = {
            title: title,
            year: year,
            runtime: runtime,
            genre: [],
            cast: []
        };

        dispatch(addMovieAsync(newMovie));
    }

    return (
        <form onSubmit={addMovie}>
            <FormControl>
                <InputLabel htmlFor="title-input">Title</InputLabel>
                <Input id="title-input" onChange={event => setTitle(event.target.value)} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="year-input">Year</InputLabel>
                <Input type="number" value={year} id="year-input" onChange={event => setYear(Number(event.target.value))} />
            </FormControl>
            <FormControl onSubmit={addMovie}>
                <InputLabel htmlFor="runtime-input">Runtime</InputLabel>
                <Input type="number" value={runtime} id="runtime-input" onChange={event => setRuntime(Number(event.target.value))} />
            </FormControl>
            <Button variant="contained" type="submit" onClick={addMovie}>
                Add Movie
            </Button>
        </form>
    );
}

export default AddMovie;
