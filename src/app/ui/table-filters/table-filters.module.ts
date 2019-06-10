import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFiltersComponent } from './table-filters.component';
import { TableFilterDirective } from './table-filter.directive';

@NgModule({
  declarations: [TableFiltersComponent, TableFilterDirective],
  imports: [
    CommonModule
  ]
})
export class TableFiltersModule { }
