package soen487.a2.library2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import soen487.a2.library2.dataobject.Book;

@Repository
public interface BookJpaRepository extends JpaRepository<Book, Integer> {
}
