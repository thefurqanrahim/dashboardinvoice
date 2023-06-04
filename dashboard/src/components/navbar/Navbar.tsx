import React, { useState } from 'react';

// MUI Design Library
import { Grid, ListItemButton, IconButton, Divider, Typography, List, Toolbar, CssBaseline, Drawer, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Local Pages
import Home from '../../home/Home';
import Result from '../../result/Result';
import Form from '../../form/Form';

// Reacr Router Dom
import { Routes, Route, Link } from 'react-router-dom'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [data, setData] = useState({ username: "", amount: "", date: "", status: "" })
    const [open, setOpen] = useState(window.innerWidth > 900 ? true : false);
    const [user, setUser] = useState<any[]>([])
    const [update, setUpdate] = useState(false)
    const [userId, setUserId] = useState<any>("");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Invoice Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link className='navLink' to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemButton>
                            Home
                        </ListItemButton>
                    </Link>
                    <Link className='navLink' to="/form" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemButton>
                            Invoice Form
                        </ListItemButton>
                    </Link>
                    <Link className='navLink' to="/result" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemButton>
                            Invoice
                        </ListItemButton>
                    </Link>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Grid sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "80vh" }}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/form' element={<Form userId={userId} setUserId={setUserId} user={user} setUser={setUser} update={update} setUpdate={setUpdate} data={data} setData={setData} />} />
                        <Route path='/result' element={<Result userId={userId} setUserId={setUserId} setUser={setUser} user={user} update={update} setUpdate={setUpdate} data={data} setData={setData} />} />

                    </Routes>
                </Grid>
            </Main>
        </Box >
    );
}