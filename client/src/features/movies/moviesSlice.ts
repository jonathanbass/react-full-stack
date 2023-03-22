import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IMovie } from './movie';
import { MoviesService } from './moviesService';

export interface MoviesState {
  status: 'idle' | 'loading' | 'failed';
  movies: IMovie[];
}

const initialState: MoviesState = {
  status: 'loading',
  movies: []
};

export const getMoviesAsync = createAsyncThunk(
  'movies',
  async () => {
    const response = await MoviesService.getMovies();
    return response.data;
  }
);

export const addMovieAsync = createAsyncThunk(
  'add-movie',
  async (movie: IMovie) => {
    await MoviesService.addMovie(movie);
  }
);

export const deleteMovieAsync = createAsyncThunk(
  'delete-movie',
  async (id: string) => {
    await MoviesService.deleteMovie(id);
  }
);

export const moviesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMoviesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
      })
      .addCase(getMoviesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setMovies } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies.movies;
export const loadingStatus = (state: RootState) => state.movies.status;

export default moviesSlice.reducer;
