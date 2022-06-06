import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
// Routes вместо Switch
// Navigate вместо Redirect
import { AuthContext } from '../context';
import { publicRoutes, privateRoutes } from '../router/';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    // console.log('isAuth: ', isAuth);

    if(isLoading){
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={<route.component/>}
                        path={route.path}
                        exact={route.exect}
                        // element вместо component
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate to="/posts" />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={<route.component/>}
                        path={route.path}
                        exact={route.exect}
                        // element вместо component
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>


    )
}

export default AppRouter;