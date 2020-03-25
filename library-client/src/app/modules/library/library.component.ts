import { Component, OnInit } from '@angular/core';
import {BookModel} from '../../models/book.model';
import {BookService} from '../../book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  display = false;
  books: BookModel[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = (data as BookModel[]);
      }
    );
  }

  addBook() {

  }
}
