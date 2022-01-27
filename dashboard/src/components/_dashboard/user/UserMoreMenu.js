/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

// ----------------------------------------------------------------------
UserMoreMenu.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func,
  dispatch: PropTypes.func
};

export default function UserMoreMenu({ data, dispatch, onDelete }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async (data) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await dispatch(onDelete(data));
    }
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

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
      </Menu>
    </>
  );
}
