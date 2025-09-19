import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Home, Logout, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material'

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Drawer
        variant="permanent"
        open={open}
        sx={{
            width: open ? 300 : 60,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
            width: open ? 300 : 60,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',        // full viewport height
            overflow: 'hidden',     // hide scroll
            },
        }}
    >

      {/* Hamburger Menu at Top Right */}
      <div style={{ display: 'flex', justifyContent: open ? 'flex-end' : 'center', padding: 8 }}>
        <IconButton onClick={() => setOpen(!open)}>
          <Menu />
        </IconButton>
      </div>

      {/* Sidebar Items */}
      <List>
        <ListItem button onClick={() => navigate('/')}>
          <Tooltip title="Home" placement="right" disableHoverListener={open}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
          </Tooltip>
          {open && <ListItemText primary="Home" />}
        </ListItem>

        <ListItem button onClick={() => navigate('/tasks')}>
          <Tooltip title="Tasks" placement="right" disableHoverListener={open}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
          </Tooltip>
          {open && <ListItemText primary="Tasks" />}
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItem button onClick={() => navigate('/login')}>
          <Tooltip title="Logout" placement="right" disableHoverListener={open}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
          </Tooltip>
          {open && <ListItemText primary="Logout" secondary="enitha.it23@bitsathy.ac.in" />}
        </ListItem>
      </List>
    </Drawer>
  );
}
