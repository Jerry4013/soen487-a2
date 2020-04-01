package soen487.a2.library.service;

import soen487.a2.library.model.MemberModel;

import java.util.List;

public interface MemberService {

    List<MemberModel> list();

    MemberModel getMember(Integer id);

    MemberModel getMemberByName(String name);

    MemberModel addMember(MemberModel member);

    MemberModel updateMember(MemberModel member);

    MemberModel deleteMember(Integer id);

}
