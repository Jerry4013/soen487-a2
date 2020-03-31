import {Component, Inject, OnInit} from '@angular/core';
import {BookModel} from '../../models/book.model';
import {BookService} from '../../book.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  display = false;
  books: BookModel[] = [];

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

  editbook(i: number) {
    console.log(this.books[i]);
  }

  confirmdelete(i: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: this.books[i].id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
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
