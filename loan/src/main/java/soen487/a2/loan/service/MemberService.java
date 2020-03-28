package soen487.a2.loan.service;

import soen487.a2.loan.dataobject.MemberDao;

import java.util.List;

public interface MemberService {
    List<MemberDao> listMembers();
    MemberDao getMemberInfo(int id);
    MemberDao addMember(MemberDao memberDao);
    MemberDao updateMember(MemberDao memberDao);
    MemberDao deleteMember(int id);
}
