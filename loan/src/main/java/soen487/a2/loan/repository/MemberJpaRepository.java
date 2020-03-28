package soen487.a2.loan.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import soen487.a2.loan.dataobject.MemberDao;

public interface MemberJpaRepository extends JpaRepository<MemberDao, Integer> {

}
