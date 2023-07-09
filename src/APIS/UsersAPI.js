import React, { createContext, useEffect } from 'react';
import { URL_PATH, GET_ALL_USERS, ADD_OR_EDIT_USER } from "@env";
import { useDispatch } from 'react-redux';
import { setUserDetailes, setUsers } from '../redux/actions';

export const UsersContext = createContext();

export default function UsersProvider(props) {

    const dispatch = useDispatch();

    /// 1 for god; 2 for admin in company; 
    /// 3 for manage in company; 
    /// 4 for shift-manager/category-manager;
    /// 5 for employee

    ///
    const base64ToBuffer = (base64String) => {
        let base64Data = base64String.split(';base64,').pop();
        let binary_string = window.atob(base64Data);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }
    ///

    const getAllUsers = (object) => {
        return new Promise((resolve, reject) => {
            const body = new FormData();
            const url = `${URL_PATH}${GET_ALL_USERS}`;
            body.append("session", sessionStorage.getItem("session"));
            const requestOption = {
                method: "POST",
                body: body
            }
            try {
                fetch(url, requestOption)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.success) {
                            dispatch(setUsers(res.users));
                            resolve(true);
                        } else {
                            sessionStorage.removeItem("session")
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

    const addOrEditUserData = (user) => {
        return new Promise((resolve, reject) => {
            const body = new FormData();
            const url = `${URL_PATH}${ADD_OR_EDIT_USER}`;
            if (user?.id) {
                body.append("id", user.id);
            }
            body.append("session", sessionStorage.getItem("session"));
            body.append("first_name", user.first_name);
            body.append("last_name", user.last_name);
            body.append("email", user.email);
            body.append("profile_image", user.profile_image?.file);
            body.append("phone_number", user.phone_number);
            body.append("permission", user.permission);
            body.append("id_number", user.id_number);
            const requestOption = {
                method: "POST",
                body: body
            }
            try {
                fetch(url, requestOption)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.success) {
                            getAllUsers();
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

    useEffect(() => {
        if (props.isLoggedIn) {
            getAllUsers();
        }
    }, [props.isLoggedIn]);
    return (
        <UsersContext.Provider value={{ getAllUsers, addOrEditUserData }}>
            {props.children}
        </UsersContext.Provider>
    );
}
