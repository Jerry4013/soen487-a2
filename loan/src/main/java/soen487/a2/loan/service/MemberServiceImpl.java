package soen487.a2.loan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soen487.a2.loan.dataobject.MemberDao;
import soen487.a2.loan.repository.MemberJpaRepository;

import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberJpaRepository memberJpaRepository;

    @Override
    public List<MemberDao> listMembers() {
        return memberJpaRepository.findAll();
    }

    @Override
    public MemberDao getMemberInfo(int id) {
        return memberJpaRepository.findById(id).orElse(null);
    }

    @Override
    public synchronized MemberDao addMember(MemberDao memberDao) {
        return memberJpaRepository.save(memberDao);
    }

    @Override
    public MemberDao updateMember(MemberDao memberDao) {
        return memberJpaRepository.save(memberDao);
    }

    @Override
    public MemberDao deleteMember(int id) {
        MemberDao memberDao = memberJpaRepository.findById(id).orElse(null);
        memberJpaRepository.deleteById(id);
        return memberDao;
    }
}
