import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFiltersComponent } from './table-filters.component';
import { TableFilterDirective } from './table-filter.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableFiltersComponent, TableFilterDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [TableFiltersComponent, TableFilterDirective]
})
export class TableFiltersModule {
}
