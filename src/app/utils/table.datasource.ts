import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';

export class TableDatasource<T> implements DataSource<T> {
  private state$ = new BehaviorSubject<T[]>([]);
  private initialState$ = new BehaviorSubject<T[]>([]);

  private sortState$ = new BehaviorSubject(null);
  private filterState$ = new BehaviorSubject(null);

  private destroy$ = new Subject<void>();

  private sort: MatSort;

  public setData(data: T[]) {
    this.state$.next([...data]);
    this.initialState$.next([...data]);
  }

  public setFilters(filter) {
    this.filterState$.next(filter);
  }

  public registerSort(sort: MatSort) {
    if (!sort) {
      throw new Error('Sort is undefined');
    }
    this.sort = sort;
    sort.sortChange
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(newSort => {
        this.sortState$.next(newSort);
      });
  }

  public connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    combineLatest([this.sortState$, this.filterState$])
      .pipe(
        switchMap(([sort, filters]) => {
          return this.initialState$.asObservable()
            .pipe(
              take(1),
              map((data) => {
                if (filters) {
                  data = this.filterData(data, filters);
                }
                if (sort && sort.direction !== '') {
                  data = this.sortData(data, sort);
                }
                return data;
              })
            );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.state$.next(data);
      });

    return this.state$.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.state$.complete();
    this.initialState$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  private filterData(data, filters) {
    return data.filter((item) => {
      return Object.keys(filters)
        .filter((key) => !!filters[key])
        .every((key) => (item[key] as string).toLocaleLowerCase().includes(filters[key]));
    });
  }

  private sortData(data, sort) {
    const isAsc = sort.direction === 'asc';
    return data.sort((a, b) => {
      a = a[sort.active];
      b = b[sort.active];
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    });
  }
}
