package soen487.a2.library.service;

import soen487.a2.library.model.BookModel;

public interface BookService {

    BookModel[] list();

    BookModel getBookById(Integer id);

    BookModel createBook(BookModel bookModel);

    BookModel updateBook(BookModel bookModel);

    BookModel deleteBookById(Integer id);

}
