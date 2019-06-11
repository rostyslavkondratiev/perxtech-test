import { Injectable } from '@angular/core';
import { BooksHttpService } from '../http-providers/books-http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class BooksService {
  constructor(private booksHttpService: BooksHttpService) {
  }

  public getBooks(): Observable<Book[]> {
    return this.booksHttpService.getBooks()
      .pipe(map((response) => response.data));
  }
}
