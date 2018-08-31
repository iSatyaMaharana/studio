/* NgRx */
import { Action } from '@ngrx/store';
import { User } from '../shared/user';

export enum EnUserAction {
    ToggleDisplayIDColumn = '[user] ToggleDisplayIDColumn',
    CreateUser = '[User] Create User',
    CreateUserSuccess = '[Product] Create User',
    CreateUserFail = '[Product] Create Fail',
}


export class ToggleDisplayIDColumn implements Action {
    readonly type = EnUserAction.ToggleDisplayIDColumn;
    /**
     *
     */
    constructor(public payload : boolean) { }
}

export class CreateUser implements Action {
    readonly type = EnUserAction.CreateUser;
    
    /**
     *
     */
    constructor(public payload : User) {
        
    }
}

export class CreateUserSuccess implements Action {
    readonly type = EnUserAction.CreateUserSuccess;
    
    /**
     *
     */
    constructor(public payload : User) {
        
    }

}

export class CreateUserFail implements Action {
    readonly type = EnUserAction.CreateUserFail;
    
    /**
     *
     */
    constructor(public payload : string) {
        
    }

}

export type UserActionType = CreateUser
    | CreateUserSuccess
    | CreateUserFail
    | ToggleDisplayIDColumn;
