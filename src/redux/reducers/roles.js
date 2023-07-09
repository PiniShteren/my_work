import { ROLES_FLAG, SET_DEPARTMENTS, SET_ROLES, SET_SUB_DEPARTMENTS } from "../actions";

export const rolesState = (state = { departments: [], subDepartments: [], roles: [], flag: true }, action) => {
    switch (action.type) {
        case SET_DEPARTMENTS:
            if (state.subDepartments?.length > 0) {
                action.payload.forEach((e) => {
                    e.subDepartments = [];
                    state.subDepartments.forEach((sub, index) => {
                        if (sub.department_id === e.id && !e.subDepartments.find((subS) => subS.id === e.id)) {
                            e.subDepartments.push(sub);
                        }
                    });
                });
            }
            if (state.roles?.length > 0) {
                action.payload.forEach((e) => {
                    e.subDepartments.forEach((sub) => {
                        sub.roles = [];
                        state.roles.forEach((role, index) => {
                            if (role.sub_department_id === sub.id && !sub.roles.find((roleS) => roleS.id === role.id)) {
                                sub.roles.push(role);
                            }
                        });
                    });
                });
            }
            return { ...state, departments: action.payload };
        case SET_SUB_DEPARTMENTS:
            state.departments.forEach((e) => {
                e.subDepartments = [];
                action.payload.forEach((sub, index) => {
                    if (sub.department_id === e.id && !e.subDepartments.find((subS) => subS.id === e.id)) {
                        e.subDepartments.push(sub);
                    }
                });
            });
            return { ...state, departments: [...state.departments], subDepartments: action.payload };
        case SET_ROLES:
            state.departments.forEach((e) => {
                e.subDepartments.forEach((sub) => {
                    sub.roles = [];
                    action.payload.forEach((role, index) => {
                        if (role.sub_department_id === sub.id && !sub.roles.find((roleS) => roleS.id === role.id)) {
                            sub.roles.push(role);
                        }
                    });
                });
            });
            return { ...state, departments: [...state.departments], roles: action.payload };
        case ROLES_FLAG:
            return { ...state, flag: action.payload }
        default: return state;
    }
}