import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatCheckbox } from '@angular/material';
import { User } from '../../shared/user';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from '../../../../../../node_modules/rxjs';

@Component({
  selector: 'atlas-manage-user-profiles',
  templateUrl: './manage-user-profiles.component.html',
  styleUrls: ['./manage-user-profiles.component.scss']
})
export class ManageUserProfilesComponent<T> implements OnInit {

  @Input() errorMessage : string;
  @Input() disableIDColumn : boolean;
  @Input('users') users$ : Observable<User[]>;
  @Output() checked = new EventEmitter<boolean>();
  @Output() selectedEdit = new EventEmitter<User>();
  @Output() selectedDelete = new EventEmitter<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  resultLength : number = 30;

  displayedColumns : string[];
  usersDataSource : MatTableDataSource<Observable<User[]>>;
  selection = new SelectionModel<Observable<User[]>>(true, []);

  constructor() { }

  ngOnInit() {
   
    this.setUserDisplayColumn();
    //this.setUserTableDataSource(this.users);


  }
  
  ngOnChanges(data :SimpleChange) {
    //this.usersDataSource.
  }

  setUserTableDataSource(users : Observable<User[]>){
    
    this.usersDataSource = new MatTableDataSource<Observable<User[]>>();
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;

  }
  setUserDisplayColumn() {
    if(this.disableIDColumn) {
      this.displayedColumns = [ 'select', 'firstName', 'lastName', 'email', 'mobile','action'];
    } else {
      this.displayedColumns = [ 'select', '_id', 'firstName', 'lastName', 'email', 'mobile', 'action'];
    }
  }

  onChecked(event : MatCheckbox) {
     this.disableIDColumn = event.checked as boolean;
     this.setUserDisplayColumn()
     this.checked.emit(this.disableIDColumn)
  }

  onSelectedEdit(user : User) {
    this.selectedEdit.emit(user);
  }

  onSelectedDelete(user : User) {
    this.selectedDelete.emit(user);
  }

   applyFilter(filterValue : string) {
    //this.users$.filter = filterValue.trim().toLowerCase();
  }

  
  isAllSelected() {
    console.log(this.selection);  
    // const numSelected = this.selection.selected.length;
    // const numRows = this.users.data.length;
    // return numSelected == numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected() ?
    //   this.selection.clear() :
    //   this.users.data.forEach(row => this.selection.select(row));
  }
}
