import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { materialDesignModules } from '../material-design/material-design-modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    materialDesignModules
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    materialDesignModules
  ],
  declarations: []
})
export class SharedModule { }
