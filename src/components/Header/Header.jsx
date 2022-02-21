import React from 'react';
import { NavLink } from "react-router-dom";

// Framer Motion
import { motion } from 'framer-motion';

// CSS
import '../../index.css';
import styled from 'styled-components';

const HeaderNav = styled.div`
    background-color: #4A154B;
    color: #fff;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 0px 0px 15px #310e31;
    outline: none;
    padding: 1rem;

    >nav {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    >nav>a {
        text-decoration: none;
        color: #fff;
        font-size: 1.75rem;
    }

    >nav>ul {
        list-style: none;
        display: flex;
        flex-direction: row;
        gap: 2rem;
        margin-top: 0.75rem;
    }

    >nav>ul>li {
        cursor: pointer;
    }

    @media screen and (max-width: 500px) {
        >nav {
            gap: 1rem;
        }
    }
`

const Button = styled.button`
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 15px;
    font-size: 1.25rem;
    color: #4A154B;
    transition: 0.25s;

    &:hover {
        border-radius: 0px;
    }
`

const Header = () => {

    return (
        <HeaderNav>
            <motion.nav
                initial={{ visibility: 'hidden', y: '-5vh' }}
                animate={{ visibility: 'visible', y: '0vh' }}
                transition={{ type: 'spring', bounce: 0.2, duration: 1, delay: 2 }}
            >
                <NavLink
                    to="/"
                    exact
                >
                    islaack
                </NavLink>
                <ul className="static-links">
                    <li id="sl-1">Product</li>
                    <li id="sl-2">Solutions</li>
                    <li id="sl-3">Resources</li>
                </ul>
                <Button className="sign-in-btn" to="/signin" exact>
                    Create a New WorkSpace
                </Button>
            </motion.nav>
        </HeaderNav>
    )
}

export default Header