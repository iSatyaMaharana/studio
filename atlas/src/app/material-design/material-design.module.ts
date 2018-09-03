import { NgModule } from '@angular/core';


import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatGridListModule, MatCardModule, MatMenuModule, MatInputModule, MatCheckboxModule, MatTableModule, MatPaginator, MatPaginatorModule, MatSortModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
  imports: [
   
    LayoutModule,
    CdkTableModule,
    CdkTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
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
    MatPaginatorModule,
    MatSortModule,
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
  declarations: []
})
export class MaterialDesignModule { }
