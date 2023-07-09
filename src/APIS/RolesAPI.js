import React, { createContext, useEffect } from 'react';
import {
    URL_PATH,
    GET_ROLES_LIST,
    ADD_OR_EDIT_ROLE,
    GET_DEPARTMENTS_LIST,
    ADD_OR_EDIT_DEPARTMENT,
    GET_SUB_DEPARTMENTS_LIST,
    ADD_OR_EDIT_SUB_DEPARTMENT,
    ASSIGN_ROLE_TO_USER
} from '@env';
import { useDispatch } from 'react-redux';
import { setDepartments, setRoles, setSubDepartments } from '../redux/actions';

export const RolesContext = createContext();

export default function RolesProvider(props) {

    const dispatch = useDispatch();

    const getDepartmentsData = () => {
        return new Promise((resolve, reject) => {
            const url = `${URL_PATH}${GET_DEPARTMENTS_LIST}`;
            const body = new FormData();
            body.append("session", sessionStorage.getItem("session"));
            fetch(url, {
                method: "POST",
                body: body,
            }).then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        dispatch(setDepartments(res.departments || []));
                        getSubDepartmentsData();
                        resolve(true);
                    } else {
                        reject(res.message);
                    }
                })
                .catch((err) => {
                    reject(false);
                })
        })
    }

    const addOrEditDepartmentData = (roleObject, isDelete) => {
        return new Promise((resolve, reject) => {
            const url = `${URL_PATH}${ADD_OR_EDIT_DEPARTMENT}`;
            const body = new FormData();
            body.append("session", sessionStorage.getItem("session"));
            body.append("name", roleObject?.name);
            if (isDelete) {
                body.append("isDelete", true);
                body.append("id", roleObject?.id);
            }
            if (roleObject?.id) {
                body.append("id", roleObject?.id);
            }
            fetch(url, {
                method: "POST",
                body: body,
            }).then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        getDepartmentsData();
                        resolve(res.message);
                    } else {
                        reject(res.message);
                    }
                })
                .catch((err) => {
                    reject(false);
                })
        })
    }

    const getSubDepartmentsData = () => {
        return new Promise((resolve, reject) => {
            const url = `${URL_PATH}${GET_SUB_DEPARTMENTS_LIST}`;
            const body = new FormData();
            body.append("session", sessionStorage.getItem("session"));
            fetch(url, {
                method: "POST",
                body: body,
            }).then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        dispatch(setSubDepartments(res.subDepartments || []));
                        getRolesData();
                        resolve(true);
                    } else {
                        reject(res.message);
                    }
                })
                .catch((err) => {
                    reject(false);
                })
        })
    }

    const addOrEditSubDepartmentData = (roleObject, isDelete) => {
        return new Promise((resolve, reject) => {
            const url = `${URL_PATH}${ADD_OR_EDIT_SUB_DEPARTMENT}`;
            const body = new FormData();
            body.append("session", sessionStorage.getItem("session"));
            body.append("name", roleObject?.name);
            body.append("department_id", roleObject?.department_id);
            if (isDelete) {
                body.append("isDelete", true);
                body.append("id", roleObject?.id);
            }
            fetch(url, {
                method: "POST",
                body: body,
            }).then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        getSubDepartmentsData();
                        resolve(res.message);
                    } else {
                        reject(res.message);
                    }
                })
                .catch((err) => {
                    reject(false);
                })
        })
    }

    const getRolesData = () => {
        return new Promise((resolve, reject) => {
            const url = `${URL_PATH}${GET_ROLES_LIST}`;
            const body = new FormData();
            body.append("session", sessionStorage.getItem("session"));
            fetch(url, {
                method: "POST",
                body: body,
            }).then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        dispatch(setRoles(res.roles || []))
                        resolve(true);
                    } else {
                        reject(res.message);
                    }
                })
                .catch((err) => {
                    reject(false);
                })
        })
    }

    const addOrEditRoleData = (roleObject, isDelete) => {
        return new Promise((resolve, reject) => {
            const url = `${URL_PATH}${ADD_OR_EDIT_ROLE}`;
            const body = new FormData();
            body.append("session", sessionStorage.getItem("session"));
            body.append("name", roleObject?.name);
            body.append("department_id", roleObject?.department_id);
            body.append("sub_department_id", roleObject?.sub_department_id);
            if (isDelete) {
                body.append("isDelete", true);
                body.append("id", roleObject?.id);
            }
            fetch(url, {
                method: "POST",
                body: body,
            }).then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        getRolesData();
                        resolve(res.message);
                    } else {
                        reject(res.message);
                    }
                })
                .catch((err) => {
                    reject(false);
                })
        })
    }

    const assignRoleToUserData = () => {
        return new Promise((resolve, reject) => {
            const url = `${URL_PATH}${ADD_OR_EDIT_ROLE}`;
            const body = new FormData();
        })
    }

    useEffect(() => {
        if (props.isLoggedIn) {
            getDepartmentsData();
        }
    }, [props.isLoggedIn]);
    return (
        <RolesContext.Provider value={{
            getDepartmentsData,
            addOrEditDepartmentData,
            getSubDepartmentsData,
            addOrEditSubDepartmentData,
            getRolesData,
            addOrEditRoleData,
            assignRoleToUserData
        }}>
            {props.children}
        </RolesContext.Provider>
    );
}