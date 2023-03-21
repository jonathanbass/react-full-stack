import { useAppSelector } from "../../app/hooks";
import { selectMovies } from "./moviesSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

function MoviesList() {
    const movies = useAppSelector(selectMovies);

    return (<div>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Runtime</TableCell>
                        <TableCell>Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        movies.map((movie, idx) => {
                            return <TableRow key={idx}>
                                <TableCell>{movie.title}</TableCell>
                                <TableCell>{movie.runtime}</TableCell>
                                <TableCell>{movie.year}</TableCell>
                            </TableRow>;
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>);
}

export default MoviesList;
