import React from 'react'
import { Link, useLocation } from 'react-router-dom'; 
import { Button } from 'semantic-ui-react'; 
import { PropsType } from './types';
import {
    NavMenuStyle,
    NavMenuLogo, 
    NavMenuRight,
    NavMenuUserName
} from './NavMenu-style';

const NavMenu = ({ user, onLogout }: PropsType ) => {
    const location = useLocation();

    return (
        <NavMenuStyle>
            <NavMenuLogo>DeviceChecker</NavMenuLogo>

            {user ? (
                <NavMenuRight>
                    <NavMenuUserName>{user.name}</NavMenuUserName>
                    <Button compact onClick={onLogout}>Odhlásit se</Button> 
                    {user.type === 'admin' ? 
                        location.pathname === '/new-device' ? (
                            <Button compact as={Link} to="/devices">Všechna zařízení</Button> 
                        ) : (
                            <Button compact as={Link} to="/new-device">Přidat zařízení</Button>
                        )
                    : ''}
                </NavMenuRight>
            ) : ''}
        </NavMenuStyle>
    )
}

export default NavMenu;
