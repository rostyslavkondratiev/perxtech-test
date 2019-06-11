import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { debounceTime, distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { TableFilterDirective } from './table-filter.directive';
import { TableDatasource } from '../../utils/table.datasource';

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TableFiltersComponent implements AfterViewInit, OnDestroy {
  @Input() dataSource: TableDatasource<any>;
  @ContentChildren(TableFilterDirective) filters: QueryList<TableFilterDirective>;
  @ViewChild('filtersContainer', {read: ViewContainerRef, static: false}) filtersContainer: ViewContainerRef;
  public fg = new FormGroup({});
  private cache: { [name: string]: EmbeddedViewRef<any> } = {};
  private destroy$ = new Subject();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    this.filtersContainer.clear();
    this.updateFilters();
    this.filters.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateFilters();
    });
    this.fg.valueChanges
      .pipe(
        startWith(this.fg.value),
        distinctUntilChanged(),
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        console.log(value);
        this.dataSource.setFilters({...value});
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    Object.values(this.cache).forEach(item => {
      item.destroy();
    });
  }

  private updateFilters() {
    Object.values(this.cache).forEach(item => {
      item.detach();
    });
    this.filters.forEach(item => {
      if (!this.cache[item.name] || this.cache[item.name].destroyed) {
        if (item.value && item.value.value) {
          item.value = item.value.value;
        }
        const control = this.addControl(item.name, item.value);
        this.cache[item.name] = item.template.createEmbeddedView({
          $implicit: control
        });
      }
      this.filtersContainer.insert(this.cache[item.name]);
      this.changeDetectorRef.detectChanges();
    });
  }

  private addControl(name: string, defaultValue = null) {
    if (!this.fg.contains(name)) {
      this.fg.addControl(name, new FormControl(defaultValue));
    }
    return this.fg.get(name);
  }

}
