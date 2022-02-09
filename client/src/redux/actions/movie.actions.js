import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axios.helpers';

const MOVIE_SHOW = 'movie/show';

const showMovie = createAsyncThunk(MOVIE_SHOW, async (thunkAPI) => {
    try {
        const { data } = await axios.get('/movie');
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export { showMovie };