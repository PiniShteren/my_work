import { LOADING } from "../actions";

export const loading = (state = { flag: false }, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, flag: action.payload };
        default:
            return state;
    }
}