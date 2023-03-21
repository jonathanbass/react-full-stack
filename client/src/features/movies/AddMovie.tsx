import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel } from '@mui/material';
import "./AddMovie.css";

function AddMovie() {
    return (<FormGroup >
        <FormControl>
            <InputLabel htmlFor="title-input">Title</InputLabel>
            <Input id="title-input" />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="year-input">Year</InputLabel>
            <Input id="year-input" />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="runtime-input">Runtime</InputLabel>
            <Input id="runtime-input" />
        </FormControl>
        <Button onClick={() => alert("!!!")}>
            <FormLabel>Add Movie</FormLabel>
        </Button>
    </FormGroup >);
}

export default AddMovie;
