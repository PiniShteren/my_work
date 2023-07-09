import React, { createContext, useEffect } from 'react';
import { URL_PATH, LOGIN, SIGN_UP, RESET_PASSWORD, GET_USER_BY_SESSION } from "@env";
import { useDispatch } from 'react-redux';
import { setUserDetailes } from '../redux/actions';

export const LoginContext = createContext();

export default function LoginProvider(props) {

    const dispatch = useDispatch();

  /// 1 for god; 2 for admin in company; 
  /// 3 for manage in company; 
  /// 4 for shift-manager/category-manager;
  /// 5 for employee

    const login = (object) => {
        return new Promise((resolve, reject) => {
            const body = new FormData();
            const url = `${URL_PATH}${LOGIN}`;
            body.append("email", object.email);
            body.append("password", object.password);
            const requestOption = {
                method: "POST",
                body: body
            }
            try {
                fetch(url, requestOption)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.success) {
                            sessionStorage.setItem("session", res.user.sessionKey);
                            dispatch(setUserDetailes(res));
                            resolve(true);
                        } else {
                            reject(res.message);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    })
            } catch (e) {
                reject(err);
            }
        })
    }

    const signUp = () => {
        return new Promise((resolve, reject) => {
            const body = new FormData();
            const url = `${URL_PATH}${SIGN_UP}`;
            const requestOption = {
                method: "POST",
                body: body
            }
            try {
                fetch(url, requestOption)
                    .then((res) => res.json())
                    .then((res) => {

                    })
                    .catch((err) => {

                    })
            } catch (e) {

            }
        })
    }

    const getUserBySession = (session) => {
        return new Promise((resolve, reject) => {
            const body = new FormData();
            body.append("session", session);
            const url = `${URL_PATH}${GET_USER_BY_SESSION}`;
            const requestOption = {
                method: "POST",
                body: body
            }
            try {
                fetch(url, requestOption)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.success) {
                            sessionStorage.setItem("session", res.user.sessionKey);
                            dispatch(setUserDetailes(res));
                            resolve(true);
                        } else {
                            reject(res.message);
                        }
                    })
                    .catch((err) => {
                        reject(false);
                    })
            } catch (e) {

            }
        })
    }

    const resetPassword = () => {
        return new Promise((resolve, reject) => {
            const body = new FormData();
            const url = `${URL_PATH}${RESET_PASSWORD}`;
            const requestOption = {
                method: "POST",
                body: body
            }
            try {
                fetch(url, requestOption)
                    .then((res) => res.json())
                    .then((res) => {

                    })
                    .catch((err) => {

                    })
            } catch (e) {

            }
        })
    }

    useEffect(() => {

    }, []);
    return (
        <LoginContext.Provider value={{ login, signUp, resetPassword, getUserBySession }}>
            {props.children}
        </LoginContext.Provider>
    );
}
