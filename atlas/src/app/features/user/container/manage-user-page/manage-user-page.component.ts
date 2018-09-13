import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user';
import { Store } from '@ngrx/store';
import * as userActions from '../../state/user.action';
import { select } from '@ngrx/store';
import { animate, trigger, state, transition, style } from '@angular/animations';
import * as fromUser from '../../state/user.reducer';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'atlas-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrls: ['./manage-user-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ManageUserPageComponent implements OnInit {
  
  errorMessage$ : Observable<string>;
  disableIDColumn$ : Observable<boolean>;
   
  users$ : Observable<User[]>;
  
  
  //componentActive = true
  constructor(
    private _userService : UserService,
    private _store: Store<fromUser.AppState>,
    private _router :Router
  ) { }


  ngOnInit() {
    this._store.dispatch(new userActions.Load());

    this.users$ = this._store.pipe(select(fromUser.getUsers));
    
    this.errorMessage$ = this._store.pipe(select(fromUser.getUserError));

    this.disableIDColumn$ = this._store.pipe(select(fromUser.getDisableIDColumns));
    
  }

  addUser(){
    this._store.dispatch(new userActions.InitializeCurrentUser());
    this._router.navigate(['/user', 'new']);
  }

  checkChanged(event : boolean) {
    this._store.dispatch(new userActions.ToggleDisplayIDColumn(event));
  }

  editUser(user : User) {
    if(user && user._id) {
      this._store.dispatch(new userActions.SetCurrentUser(user._id));
      this._router.navigate(['/user', user._id])
    }
    
  }

  deleteUser(user: User) : void {
    if(user && user._id) {
      this._store.dispatch(new userActions.DeleteUser(user._id));
    }
  }

}
