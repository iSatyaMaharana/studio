import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { UserService } from "../shared/user.service";
import * as userActions from "./user.action";
import { ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, merge } from "rxjs/operators";

import { Effect } from "@ngrx/effects";
import { User, UserResponse } from "../shared/user";
import * as fromUser from './user.reducer';
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { EntityService } from './../../../core/services/entity-service';
@Injectable()
export class UserEffects {
    /**
     *
     */
    constructor(private actions$ :  Actions,
    private _userService : UserService,
    private _entityService : EntityService) { 

    }

    @Effect()
    loadUsers$ = this.actions$.pipe(
        ofType(userActions.UserActionType.Load),
        mergeMap(action =>
            this._userService.getUsers().pipe(
                map((response : UserResponse) => { 
                    const results  = this._entityService.camelCase(response.results);
                    return (new userActions.LoadSuccess(results as User[]))
                }
            ),
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
                map((response : UserResponse) => { 
                    console.log(response);
                    const result = this._entityService.camelCase(response.results)[0];
                    console.log(result);
                    return new userActions.UpdateUserSuccess(result);
                }),
                catchError(err => of(new userActions.UpdateUserFail(err)))
            )
        )
    );

    @Effect()
    createUser$ : Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionType.CreateUser),
        map((action : userActions.CreateUser) => action.payload),
        mergeMap((user : User) =>
            this._userService.createUser(user).pipe(
                map((response : UserResponse) => {
                    const result = this._entityService.camelCase(response.results)[0];
                    return new userActions.CreateUserSuccess(result as User)

                }),
                catchError(err => of(new userActions.CreateUserFail(err)))
            )
        )
    );

    @Effect()
    deleteUser$ : Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionType.DeleteUser),
        map((action : userActions.DeleteUser) => action.payload),
        mergeMap((userId : string) => 
            this._userService.deleteUser(userId).pipe(
                map(() => new userActions.DeleteUserSuccess(userId)),
                catchError(err => of(new userActions.DeleteUserFail(err)))
            )
        )
    );

    
}

    