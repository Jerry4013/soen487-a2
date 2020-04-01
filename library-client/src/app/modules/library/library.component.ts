import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {BookModel} from '../../models/book.model';
import {BookService} from '../../services/book.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  book: BookModel;
  books: BookModel[] = [];
  options: Option[] = [
    {value: 'id-0', viewValue: 'id'},
    {value: 'title-1', viewValue: 'title'},
    {value: 'author-2', viewValue: 'author'},
    {value: 'isbn-3', viewValue: 'ISBN'}
  ];
  option: string;
  searched: boolean;

  constructor(private bookService: BookService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = (data as BookModel[]);
      }
    );
  }

  addBook() {
    this.router.navigate(['/addbook']);
  }

  editBook(book: BookModel) {
    this.bookService.editMode = true;
    this.bookService.book = book;
    this.router.navigate(['/addbook']);
  }

  confirmDelete(i: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: this.books[i].id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.deleteBook(this.books[i].id).subscribe(
          () => {
            this.bookService.getBooks().subscribe(
              books => {
                this.books = (books as BookModel[]);
              }
            );
          }
        );
      }
    });
  }

  onSearch(f: NgForm) {
    const value = f.value;
    if (this.option === 'id-0') {
      this.bookService.getBookById(value.search).subscribe(
        data => {
          this.searched = true;
          this.book = (data as BookModel);
        }
      );
    } else if (this.option === 'title-1') {
      this.bookService.getBookByTitle(value.search).subscribe(
        data => {
          this.searched = true;
          this.book = (data as BookModel);
        }
      );
    } else if (this.option === 'author-2') {
      this.bookService.getBookByAuthor(value.search).subscribe(
        data => {
          this.searched = true;
          this.book = (data as BookModel);
        }
      );
    } else if (this.option === 'isbn-3') {
      this.bookService.getBookByIsbn(value.search).subscribe(
        data => {
          this.searched = true;
          this.book = (data as BookModel);
        }
      );
    }
  }

  change($event: MatSelectChange) {
    this.option = $event.value;
  }
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
