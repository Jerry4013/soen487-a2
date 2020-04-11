package soen487.a2.library2.controller;

import org.greeneyed.summer.config.XsltConfiguration.XsltModelAndView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import soen487.a2.library2.CommonReturnType;
import soen487.a2.library2.model.BookList;
import soen487.a2.library2.model.BookModel;
import soen487.a2.library2.service.BookService;

import java.util.Arrays;


@RestController
@RequestMapping("/book")
@CrossOrigin(origins = {"*"}, allowCredentials = "true")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping(value = "/list")
    public ModelAndView getList() {
        BookList myBookList = new BookList("myBookList", bookService.list());
        return new XsltModelAndView("book-process", myBookList);
    }

    @GetMapping(value = "/text/list")
    public String getListText() {
        BookModel[] list = bookService.list();
        return Arrays.toString(list);
    }

    @GetMapping(value = "/{id}")
    public CommonReturnType getBookById(@PathVariable String id) {
        BookModel book = bookService.getBookById(Integer.parseInt(id));
        return CommonReturnType.create(book);
    }

    @GetMapping(value = "/text/{id}")
    public String getBookTextById(@PathVariable String id) {
        BookModel book = bookService.getBookById(Integer.parseInt(id));
        return book.toString();
    }

    @PutMapping()
    public CommonReturnType updateBook(@RequestBody BookModel bookModel) {
        BookModel newBook = bookService.updateBook(bookModel);
        return CommonReturnType.create(newBook);
    }

    @PostMapping()
    public CommonReturnType createBook(@RequestBody BookModel bookModel) {
        BookModel book = bookService.createBook(bookModel);
        return CommonReturnType.create(book);
    }

    @DeleteMapping(value = "/{id}")
    public CommonReturnType delete(@PathVariable String id) {
        BookModel bookModel = bookService.deleteBookById(Integer.parseInt(id));
        return CommonReturnType.create(bookModel);
    }
}
