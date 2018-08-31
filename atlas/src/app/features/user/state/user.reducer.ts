import { User } from "../shared/user";
import * as rootState from '../../../state/app.state';
import { UserActions, UserActionType } from "./user.action";

export interface State extends rootState.State {
    users : Array<User>;
}

export interface UserState {
    currentUserId: number;
    users: Array<User>;
    showUserName: boolean;
    error: string;
    
}

const initialUserState : UserState = {
    currentUserId: null,
    users: [],
    showUserName: false,
    error:''

}

export function reducer(state = initialUserState, action : UserActions) : UserState {
    switch(action.type) {
        case UserActionType.CreateUserSuccess:
            return {
                ...state,
                users : [...state.users, action.payload],
                currentUserId: action.payload.id,
                error : '',
            };
        case UserActionType.CreateUserFail:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;

    }
}