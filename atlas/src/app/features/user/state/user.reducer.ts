import { User } from "../shared/user";
import * as fromRoot from '../../../state/app.state';
import { UserActions, UserActionType } from "./user.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface AppState extends fromRoot.AppState {
    users : Array<UserState>;
}

export interface UserState {
    currentUserId: number | null;
    users: Array<User>;
    disabledIDColumn: boolean;
    error: string;
    
}
// Initialize User State
const initialUserState : UserState = {
    currentUserId: null,
    users: [],
    disabledIDColumn: false,
    error:''

}
//Selectors 
const getUserFeatureState = 
    createFeatureSelector<UserState>('users');

export const getDisableIDColumns =
    createSelector(
        getUserFeatureState,
        state => state.disabledIDColumn
    );
export const getUsers = 
    createSelector(
        getUserFeatureState,
        state => state.users
    );
// export const getCurrentUser = 
//     createSelector(
//         getUserFeatureState,
//         state => state.currentUser
//     );

export const getCurrentUserID = 
    createSelector(
        getUserFeatureState,
        state => state.currentUserId
    );

export const getCurrentUserByID =
    createSelector(
        getUserFeatureState,
        getCurrentUserID,
        (state, currentUserId) => {
            if(currentUserId == 0) {
                return {
                    id: 0,
                    firstName:'',
                    lastName:'',
                    email: '',
                    mobile: '',
                    password:'',
                    confirmPassword:''
                };
            } else {
                return currentUserId ? state.users.find(t => t.id == currentUserId) : null;
            }
        }
    );




export function reducer(state: UserState = initialUserState, action : UserActions) : UserState {
    switch(action.type) {
        case UserActionType.ToggleDisplayIDColumn:
            return {
                ...state,
                disabledIDColumn : action.payload
            };
        case UserActionType.SetCurrentUser:
            return {
                ...state,
                //currentUser : action.payload,
                currentUserId : action.payload

            }
        case UserActionType.InitializeCurrentUser:
            return {
                ...state,
                currentUserId : 0
            };

        case UserActionType.LoadSuccess:
        return {
                ...state,
                users : action.payload
        }

        
        case UserActionType.ClearCurrentUser:
            return {
                ...state,
                currentUserId : null
            };
        
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
        case UserActionType.UpdateUserSuccess:
            const updatedUsers = state.users
                .map(item => action.payload.id == item.id ? action.payload : item);
            return {
                ...state,
                users : updatedUsers,
                currentUserId : action.payload.id,
                error : '',

            };
        case UserActionType.UpdateUserFail:
            return {
                ...state,
                error: action.payload
            }
        // case UserActionType.DeleteUserSuccess:

        //     return {
                
        //     }
        default:
            return state;

    }
}