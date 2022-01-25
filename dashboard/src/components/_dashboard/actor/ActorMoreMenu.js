/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import editFill from '@iconify/icons-eva/edit-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  TextField,
  Box,
  Stack,
  ListItemText,
  Modal,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

ActorMoreMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  styleModal: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default function ActorMoreMenu({ onDelete, styleModal, onEdit, data, dispatch }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
    formik.setValues(data);
  };
  const handleClear = () => {
    formik.resetForm();
    setSubmitting(false);
    handleClose();
  };
  const handleDelete = async (data) => {
    if (confirm('Are you sure you want to delete this actor?')) {
      await dispatch(onDelete(data));
    }
  };
  const formik = useFormik({
    initialValues: {
      _id: '',
      name: '',
      image: '',
      DateOfBirth: ''
    },
    onSubmit: async (values) => {
      await dispatch(onEdit(values));
      setTimeout(() => {
        handleClear();
      }, 1000);
    }
  });
  const { handleSubmit, getFieldProps, isSubmitting, setSubmitting } = formik;

  const renderModal = () => (
    <>
      <Modal
        open={open}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={styleModal}>
              <Stack spacing={2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Actor
                </Typography>
                <TextField fullWidth label="Name" {...getFieldProps('name')} />
                <TextField fullWidth label="Image" {...getFieldProps('image')} />
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  {...getFieldProps('DateOfBirth')}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <LoadingButton
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Edit Actor
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
    </>
  );
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      {open && renderModal()}
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleDelete(data._id)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={handleOpen}
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
