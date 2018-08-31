import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


@Component({
  selector: 'atlas-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrls: ['./manage-user-page.component.scss']
})
export class ManageUserPageComponent implements OnInit {
  
  users : MatTableDataSource<User>;
  constructor(private _userService : UserService) { }
  displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getUsers();
    this.displayedColumns = ['id', 'firstName', 'lastName', 'email', 'mobile'];
    //console.log(this._userService.users());
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
  

}
