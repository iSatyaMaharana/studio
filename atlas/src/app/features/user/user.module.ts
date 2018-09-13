import { NgModule } from '@angular/core';
import { UserRoutingModule, userProfileComponents } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';
import { UserEffects } from './state/user.effect';
import { EffectsModule } from '@ngrx/effects';




@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
    MaterialDesignModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([UserEffects])
    

  ],
  declarations: [
    userProfileComponents
    
  ]
})
export class UserModule { }
