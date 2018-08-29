import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './container/user-shell/user.component';
import { UserProfilePageComponent } from './container/user-profile-page/user-profile-page.component';
import { ManageUserPageComponent } from './container/manage-user-page/manage-user-page.component';
import { ManageUserProfilesComponent } from './presentational/manage-user-profiles/manage-user-profiles.component';
import { UserProfileComponent } from './presentational/user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: ManageUserPageComponent
      },
      {
        path: ':id',
        component: UserProfilePageComponent,
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
  ManageUserPageComponent,
  UserProfilePageComponent,
  ManageUserProfilesComponent,
  UserProfileComponent

];
