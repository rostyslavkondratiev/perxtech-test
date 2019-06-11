import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from '../core/services/books.service';
import { TableDatasource } from '../utils/table.datasource';
import { MatSort } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, {static: false}) public sort: MatSort;
  public dataSource: TableDatasource<BookTableItem>;
  public columns = ['name', 'image', 'type', 'created_at', 'updated_at'];

  constructor(private booksService: BooksService) {
    this.dataSource = new TableDatasource<BookTableItem>();
  }

  ngOnInit() {
    this.booksService.getBooks()
      .pipe(map(this.prepareTableData))
      .subscribe((books: BookTableItem[]) => {
        this.dataSource.setData(books);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  private prepareTableData(books: Book[]): BookTableItem[] {
    return books.map((book) => ({
      name: book.attributes.content,
      type: book.attributes.display_properties.type,
      image: book.attributes.display_properties.image,
      created_at: book.attributes.created_at,
      updated_at: book.attributes.updated_at,
    }));
  }

}
