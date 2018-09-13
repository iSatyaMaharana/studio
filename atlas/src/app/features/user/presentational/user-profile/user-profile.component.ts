import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../shared/user';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import * as fromUser from '../../state/user.reducer';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../state/user.action';
import { EntityService } from '../../../../core/services/entity-service';


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

  @Input() selected : User;
  @Output() create = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>(); 
 

  matcher = new MyErrorStateMatcher();


  user : User;
  id : number;
  pageTitle: string;

  constructor(private fb : FormBuilder,
  
  private _entityService : EntityService) { }
  

  ngOnInit() {
    this.createUserProfileFormBuilder();
    this.setUserFormValue(this.selected);
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
    if(this.userProfileForm.valid) {
      if(this.userProfileForm.dirty){
        //const user = this._entityService.clone<User>(this.userProfileForm.value);
        this._entityService.merge(this.user, this.userProfileForm.value);
        console.log(this.user);
        if(this.user._id == '') {
          this.create.emit(this.user);
        } else {
          this.update.emit(this.user);
        }
      }
    }
  }
}
