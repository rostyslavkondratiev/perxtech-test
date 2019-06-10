import { Injectable } from '@angular/core';
import { BooksHttpService } from '../http-providers/books-http.service';

@Injectable(
  {providedIn: 'root'}
)
export class BooksService {
  constructor(private booksHttpService: BooksHttpService) {
  }
}
