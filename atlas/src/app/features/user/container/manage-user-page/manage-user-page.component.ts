import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Store } from '@ngrx/store';
import * as userActions from '../../state/user.action';
import { select } from '@ngrx/store';
import { SelectionModel } from '@angular/cdk/collections';
import { animate, trigger, state, transition, style } from '@angular/animations';
import * as fromUser from '../../state/user.reducer';
import { Router } from '@angular/router';


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
  
  constructor(
    private _userService : UserService,
    private _store: Store<fromUser.AppState>,
    private _router :Router
  ) { }


  users : MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  
  displayedColumns: string[];
  disableIdColumn = false;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getUsers();
    this._store.pipe(select(fromUser.getDisableIDColumns)).subscribe(  
      disableIdColumn =>  {
        this.disableIdColumn = disableIdColumn
      });
    this.setUserDisplayColumn(); //console.log(this._userService.users());
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      (users: User[]) => this.setUserTableDataSource(users),
      (err: any) => console.log(err),
      () => console.log('Finished !')
    );
  }

  setUserTableDataSource(users : User[]){
    this.users = new MatTableDataSource<User>(users);
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;

  }

  onDisableId(event) {
    this._store.dispatch(new userActions.ToggleDisplayIDColumn(event.checked));
    console.log(this.selection);
    
    this.setUserDisplayColumn();
  }

  setUserDisplayColumn() {
    if(this.disableIdColumn) {
      this.displayedColumns = [ 'select', 'firstName', 'lastName', 'email', 'mobile','action'];
    } else {
      this.displayedColumns = [ 'select', 'id', 'firstName', 'lastName', 'email', 'mobile', 'action'];
    }
  }

  applyFilter(filterValue : string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  checkedMethod() {
    console.log(this.selection);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.data.length;
    return numSelected == numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.users.data.forEach(row => this.selection.select(row));
  }
  
  editUser(user : User) {
    this._store.dispatch(new userActions.SetCurrentUser(user));
    this._router.navigate(['/user', user.id])
  }

  deleteUser(user : User): void {
    console.log(user);
    if(user && user.id) {
      this._userService.deleteUser(user.id).subscribe(
        response => console.log(response)
      );
    } else {
      console.log("Invalid Product");
    }
    
  }

  addUser(){
    this._store.dispatch(new userActions.InitializeCurrentUser());
    this._router.navigate(['/user', 'new']);
  }


}
