import React from 'react';
import {Link} from 'react-router-dom';
import style from './header.module.css';

import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/sideNav';

const Header = (props) => {

    const logo = () => (

            <Link to ="/" className={style.logo}>
                <img alt="nba logo" src="/images/nba_logo.png"/>
            </Link>
    )

    const navBars = () => (
        <div className={style.bars}>
            <FontAwesome name="bars"
                onClick={props.onOpenNav}
            />
        </div>
    )

    return (
        <header className={style.header}>
            <SideNav {...props}/>
            <div className={style.headerOptions}>
                {navBars()}
                {logo()}
            </div>
        </header>
    )
}

export default Header;