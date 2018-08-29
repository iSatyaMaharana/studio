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
    constructor(payload : User) {
        
    }
}

export class CreateUserSuccess implements Action {
    readonly type = UserActionType.CreateUserSuccess;
    
    /**
     *
     */
    constructor(payload : User) {
        
    }

}

export class CreateUserFail implements Action {
    readonly type = UserActionType.CreateUserFail;
    
    /**
     *
     */
    constructor(payload : User) {
        
    }

}

export type UserActions = CreateUser
    | CreateUserSuccess
    | CreateUserFail
    ;
