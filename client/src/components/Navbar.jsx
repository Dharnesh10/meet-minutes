import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box, Tooltip } from '@mui/material';
import { Notifications, AccountCircle, ImportContacts, Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { useThemeToggle } from './ThemeProvider';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ sidebarOpen }) {
  const { toggleTheme, mode } = useThemeToggle();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: `${sidebarOpen ? 300 : 60}px`,
        width: `calc(100% - ${sidebarOpen ? 300 : 60}px)`,
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* App Name with Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ImportContacts />
          <Typography variant="h6">MeetMinutes</Typography>
        </Box>

        {/* Right-side Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
          </Tooltip>

          {/* Account Circle with Dropdown */}
          <Tooltip title="Account">
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                toggleTheme();
                handleMenuClose();
              }}
            >
              {mode === 'light' ? (
                <><Brightness4 sx={{ mr: 1 }} /> Dark Mode</>
              ) : (
                <><Brightness7 sx={{ mr: 1 }} /> Light Mode</>
              )}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/logout');
                handleMenuClose();
              }}
            >
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
