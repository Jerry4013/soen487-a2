export class BookModel {
  constructor(public id: number, public title: string, public description: string, public isbn: string,
              public author: string, public publisher: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isbn = isbn;
    this.author = author;
    this.publisher = publisher;
  }
}
