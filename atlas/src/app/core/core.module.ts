import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { NavToolbarComponent } from './navigation/nav-toolbar/nav-toolbar.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { NavbarComponent } from './navigation/sidebar/navbar/navbar.component';
import { NavbarVerticalStyleOneComponent } from './navigation/sidebar/navbar/navbar-vertical-style-one/navbar-vertical-style-one.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule,
    
  ],
  exports:[
    NavToolbarComponent,
    SidebarComponent
  ],
  declarations: [NavToolbarComponent, SidebarComponent, NavbarComponent, NavbarVerticalStyleOneComponent]
})
export class CoreModule { }
