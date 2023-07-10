import { createTheme, styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
  Button,
  useTheme
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { Brightness4, Brightness7, Home, Menu } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideList from './SideList';
import Protected from '../../components/protected/Protected'
import Login from '../../components/user/Login'
import { useValue } from '../../context/ContextProvider';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const theme = useTheme()
  const { state: { mode, currentUser }, dispatch } = useValue()
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'dark' : 'light',
        },
      }),
    [dark]
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar sx={{position:"fixed", background: 'none'}} open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/')}>
                <Home />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: 'none', gap: '1rem' }}>
              <Box component="img" alt="profile" src={currentUser?.photoURL} height="32px" width="32px" borderRadius="50%" sx={{ objectFit: "cover" }} />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.85rem" sx={{ colo: theme.palette.secondary[100] }}>
                  {currentUser?.name}
                </Typography>
                <Typography fontSize="0.75rem" sx={{ colo: theme.palette.secondary[200] }}>
                  {currentUser?.role}
                </Typography>
              </Box>
              </Box>
              <Box sx={{gap: '1rem'}}> 
                <IconButton onClick={() => setDark(!dark)}>
              {dark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            </Box>

          </Toolbar>
        </AppBar>
        <Protected>
          <SideList {...{ open, setOpen }} />
        </Protected>
      </Box>
      <Login />
      </>
  );
}