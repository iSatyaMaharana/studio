import { NgModule } from '@angular/core';
import { UserRoutingModule, userProfileComponents } from './user-routing.module';

@NgModule({
  imports: [
    UserRoutingModule
  ],
  declarations: [
    userProfileComponents
  ]
})
export class UserModule { }
