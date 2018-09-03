import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { UserService } from "../shared/user.service";
import * as userActions from "./user.action";
import { ofType } from "@ngrx/effects";
import { mergeMap } from "rxjs/operators";
import { map } from "rxjs/internal/operators/map";
import { Effect } from "@ngrx/effects";
import { User } from "../shared/user";

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
        mergeMap( action =>
            this._userService.getUsers().pipe(
                map((users : User[]) => (new userActions.LoadSuccess(users)))
            )
        )
    );

    
}

    