package soen487.a2.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import soen487.a2.library.dataobject.Book;

@Repository
public interface BookJpaRepository extends JpaRepository<Book, Integer> {
    Book getBookByTitle(String title);
    Book getBookByAuthor(String author);
    Book getBookByIsbn(String isbn);
}
