import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteMovieAsync, selectMovies } from "./moviesSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import "./MoviesList.css";

function MoviesList() {
    const movies = useAppSelector(selectMovies);
    const dispatch = useAppDispatch();
    const deleteMovie = (id: string) => {
        dispatch(deleteMovieAsync(id));
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Runtime</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            movies.map((movie, idx) => {
                                return <TableRow key={idx}>
                                    <TableCell>{movie.title}</TableCell>
                                    <TableCell>{movie.runtime}</TableCell>
                                    <TableCell>{movie.year}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => deleteMovie(movie.id as string)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>;
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default MoviesList;
