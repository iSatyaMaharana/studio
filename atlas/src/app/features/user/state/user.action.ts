/* NgRx */
import { Action } from '@ngrx/store';
import { User } from '../shared/user';

export enum UserActionType {
    ToggleDisplayIDColumn = '[User] ToggleDisplayIDColumn',
    SetCurrentUser = '[User] Set Current User',
    ClearCurrentUser = '[User] Clear Current User',
    InitializeCurrentUser = '[User] Initialize Current User',
    Load = '[User] Load',
    LoadSuccess = '[User] Load Success',
    LoadFail = '[User] Load Failure',
    CreateUser = '[User] Create User',
    CreateUserSuccess = '[User] Create User Success',
    CreateUserFail = '[User] Create Fail',
    UpdateUser = '[User] Update User',
    UpdateUserSuccess = '[User] Update User Success',
    UpdateUserFail = '[User] Update User Fail',
    DeleteUser = '[User] Delete User',
    DeleteUserSuccess = '[User] Delete User Success',
    DeleteUserFail = '[User] Delete User Fail'
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
    constructor(public payload : string) {
        

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

export class Load implements Action {
    readonly type = UserActionType.Load;
}

export class LoadSuccess implements Action {
    readonly type = UserActionType.LoadSuccess;
    constructor(public payload : User[]) {

    }
}

export class LoadFail implements Action {
    readonly type = UserActionType.LoadFail;
    constructor(public payload : string) {
    }
}

export class UpdateUserSuccess implements Action {
    readonly type = UserActionType.UpdateUserSuccess
    /**
     *
     */
    constructor(public payload : User) {
        

    }
}

export class UpdateUserFail implements Action {
    readonly type = UserActionType.UpdateUserFail;
    /**
     *
     */
    constructor(public payload: string) {
       
        
    }
}

export class UpdateUser implements Action {
    readonly type = UserActionType.UpdateUser

    /**
     *
     */
    constructor(public payload : User) {
    
        
    }
}

export class DeleteUser implements Action {
    readonly type = UserActionType.DeleteUser;
    /**
     *
     */
    constructor(public payload : string) {
        

    }
}

export class DeleteUserSuccess implements Action {
    readonly type = UserActionType.DeleteUserSuccess;
    /**
     *
     */
    constructor(public payload : string) {
       
        
    }
}

export class DeleteUserFail implements Action {
    readonly type = UserActionType.DeleteUserFail;
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
    | Load
    | LoadSuccess
    | LoadFail
    | CreateUserSuccess
    | CreateUserFail
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserFail
    | DeleteUser
    | DeleteUserSuccess
    | DeleteUserFail
    | ToggleDisplayIDColumn;
