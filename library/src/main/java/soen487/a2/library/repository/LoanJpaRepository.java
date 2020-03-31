package soen487.a2.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import soen487.a2.library.dataobject.Loan;

import java.util.List;

@Repository
public interface LoanJpaRepository extends JpaRepository<Loan, Integer> {
    List<Loan> getLoansByTitle(String title);
    List<Loan> getLoansByMember(String member);
}
