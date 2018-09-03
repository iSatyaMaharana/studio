/* NgRx */
import { Action } from '@ngrx/store';
import { User } from '../shared/user';

export enum UserActionType {
    ToggleDisplayIDColumn = '[User] ToggleDisplayIDColumn',
    SetCurrentUser = '[User] Set Current User',
    ClearCurrentUser = '[User] Clear Current User',
    InitializeCurrentUser = '[User] Initialize Current User',
    CreateUser = '[User] Create User',
    CreateUserSuccess = '[User] Create User',
    CreateUserFail = '[User] Create Fail',
}


export class ToggleDisplayIDColumn implements Action {
    readonly type = UserActionType.ToggleDisplayIDColumn;
    /**
     *
     */
    constructor(public payload : boolean) { }
}

export class SetCurrentUser implements Action {
    readonly type = UserActionType.SetCurrentUser;
    /**
     *
     */
    constructor(public payload : User) {
        

    }
}

export class ClearCurrentUser implements Action {
    readonly type = UserActionType.ClearCurrentUser;
    /**
     *
     */
    constructor() {
        

    }
}

export class InitializeCurrentUser implements Action {
    readonly type = UserActionType.InitializeCurrentUser;

    /**
     *
     */
    constructor() {
        
        
    }
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
    | SetCurrentUser
    | ClearCurrentUser
    | InitializeCurrentUser
    | CreateUserSuccess
    | CreateUserFail
    | ToggleDisplayIDColumn;
