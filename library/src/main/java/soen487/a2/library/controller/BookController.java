package soen487.a2.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soen487.a2.library.CommonReturnType;
import soen487.a2.library.model.BookModel;
import soen487.a2.library.service.BookService;


@RestController
@RequestMapping("/book")
@CrossOrigin(origins = {"*"}, allowCredentials = "true")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping(value = "/list")
    public CommonReturnType getList() {
        BookModel[] list = bookService.list();
        return CommonReturnType.create(list);
    }

    @GetMapping(value = "/{id}")
    public CommonReturnType getBookById(@PathVariable String id) {
        BookModel book = bookService.getBookById(Integer.parseInt(id));
        return CommonReturnType.create(book);
    }

    @GetMapping(value = "/title")
    public CommonReturnType getBookByTitle(@RequestParam String title) {
        BookModel book = bookService.getBookByTitle(title);
        return CommonReturnType.create(book);
    }

    @GetMapping(value = "/author")
    public CommonReturnType getBookByAuthor(@RequestParam String author) {
        BookModel book = bookService.getBookByAuthor(author);
        return CommonReturnType.create(book);
    }

    @GetMapping(value = "/isbn")
    public CommonReturnType getBookByIsbn(@RequestParam String isbn) {
        BookModel book = bookService.getBookByIsbn(isbn);
        return CommonReturnType.create(book);
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
