import { combineReducers } from "redux";
import { loading } from "./loading";
import { DESTROY_SESSION } from "../actions";
import { userDetails } from "./user";
import { usersState } from "./users";
import { popupMessage } from "./popupMessage";
import { rolesState } from "./roles";

const appReducer = combineReducers({
    loading: loading,
    userDetails: userDetails,
    usersState: usersState,
    popupMessage: popupMessage,
    rolesState: rolesState
});

const rootReducer = (state, action) => {
    if (action.type === DESTROY_SESSION) {
        state = undefined;
    }

    return appReducer(state, action);
};
export default rootReducer;
