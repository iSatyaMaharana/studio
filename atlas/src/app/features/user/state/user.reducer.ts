import { User } from "../shared/user";
import * as rootState from '../../../state/app.state';
import { UserActions, UserActionType } from "./user.action";

export interface State extends rootState.State {
    users : Array<User>;
}

export interface UserState {
    currentUser: User;
    users: Array<User>;
    showUserName: boolean;
    
}

const initialUserState : UserState = {
    currentUser: null,
    users: [],
    showUserName: false
}

export function reducer(state = initialUserState, action : UserActions) : UserState {
    switch(action.type) {
        case UserActionType.CreateUser:
            return {
                ...state,

            };
        case UserActionType.CreateUserSuccess:
            return {
                ...state,
                
            };
        case UserActionType.CreateUserFail:
            return {
                ...state,
                
            };
        default:
            return state;

    }
}