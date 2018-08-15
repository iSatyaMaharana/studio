import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageUserProfilesComponent } from './pages/manage-user-profiles/manage-user-profiles.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: ManageUserProfilesComponent
      },
      {
        path: ':id',
        component: UserProfileComponent,
        // canDeactivate: [CanDeactivateGuard],
        // resolve: {
        //   vehicle: VehicleResolver
        // }
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
  
})
export class UserRoutingModule { }

export const userProfileComponents = [
  UserComponent,
  ManageUserProfilesComponent,
  UserProfileComponent

];
