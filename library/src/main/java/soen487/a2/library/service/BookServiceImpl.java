package soen487.a2.library.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soen487.a2.library.dataobject.Book;
import soen487.a2.library.error.BusinessException;
import soen487.a2.library.error.EmBusinessError;
import soen487.a2.library.model.BookModel;
import soen487.a2.library.repository.BookJpaRepository;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookJpaRepository bookJpaRepository;

    @Autowired
    public BookServiceImpl(BookJpaRepository bookJpaRepository) {
        this.bookJpaRepository = bookJpaRepository;
    }

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
        Book book = bookJpaRepository.findById(id).orElse(null);
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
        Book book = bookJpaRepository.findById(id).orElse(null);
        if (book == null) {
            throw new BusinessException(EmBusinessError.BOOK_NOT_EXIST);
        }
        BookModel deletedBook = new BookModel();
        BeanUtils.copyProperties(book, deletedBook);
        bookJpaRepository.deleteById(id);
        return deletedBook;
    }
}
