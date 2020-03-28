package soen487.a2.loan.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import soen487.a2.loan.dataobject.LoanDao;

import java.util.List;

public interface LoanJpaRepository extends JpaRepository<LoanDao, Integer> {
    List<LoanDao> getLoanDaosByTitle(String title);
    List<LoanDao> getLoanDaosByMember(String member);
}
