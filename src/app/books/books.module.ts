import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { HeaderModule } from '../ui/header/header.module';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule } from '@angular/material';
import { TableFiltersModule } from '../ui/table-filters/table-filters.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    HeaderModule,
    MatTableModule,
    MatSortModule,
    TableFiltersModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class BooksModule {
}
