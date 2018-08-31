import { NgModule } from '@angular/core';


import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatGridListModule, MatCardModule, MatMenuModule, MatInputModule, MatCheckboxModule, MatTableModule, MatPaginator, MatPaginatorModule } from '@angular/material';
import { CdkTableModule } from '../../../node_modules/@angular/cdk/table';
import { CdkTreeModule } from '../../../node_modules/@angular/cdk/tree';

@NgModule({
  imports: [
   
    LayoutModule,
    CdkTableModule,
    CdkTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  exports: [
    
    LayoutModule,
    CdkTableModule,
    CdkTreeModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
    
  ],
  declarations: []
})
export class MaterialDesignModule { }
