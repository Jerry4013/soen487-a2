import { Component, OnInit } from '@angular/core';
import {BookModel} from '../../models/book.model';
import {NgForm} from '@angular/forms';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {

  book: BookModel = this.bookService.book;
  editMode = this.bookService.editMode;
  pageTitle: string;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if (this.editMode) {
      this.pageTitle = 'Edit this book: ';
    } else {
      this.pageTitle = 'Add a New Book: ';
    }
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    let id = 0;
    if (this.editMode) {
      id = this.book.id;
    }
    const bookModel = new BookModel(id, value.title, value.description, value.isbn, value.author, value.publisher);
    if (!this.editMode) {
      this.bookService.addBook(bookModel).subscribe(
        () => {
          this.router.navigate(['/library']);
        }
      );
    } else {
      this.bookService.editBook(bookModel).subscribe(
        () => {
          this.router.navigate(['/library']);
        }
      );
      this.bookService.editMode = false;
      this.editMode = false;
    }
  }

  onCancel() {
    this.router.navigate(['/library']);
    if (this.editMode) {
      this.bookService.editMode = false;
      this.editMode = false;
    }
  }

}
