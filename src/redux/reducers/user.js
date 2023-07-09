import { USER_DETAILES } from '../actions';

/// 1 for god; 2 for admin in company; 
/// 3 for manage in company; 
/// 4 for shift-manager/category-manager;
/// 5 for employee

export const userDetails = (state = { userDetailes: {}, user: false }, action) => {
    switch (action.type) {
        case USER_DETAILES:
            return { ...state, userDetails: action.payload };
        default:
            return state;
    }
}