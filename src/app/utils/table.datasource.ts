import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';

export class TableDatasource<T> implements DataSource<T> {
  private state = new BehaviorSubject<T>([]);

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this.state.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.state.complete();
  }
}
