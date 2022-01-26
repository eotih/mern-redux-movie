/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  Avatar,
  TableCell,
  Container,
  Typography,
  Switch,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { MovieListHead, MovieListToolbar, MovieMoreMenu } from '../components/_dashboard/movie';
import { getComparator } from '../components/TableComponent';
import Label from '../components/Label';
import { responseMovie } from '../redux/reducers';
import { showMovie, updateMovie, deleteMovie } from '../redux/actions';
import { fDate } from '../utils/formatTime';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'releaseDate', label: 'Release Date', alignRight: false },
  { id: 'rate', label: 'Rating', alignRight: false },
  { id: 'IMDbScore', label: 'IMDb Score', alignRight: false },
  { id: 'isActive', label: 'Active', alignRight: false },
  { id: 'isSeries', label: 'Series', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function MovieList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { movie } = useSelector(responseMovie);

  useEffect(() => {
    dispatch(showMovie());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = movie.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const toggleActive = (data) => {
    const newCategory = { ...data, isActive: !data.isActive };
    dispatch(updateMovie(newCategory));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movie.length) : 0;

  const filteredMovie = applySortFilter(movie, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredMovie.length === 0;

  return (
    <Page title="Movie | MOVIE">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Movie
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="add"
            startIcon={<Icon icon={plusFill} />}
          >
            New Movie
          </Button>
        </Stack>

        <Card>
          <MovieListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <MovieListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={movie.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredMovie
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        name,
                        country,
                        image,
                        categories,
                        releaseDate,
                        rate,
                        IMDbScore,
                        isActive,
                        isSeries
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            {categories.map((res) => (
                              <Label variant="filled" color="info" key={res._id}>
                                {res.name}
                              </Label>
                            ))}
                          </TableCell>
                          <TableCell align="left">{country}</TableCell>
                          <TableCell align="left">{fDate(releaseDate)}</TableCell>
                          <TableCell align="left">{rate}</TableCell>
                          <TableCell align="left">{IMDbScore}</TableCell>
                          <TableCell align="left">
                            <Switch checked={isActive} onChange={() => toggleActive(row)} />
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(isSeries === false && 'error') || 'success'}
                            >
                              {isSeries ? 'Movie' : 'Series'}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <MovieMoreMenu data={row} onDelete={deleteMovie} dispatch={dispatch} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={movie.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
