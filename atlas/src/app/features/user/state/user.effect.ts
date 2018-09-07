import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { UserService } from "../shared/user.service";
import * as userActions from "./user.action";
import { ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, merge } from "rxjs/operators";

import { Effect } from "@ngrx/effects";
import { User } from "../shared/user";
import * as fromUser from './user.reducer';
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class UserEffects {
    /**
     *
     */
    constructor(private actions$ :  Actions,
    private _userService : UserService) { 

    }

    @Effect()
    loadUsers = this.actions$.pipe(
        ofType(userActions.UserActionType.Load),
        mergeMap(action =>
            this._userService.getUsers().pipe(
                map((users : User[]) => (new userActions.LoadSuccess(users))),
                catchError(err => of(new userActions.LoadFail(err)))
            )
        )
    );

    @Effect()
    updateUser$ : Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionType.UpdateUser),
        map((action : userActions.UpdateUser) => action.payload),
        mergeMap((user : User) =>
            this._userService.updateUser(user).pipe(
                map(updatedUser => new userActions.UpdateUserSuccess(user)),
                catchError(err => of(new userActions.UpdateUserFail(err)))
            )
        )
    );

    @Effect()
    createUser : Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionType.CreateUser),
        map((action : userActions.CreateUser) => action.payload),
        mergeMap((user : User) =>
            this._userService.createUser(user).pipe(
                map((newUser : User) => new userActions.CreateUserSuccess(newUser)),
                catchError(err => of(new userActions.CreateUserFail(err)))
            )
        )
    );

    @Effect()
    deleteUser : Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionType.DeleteUser),
        map((action : userActions.DeleteUser) => action.payload),
        mergeMap((userId : number) => 
            this._userService.deleteUser(userId).pipe(
                map(() => new userActions.DeleteUserSuccess(userId)),
                catchError(err => of(new userActions.DeleteUserFail(err)))
            )
        )
    );

    
}

    