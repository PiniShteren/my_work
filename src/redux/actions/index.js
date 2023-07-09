// login or register
export const LOGIN = "LOGIN";
export const FORGOT = "FORGOT";
export const END = "END";
export const CREATOR_OPTIONS = "CREATOR_OPTIONS";
export const NEW_GAME_CREATOR = "NEW_GAME_CREATOR"
export const GAME_LIST = "GAME_LIST";
export const IN_GAME = "IN_GAME";
export const START_GAME = "START_GAME";
export const LOADING = "LOADING";

// types for screens 
export const setLoading = (flag) => {
  return {
    type: LOADING,
    payload: flag
  };
};

export const DESTROY_SESSION = "DESTROY_SESSION";

export const destroySession = () => {
  return {
    type: DESTROY_SESSION
  }
}

export const USERS = "USERS";
export const setUsers = (users) => {
  return {
    type: USERS,
    payload: users
  };
}

export const USER_DETAILES = "USER_DETAILES";
export const setUserDetailes = (user) => {
  return {
    type: USER_DETAILES,
    payload: user
  };
}

export const USER_EDIT = "USER_EDIT";
export const setEditUser = (user, isNew) => {
  return {
    type: USER_EDIT,
    payload: user,
    isNew: isNew
  };
}

export const POPUP_MESSAGE = "POPUP_MESSAGE";
export const setPopupMessage = (title, body, isError) => {
  return {
    type: POPUP_MESSAGE,
    title: title,
    body: body,
    isError: isError
  }
}

export const SET_ROLES = "SET_ROLES"; 
export const setRoles = (roles) => {
  return {
    type: SET_ROLES,
    payload: roles
  }
}

export const SET_DEPARTMENTS = "SET_DEPARTMENTS"; 
export const setDepartments = (departments) => {
  return {
    type: SET_DEPARTMENTS,
    payload: departments
  }
}

export const SET_SUB_DEPARTMENTS = "SET_SUB_DEPARTMENTS"; 
export const setSubDepartments = (subDepartments) => {
  return {
    type: SET_SUB_DEPARTMENTS,
    payload: subDepartments
  }
}

export const ROLES_FLAG = "ROLES_FLAG"; 
export const setRolesFlag = (flag) => {
  return {
    type: ROLES_FLAG,
    payload: flag
  }
}
