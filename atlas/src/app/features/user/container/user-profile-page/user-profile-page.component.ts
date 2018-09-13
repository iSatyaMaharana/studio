import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../shared/user';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromUser from '../../state/user.reducer';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../state/user.action';
import { Observable } from 'rxjs';
import { map, tap } from '../../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'atlas-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {

  user$ : Observable<User>;
  id : string;
  
  constructor(private _route : ActivatedRoute,
    private _router : Router,
    private _store : Store<fromUser.AppState>) { }

  ngOnInit() {
    this._route.params
      .pipe(
        map(params => params['id']),
        tap(id => (this.id = id))
      )
      .subscribe(id => this.user$ = this._store.pipe(select(fromUser.getCurrentUserByID)));
    ;
  }

  createUser(newUser : User) {
    this._store.dispatch(new userActions.CreateUser(newUser));
    this._store.dispatch(new userActions.ClearCurrentUser());
    this._router.navigate(['/user']);
  }

  updateUser(existUser : User) {
    this._store.dispatch(new userActions.UpdateUser(existUser));
    this._store.dispatch(new userActions.ClearCurrentUser());
    this._router.navigate(['/user']);
  }

  

}
