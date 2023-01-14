import React from 'react';
import {NavLink} from "react-router-dom";
import {Button, SvgIcon} from "@mui/material";
import "./nav-bar.scss"

const NavBar = () => {
    const HomeIcon = (props) => (
        <SvgIcon width="1em" height="1em" viewBox="0 0 512 512" {...props}>
            <path fill="currentColor" d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9
            448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16
            16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79Z"></path>
            <path fill="currentColor" d="m490.91
            244.15l-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71
            32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43
            267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97Z"></path>
        </SvgIcon>
    );

    const CollectionIcon = (props) => (
        <SvgIcon width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0zm7.5 0c0 5.52-4.48
            10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10zm-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0
            4.41 3.59 8 8 8s8-3.59 8-8z"></path>
        </SvgIcon>
    );

    return (
        <div id="navbar" className="grid grid-cols-2">
            <Button>
                <NavLink
                    className={({isActive}) => isActive ? 'tab-icon-active' : 'tab-icon'} to="/">
                    <HomeIcon
                        sx={{
                            fontSize: "2.1em",
                        }}/>
                    <span>Home</span>
                </NavLink>
            </Button>
            <Button>
                <NavLink className={({isActive}) => isActive ? 'tab-icon-active' : 'tab-icon'}
                         to="/collection">
                    <CollectionIcon
                        sx={{
                            fontSize: "2.2em",
                        }}/>
                    <span>My Collection</span>
                </NavLink>
            </Button>
        </div>
    );
};

export default NavBar;