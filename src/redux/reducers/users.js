import { USERS, USER_EDIT } from "../actions";

export const usersState = (state = { users: [], userEdit: {}, flag: false, isNew: false }, action) => {
    switch (action.type) {
        case USERS:
            let newArr = [];
            action.payload.forEach((e) => {
                let newUser = {
                    id: e.id,
                    first_name: e.first_name,
                    last_name: e.last_name,
                    email: e.email,
                    permission: e.permission,
                    profile_image: e.profile_image,
                    phone_number: e.phone_number,
                    roles: e.roles,
                    id_number: e.id_number,
                };
                newArr.push(newUser);
            })
            return { ...state, users: newArr };
        case USER_EDIT: {
            if (action.payload) {
                return { ...state, userEdit: action.payload, flag: true, isNew: action.isNew };
            } else {
                return { ...state, userEdit: {}, flag: false };
            }
        }
        default:
            return state;
    }
}