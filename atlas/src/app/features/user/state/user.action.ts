/* NgRx */
import { Action } from '@ngrx/store';
import { User } from '../shared/user';

export enum UserActionType {
    CreateUser = '[User] Create User',
    CreateUserSuccess = '[Product] Create User',
    CreateUserFail = '[Product] Create Fail',
}

export class CreateUser implements Action {
    readonly type = UserActionType.CreateUser;
    
    /**
     *
     */
    constructor(public payload : User) {
        
    }
}

export class CreateUserSuccess implements Action {
    readonly type = UserActionType.CreateUserSuccess;
    
    /**
     *
     */
    constructor(public payload : User) {
        
    }

}

export class CreateUserFail implements Action {
    readonly type = UserActionType.CreateUserFail;
    
    /**
     *
     */
    constructor(public payload : string) {
        
    }

}

export type UserActions = CreateUser
    | CreateUserSuccess
    | CreateUserFail;
