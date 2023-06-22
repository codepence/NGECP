import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material"
import { Lock, Menu } from "@mui/icons-material"
import photoURL from '../profile.jpeg'
import { useValue } from "../context/ContextProvider"
import UserIcons from "./user/UserIcons"

const user = { name: 'test', photoURL }

const NavBar = () => {
  const { state: { currentUser }, dispatch } = useValue()
  return (
    <AppBar>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton size="large" color="inherit">
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, }}
          >
            NCECP
          </Typography>
          {/* <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            NCECP
          </Typography> */}
          {!currentUser ? (
            <Button color="inherit" startIcon={<Lock />} onClick={() => dispatch({ type: 'OPEN_LOGIN' })}>
              Login
            </Button>
          ) : (<UserIcons />)}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar