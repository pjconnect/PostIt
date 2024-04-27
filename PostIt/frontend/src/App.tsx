import React, {Component, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import {Toaster} from 'react-hot-toast';
import {Layout} from "./pages/Layout";
import {UserContext} from './Store';

export default function App() {
    const [user, setUser] = useState(UserContext);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <Layout>
                <Toaster/>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const {element, ...rest} = route;
                        return <Route key={index} {...rest} element={element}/>;
                    })}
                </Routes>
            </Layout>
        </UserContext.Provider>

    );
}
