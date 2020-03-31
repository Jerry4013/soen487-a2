import { Component, OnInit } from '@angular/core';
import {BookModel} from '../../models/book.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {

  book: BookModel;
  addBookForm: FormGroup;


  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.addBookForm = new FormGroup({
      'title': new FormControl(this.book.title, Validators.required),
      'description': new FormControl(this.book.description, Validators.required),
      'isbn': new FormControl(this.book.isbn, Validators.required),
      'author': new FormControl(this.book.author, Validators.required),
      'publisher': new FormControl(this.book.publisher, Validators.required),
    });
  }

  onSubmit() {
    const newBook = new BookModel(0, this.addBookForm.value['title'],
      this.addBookForm.value['description'],
      this.addBookForm.value['isbn'], this.addBookForm.value['author'], this.addBookForm.value['publisher']);
    this.bookService.addBook(newBook).subscribe(
      (books: BookModel[]) => {
        this.router.navigate(['']);
      }
    );
  }

  onCancel() {
    this.router.navigate(['']);
  }

}
