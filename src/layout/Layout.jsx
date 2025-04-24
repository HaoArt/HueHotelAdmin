import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Hotel as HotelIcon,
  AccountBalance as AccountBalanceIcon,
  Receipt as ReceiptIcon,
  BarChart as BarChartIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  LocalOffer as LocalOfferIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

const menuItems = [
  { text: 'Tổng quan', icon: <DashboardIcon />, path: '/dashboard' },
  {
    text: 'Quản trị',
    icon: <PeopleIcon />,
    path: '/admin',
    subItems: [
      { text: 'Quản lý người dùng', path: '/admin/users' },
      { text: 'Quản lý phòng', path: '/admin/rooms' },
      { text: 'Quản lý ưu đãi', path: '/admin/promotions' },
    ],
  },
  { text: 'Check-in/Check-out', icon: <ReceiptIcon />, path: '/check-in-out' },
  { text: 'Kế toán', icon: <AccountBalanceIcon />, path: '/accountant' },
  { text: 'Lễ tân', icon: <PersonIcon />, path: '/receptionist' },
  { text: 'Thống kê', icon: <BarChartIcon />, path: '/statistics' },
];

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleSubMenuClick = (text) => {
    setOpenSubMenu({
      ...openSubMenu,
      [text]: !openSubMenu[text],
    });
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          AdminHotel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <div key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  if (item.subItems) {
                    handleSubMenuClick(item.text);
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subItems &&
                  (openSubMenu[item.text] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.subItems && (
              <Collapse
                in={openSubMenu[item.text]}
                timeout='auto'
                unmountOnExit
              >
                <List component='div' disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      sx={{ pl: 4 }}
                      selected={location.pathname === subItem.path}
                      onClick={() => navigate(subItem.path)}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={handleMenuOpen}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={anchorEl ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={anchorEl ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.[0]}</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <PersonIcon fontSize='small' />
              </ListItemIcon>
              Thông tin cá nhân
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize='small' />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
