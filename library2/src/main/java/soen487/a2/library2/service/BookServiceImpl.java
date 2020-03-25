package soen487.a2.library2.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soen487.a2.library2.dataobject.Book;
import soen487.a2.library2.error.BusinessException;
import soen487.a2.library2.error.EmBusinessError;
import soen487.a2.library2.model.BookModel;
import soen487.a2.library2.repository.BookJpaRepository;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookJpaRepository bookJpaRepository;

    @Override
    public BookModel[] list() {
        List<Book> bookList = bookJpaRepository.findAll();
        BookModel[] bookModels = new BookModel[bookList.size()];
        int i = 0;
        for (Book book : bookList) {
            BookModel bookModel = new BookModel();
            BeanUtils.copyProperties(book, bookModel);
            bookModels[i] = bookModel;
            i++;
        }
        return bookModels;
    }

    @Override
    public BookModel getBookById(Integer id) {
        if (id == null) {
            throw new BusinessException(EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        Book book = bookJpaRepository.findOne(id);
        if (book == null) {
            throw new BusinessException(EmBusinessError.BOOK_NOT_EXIST);
        }
        BookModel bookModel = new BookModel();
        BeanUtils.copyProperties(book, bookModel);
        return bookModel;
    }

    @Override
    @Transactional
    public BookModel createBook(BookModel bookModel) {
        if (bookModel == null) {
            throw new BusinessException(EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        Book book = new Book();
        BeanUtils.copyProperties(bookModel, book);
        Book savedBook = bookJpaRepository.save(book);
        bookModel.setId(savedBook.getId());
        return bookModel;
    }

    @Override
    @Transactional
    public BookModel updateBook(BookModel bookModel) {

        return createBook(bookModel);
    }

    @Override
    @Transactional
    public BookModel deleteBookById(Integer id) {
        if (id == null) {
            throw new BusinessException(EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        Book book = bookJpaRepository.findOne(id);
        if (book == null) {
            throw new BusinessException(EmBusinessError.BOOK_NOT_EXIST);
        }
        BookModel deletedBook = new BookModel();
        BeanUtils.copyProperties(book, deletedBook);
        bookJpaRepository.delete(id);
        return deletedBook;
    }
}
