/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Stack,
  Typography,
  Box,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Switch,
  CardHeader,
  Card,
  Grid,
  Avatar
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import Page from '../../Page';
import { toastOpen } from '../../Toast';
import { responseCategory, responseActor, responseMovie } from '../../../redux/reducers';
import { movieValidate } from '../../../helpers/validate.helpers';
import { showCategory, showActor, createMovie } from '../../../redux/actions';

export default function AddPost() {
  const { renderToast, handleOpenToast, openToast } = toastOpen();
  const dispatch = useDispatch();
  const { category } = useSelector(responseCategory);
  const { actor } = useSelector(responseActor);
  const { message, status } = useSelector(responseMovie);

  const handelChangeActor = (event, value) => {
    const newValue = value.map((item) => item._id);
    setFieldValue('actors', newValue);
  };
  const handelChangeCategory = (event, value) => {
    const newValue = value.map((item) => item._id);
    setFieldValue('categories', newValue);
  };
  useEffect(() => {
    dispatch(showCategory());
    dispatch(showActor());
  }, [dispatch]);
  useEffect(() => {
    if (message) {
      handleOpenToast({
        message,
        color: status === 200 ? 'success' : 'error'
      })();
    }
  }, [message]);
  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      description: '',
      categories: '',
      actors: '',
      director: '',
      country: '',
      releaseDate: '',
      trailerUrl: '',
      duration: '',
      movieUrl: '',
      IMDbScore: '',
      status: '',
      isHot: false,
      isComingSoon: false,
      isActive: false,
      isFresh: false,
      isSeries: false
    },
    ValidationSchema: movieValidate,
    onSubmit: (values) => {
      dispatch(createMovie(values));
    }
  });

  const { handleSubmit, touched, errors, getFieldProps, setFieldValue } = formik;
  return (
    <Page title="Dashboard: Add Post ">
      {openToast.isOpen && renderToast()}
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Create new Movie
          </Typography>
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardHeader
                      avatar={<Avatar aria-label="recipe" style={{ backgroundColor: '#ffa500' }} />}
                      title="Thông tin cần thiết"
                      subheader="Title"
                    />
                    <Box sx={{ p: 3 }}>
                      <Stack direction={{ xs: 'column' }} spacing={2}>
                        <Stack direction={{ xs: 'row' }} spacing={2}>
                          <TextField
                            {...getFieldProps('name')}
                            label="Name"
                            fullWidth
                            variant="outlined"
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                          />
                          <TextField
                            {...getFieldProps('image')}
                            fullWidth
                            label="Image"
                            variant="outlined"
                            error={Boolean(touched.image && errors.image)}
                            helperText={touched.image && errors.image}
                          />
                        </Stack>
                        <Stack direction={{ xs: 'row' }} spacing={2}>
                          <TextField
                            {...getFieldProps('trailerUrl')}
                            label="Trailer URL"
                            fullWidth
                            variant="outlined"
                            error={Boolean(touched.trailerUrl && errors.trailerUrl)}
                            helperText={touched.trailerUrl && errors.trailerUrl}
                          />
                          <TextField
                            {...getFieldProps('movieUrl')}
                            fullWidth
                            label="Movie URL"
                            variant="outlined"
                            error={Boolean(touched.movieUrl && errors.movieUrl)}
                            helperText={touched.movieUrl && errors.movieUrl}
                          />
                        </Stack>
                        <Typography variant="h7">Post Description</Typography>
                        <TextField
                          {...getFieldProps('description')}
                          fullWidth
                          minRows={15}
                          multiline
                          variant="outlined"
                          error={Boolean(touched.description && errors.description)}
                          helperText={touched.description && errors.description}
                        />
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={4}>
                  <Card sx={{ p: 2, mb: 2 }}>
                    <Stack direction={{ xs: 'column' }} spacing={2}>
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={category}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) => {
                          handelChangeCategory(event, value);
                        }}
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Thể loại"
                            placeholder="Thể loại"
                            {...getFieldProps('categories')}
                            variant="outlined"
                          />
                        )}
                      />
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={actor}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) => {
                          handelChangeActor(event, value);
                        }}
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Actors"
                            placeholder="Actors"
                            {...getFieldProps('actors')}
                            variant="outlined"
                          />
                        )}
                      />
                    </Stack>
                  </Card>
                  <Card sx={{ p: 2, mb: 2 }}>
                    <Stack direction={{ xs: 'column' }} spacing={2}>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <TextField
                          {...getFieldProps('country')}
                          label="Country"
                          fullWidth
                          variant="outlined"
                          error={Boolean(touched.country && errors.country)}
                          helperText={touched.country && errors.country}
                        />
                        <TextField
                          id="date"
                          label="Release Date"
                          type="date"
                          fullWidth
                          {...getFieldProps('releaseDate')}
                          variant="outlined"
                          error={Boolean(touched.releaseDate && errors.releaseDate)}
                          helperText={touched.releaseDate && errors.releaseDate}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <TextField
                          {...getFieldProps('director')}
                          label="Director"
                          fullWidth
                          variant="outlined"
                          error={Boolean(touched.director && errors.director)}
                          helperText={touched.director && errors.director}
                        />
                        <TextField
                          {...getFieldProps('duration')}
                          fullWidth
                          label="Duration"
                          type="number"
                          variant="outlined"
                          error={Boolean(touched.duration && errors.duration)}
                          helperText={touched.duration && errors.duration}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                  <Card sx={{ p: 2, mb: 2 }}>
                    <Stack direction={{ xs: 'column' }} spacing={2}>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <TextField
                          {...getFieldProps('IMDbScore')}
                          label="IMDb Score"
                          type="number"
                          fullWidth
                          variant="outlined"
                          error={Boolean(touched.IMDbScore && errors.IMDbScore)}
                          helperText={touched.IMDbScore && errors.IMDbScore}
                        />
                        <TextField
                          {...getFieldProps('status')}
                          fullWidth
                          label="Status"
                          variant="outlined"
                          error={Boolean(touched.status && errors.status)}
                          helperText={touched.status && errors.status}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                  <Card sx={{ p: 2, mb: 2 }}>
                    <Stack direction={{ xs: 'row' }} spacing={2}>
                      <Stack direction={{ xs: 'column' }} spacing={2}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Switch {...getFieldProps('isHot')} />}
                            label="Hot"
                          />
                          <FormControlLabel
                            control={<Switch {...getFieldProps('isFresh')} />}
                            label="New"
                          />
                          <FormControlLabel
                            control={<Switch {...getFieldProps('isComingSoon')} />}
                            label="Coming Soon"
                          />
                        </FormGroup>
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Switch {...getFieldProps('isActive')} />}
                            label="Active"
                          />
                          <FormControlLabel
                            control={<Switch {...getFieldProps('isSeries')} />}
                            label="Series"
                          />
                        </FormGroup>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                Add Movie
              </LoadingButton>
            </Box>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
