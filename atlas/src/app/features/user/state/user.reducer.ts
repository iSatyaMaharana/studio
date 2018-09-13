import { User } from "../shared/user";
import * as fromRoot from '../../../state/app.state';
import { UserActions, UserActionType } from "./user.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface AppState extends fromRoot.AppState {
    users : Array<UserState>;
}

export interface UserState {
    currentUserId: string;
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

export const getUserError = 
    createSelector(
        getUserFeatureState,
        state => state.error
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
            if(currentUserId == '') {
                return {
                    _id: '',
                    firstName:'',
                    lastName:'',
                    email: '',
                    mobile: '',
                    password:'',
                    confirmPassword:''
                };
            } else {
                return currentUserId ? state.users.find(t => t._id == currentUserId) : null;
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
                currentUserId : ''
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
                currentUserId: action.payload._id,
                error : '',
            };
        case UserActionType.CreateUserFail:
            return {
                ...state,
                error: action.payload
            };
        case UserActionType.UpdateUserSuccess:
            const updatedUsers = state.users
                .map(item => action.payload._id == item._id ? action.payload : item);
            return {
                ...state,
                users : updatedUsers,
                currentUserId : action.payload._id,
                error : '',

            };
        case UserActionType.UpdateUserFail:
            return {
                ...state,
                error: action.payload
            }
        case UserActionType.DeleteUserSuccess:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
                currentUserId: null,
                error: ''
            };
        case UserActionType.DeleteUserFail:
            return {
                ...state,
                currentUserId:null,
                error: action.payload
            };
            
        default:
            return state;

    }
}