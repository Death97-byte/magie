import React, { useState, useEffect } from "react";
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, AppBar, IconButton, Drawer, MenuItem } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      justifyContent: 'space-between',
    },
    toolbarMobile:{
    },
    logoContainer:{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    toolbarTitle: {
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
    },
    toolbarLink: {
      padding: theme.spacing(1),
    },
    toolbarOptionsDiv: {
        display: 'flex',
        flexDirection: 'row',

    },
    toolbarOptions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    mobileToolbar: {
        justifyContent: 'space-between'
    },
    driverChoices:{
        padding: "20px 30px",
    }
   
  }));
  


const sections = [
    { title: 'Categories', url: '#' },
    { title: 'Clothing', url: '#' },
    { title: 'Men', url: '#' },
    { title: 'Woman', url: '#' },
    { title: 'Kids', url: '#' }
  ];
  

export const Header = () => {
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    })
    const classes = useStyles();
    const { mobileView, drawerOpen } = state;

  
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);


  const RightButtons = () => {
        return (
            <div className={classes.toolbarOptionsDiv}>
                <div className={classes.toolbarOptions}>
                    <PersonIcon/>
                    <Link component={RouterLink} color="inherit" key="logIn" href='#'>LogIn</Link>
                </div>
                <div className={classes.toolbarOptions}>
                    <ShoppingCartIcon/>
                    <Link component={RouterLink} color="inherit" key="logIn" href='#'>Cart</Link>
                </div>
            </div>
        )
    }
      const displayDesktop = () => {
          
        return (
            <Toolbar className={classes.toolbar}>
                <div className={classes.logoContainer}>
                    <StorefrontIcon fontSize="default"/>
                    <Typography variant="h5" className={classes.toolbarTitle}>
                        Magie-Shop
                    </Typography>
                </div>
                <Toolbar component="nav" className={classes.toolbarSecondary}>
                        {sections.map((section) => (
                            <Link component={RouterLink} color="inherit" key={section.title} href={section.url} className={classes.toolbarLink}>
                                {section.title}
                            </Link>
                        ))}
                </Toolbar>
                <RightButtons />    
            </Toolbar>
        )
    } 


    const displayMobile = () => {
        const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));
        return (
            <Toolbar className={classes.mobileToolbar}>
                <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}> 
                    <MenuIcon />
                </IconButton>
                <Drawer className={classes.drawerChoices} anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                    <div>{getDrawerChoices()}</div>
                </Drawer>
                <div className={classes.logoContainer}>
                    <StorefrontIcon fontSize="default"/>
                    <Typography variant="h6" className={classes.toolbarTitle}>
                        Magie-Shop
                    </Typography>
                </div>
                {RightButtons()}
                
            </Toolbar>
        )
    }
    const getDrawerChoices = () => {
        return sections.map((section) => {
          return (
            <Link component={RouterLink} to={section.url} color="inherit" key={section.title}>
              <MenuItem>{section.title}</MenuItem>
            </Link>
          );
        });
      };
    

    return (
        <header>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            <AppBar position="static">
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    )
}