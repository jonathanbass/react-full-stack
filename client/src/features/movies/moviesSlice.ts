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

export const moviesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.movies = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMovies = (state: RootState) => state.movies.movies;
export const loadingStatus = (state: RootState) => state.movies.status;

export default moviesSlice.reducer;