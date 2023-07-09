import { POPUP_MESSAGE } from "../actions";

export const popupMessage = (state = { object: false }, action) => {
    switch (action.type) {
        case POPUP_MESSAGE:
            if (!action.title) {
                return { ...state, object: false }
            } else {
                return {
                    ...state, object: {
                        title: action.title,
                        body: action.body,
                        isError: action.isError
                    }
                }
            }
        default: return state;
    }
}