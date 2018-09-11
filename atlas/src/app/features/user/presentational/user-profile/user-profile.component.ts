import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../shared/user';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import * as fromUser from '../../state/user.reducer';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../state/user.action';
import { EntityService } from '../../../../core/services/entity-service';
import { UserService } from '../../shared/user.service';

export class MyErrorStateMatcher extends ErrorStateMatcher {
  isErrorState(control: FormControl | null, form : FormGroupDirective | NgForm | null) {
    //console.log(form);
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'atlas-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  
  userProfileForm : FormGroup;

 

  matcher = new MyErrorStateMatcher();


  user : User;
  id : number;
  pageTitle: string;

  constructor(private fb : FormBuilder,
  private _route : ActivatedRoute,
  private _router : Router,
  private _store : Store<fromUser.AppState>,
  private _entityService : EntityService,
  private _userService : UserService) { }
  

  ngOnInit() {
    this.createUserProfileFormBuilder();
    this._route.params
      .pipe(
        map(params => params['id']),
        tap(id => (this.id = +id))
      )
      .subscribe(id => this.getUserProfile());

  }

  private getUserProfile() {
    if(this.id == 0) {
      return;
    }
    this._store.pipe(select(fromUser.getCurrentUserByID))
    .subscribe(
      currentUser => this.setUserFormValue(currentUser)
    );
 
    // if(this.isAddMode()) {
     
    // }
  }
  setUserFormValue(user : User | null) {
    this.user = user;
    if(this.user) {
      this.userProfileForm.reset();
      // Display the appropriate page title
      if (this.user._id === '') {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.user.firstName}`;
      }

      //this.userProfileForm.value = { ...user };

      this.userProfileForm.patchValue(this._entityService.clone<User>(this.user));

    }

    
  }

  private isAddMode(): boolean {
    return isNaN(this.id);
  }

  
  private createUserProfileFormBuilder() {
    this.userProfileForm = this.fb.group({
      firstName: ['',[
        Validators.required
      ]],
      lastName:['',[
        Validators.required
      ]],
      email: ['',[
        Validators.required,
        Validators.email,
      ]],
      mobile: ['',[
        Validators.required
        //Validators.pattern("\d{5}([- ]*)\d{6}")
      ]],
      password:['',[
        Validators.required,
      ]],
      confirmPassword: ['',[
        Validators.required,
      ]],
      

    });
  }
  
  onSubmit() {
    console.log(this.userProfileForm.value);
    if(this.userProfileForm.valid) {
      if(this.userProfileForm.dirty){
        //const user = this._entityService.clone<User>(this.userProfileForm.value);
        this._entityService.merge(this.user, this.userProfileForm.value);
        console.log(this.user);
        if(this.user._id == '') {
          this._store.dispatch(new userActions.CreateUser(this.user));
        } else {
          // this._userService.updateUser(this.user)
          // .subscribe(user => console.log(user));
          this._store.dispatch(new userActions.UpdateUser(this.user));
        }
      }
    }
    this._store.dispatch(new userActions.ClearCurrentUser());
    this._router.navigate(['/user']);
  }
  

  //{ value, valid }: { value: User, valid: boolean }
  // onSubmit() {
  //   //console.log(user);
  //   console.log(this.userProfileForm.value, this.)
  //   // let userControl = { 
  //   //   "firstName" : this.firstNameFormControl.value,
  //   //   "lastName" : this.lastNameFormControl.value,
  //   //   "email" : this.emailFormControl.value,
  //   //   "mobile": this.phoneFormControl.value
  //   // };
  //   //this.user = userControl; 
  //   console.log(this.user);
  // }

}
