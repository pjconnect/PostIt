import React, {useContext, useEffect, useState} from 'react';
import {Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';
import {UserContext} from '../Store';
import ApiService from "../ApiService";

function NavMenu() {
    const [collapsed, setCollapsed] = useState(true);
    const [user, setUser] = useState(null as null | {username:string});
    const apiService = new ApiService();

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        console.log('navbar called');
        getMyInfo();
    }, [])

    async function getMyInfo() {
        let res = await apiService.getMyInfo();
        setUser(res.data)
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container
                    light>
                <NavbarBrand tag={Link} to="/">
                    <h1 className="text-3xl font-bold text-gray-800">PostIt</h1>
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    {user ? (
                        <div className="flex justify-content-center align-items-center">
                            <Link to={'/my-posts'} className="text-gray-800 pr-2 font-thin">
                                {user.username}
                            </Link>
                            <NavLink tag={Link}
                                     className="text-gray-800 hover:text-gray-600 text-sm font-medium"
                                     to="/login">Logout</NavLink>
                        </div>
                    ) : (
                        <ul className="navbar-nav flex-grow justify-end">
                            <NavItem>
                                <NavLink tag={Link}
                                         className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                         to="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link}
                                         className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                         to="/register">Register</NavLink>
                            </NavItem>
                        </ul>
                    )}
                </Collapse>
            </Navbar>
        </header>
    );
}

export default NavMenu;
