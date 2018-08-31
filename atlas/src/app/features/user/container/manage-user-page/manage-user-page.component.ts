import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Store } from '@ngrx/store';
import * as FromAction from '../../state/user.action';
import { select } from '@ngrx/store';


@Component({
  selector: 'atlas-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrls: ['./manage-user-page.component.scss']
})
export class ManageUserPageComponent implements OnInit {
  
  users : MatTableDataSource<User>;
  constructor(
    private _userService : UserService,
    private _store: Store<any>
  ) { }
  displayedColumns: string[];
  disableIdColumn = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getUsers();
    this._store.pipe(select('users')).subscribe(
      
      products =>  {
        this.disableIdColumn = products.disabledIDColumn
        console.log(products);
      }
    );
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
    this._store.dispatch(new FromAction.ToggleDisplayIDColumn(event.checked));
    this.setUserDisplayColumn();
  }

  setUserDisplayColumn() {
    if(this.disableIdColumn) {
      this.displayedColumns = [ 'firstName', 'lastName', 'email', 'mobile'];
    } else {
      this.displayedColumns = ['id', 'firstName', 'lastName', 'email', 'mobile'];
    }
  }

  applyFilter(filterValue : string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }
  

}
