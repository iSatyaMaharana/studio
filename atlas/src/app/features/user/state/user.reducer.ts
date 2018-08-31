import { User } from "../shared/user";
import * as rootState from '../../../state/app.state';
import { UserActionType, EnUserAction } from "./user.action";

export interface State extends rootState.State {
    users : Array<User>;
}

export interface UserState {
    currentUserId: number;
    users: Array<User>;
    disabledIDColumn: boolean;
    error: string;
    
}

const initialUserState : UserState = {
    currentUserId: null,
    users: [],
    disabledIDColumn: false,
    error:''

}

export function reducer(state = initialUserState, action : UserActionType) : UserState {
    switch(action.type) {
        case EnUserAction.ToggleDisplayIDColumn:
            return {
                ...state,
                disabledIDColumn : action.payload
            };
        case EnUserAction.CreateUserSuccess:
            return {
                ...state,
                users : [...state.users, action.payload],
                currentUserId: action.payload.id,
                error : '',
            };
        case EnUserAction.CreateUserFail:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;

    }
}