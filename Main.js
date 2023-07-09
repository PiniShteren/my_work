import React, { useEffect } from 'react';
import AuthContext from './src/components/login/AuthContext';
import Login from './src/components/login/Login';
import LoginProvider from './src/APIS/LoginAPI';
import { useSelector } from 'react-redux';
import Loading from './src/elements/Loading';
import { NativeRouter, Routes, Route } from "react-router-native";
import DashboardIndex from './src/components/dashboard/DashboardIndex';
import UsersProvider from './src/APIS/UsersAPI';
import RolesProvider from "./src/APIS/RolesAPI";

export default function Main() {

    const loading = useSelector(state => state.loading.flag);
    const [isLoggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("session")) {
            setLoggedIn(true);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            <LoginProvider>
                <RolesProvider isLoggedIn={isLoggedIn}>
                    <UsersProvider isLoggedIn={isLoggedIn}>
                        {loading && <Loading />}
                        <NativeRouter>
                            <Routes>
                                {!isLoggedIn ?
                                    <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
                                    :
                                    <>
                                        <Route path="/" element={<DashboardIndex />} />
                                        <Route path="/users" element={<DashboardIndex />} />
                                        <Route path="/tasks" element={<DashboardIndex />} />
                                    </>
                                }
                            </Routes>
                        </NativeRouter>
                    </UsersProvider>
                </RolesProvider>
            </LoginProvider>
        </AuthContext.Provider>

    )
}
