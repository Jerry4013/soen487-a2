package soen487.a2.library2.model;

import javax.xml.bind.annotation.*;
import java.util.List;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class BookList {

    @XmlAttribute
    private String id;

    @XmlElementWrapper(name = "books")
    @XmlElement(name = "book")
    private BookModel[] books;

    public BookList() {
    }

    public BookList(String id, BookModel[] books) {
        this.id = id;
        this.books = books;
    }

    public BookModel[] getBooks() {
        return books;
    }

    public void setBooks(BookModel[] books) {
        this.books = books;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
