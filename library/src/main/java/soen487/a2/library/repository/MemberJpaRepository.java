package soen487.a2.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import soen487.a2.library.dataobject.Member;

@Repository
public interface MemberJpaRepository extends JpaRepository<Member, Integer> {
    Member getMemberByName(String name);
}
