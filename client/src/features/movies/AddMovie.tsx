import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel } from '@mui/material';
import { useState } from 'react';
import "./AddMovie.css";

function AddMovie() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(0);
    const [runtime, setRuntime] = useState(0);

    return (<FormGroup >
        <FormControl>
            <InputLabel htmlFor="title-input">Title</InputLabel>
            <Input id="title-input" onChange={event => setTitle(event.target.value)} />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="year-input">Year</InputLabel>
            <Input type='number' value={year} id="year-input" onChange={event => setYear(Number(event.target.value))} />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="runtime-input">Runtime</InputLabel>
            <Input type='number' value={runtime} id="runtime-input" onChange={event => setRuntime(Number(event.target.value))} />
        </FormControl>
        <Button onClick={() => alert(`Title: ${title}, Year: ${year}, Runtime: ${runtime}`)}>
            <FormLabel>Add Movie</FormLabel>
        </Button>
    </FormGroup >);
}

export default AddMovie;
