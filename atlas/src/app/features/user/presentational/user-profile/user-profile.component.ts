import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../shared/user';

export class MyErrorStateMatcher extends ErrorStateMatcher {
  isErrorState(control: FormControl | null, form : FormGroupDirective | NgForm | null) {
    console.log(form);
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


  constructor(private fb : FormBuilder) { }
  

  ngOnInit() {
    this.createUserProfileFormBuilder();
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
