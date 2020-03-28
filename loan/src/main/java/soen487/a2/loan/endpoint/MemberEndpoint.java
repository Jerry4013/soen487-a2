package soen487.a2.loan.endpoint;

import io.spring.guides.gs_producing_web_service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import soen487.a2.loan.dataobject.MemberDao;
import soen487.a2.loan.exception.MemberNotFoundException;
import soen487.a2.loan.service.MemberService;

import java.util.List;

@Endpoint
public class MemberEndpoint {
    private static final String NAMESPACE_URI = "http://spring.io/guides/gs-producing-web-service";

    @Autowired
    private MemberService memberService;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getAllMembersRequest")
    @ResponsePayload
    public GetAllMembersResponse getAllMembers() {
        GetAllMembersResponse response = new GetAllMembersResponse();
        List<MemberDao> memberDaos = memberService.listMembers();
        List<Member> memberList = response.getMember();
        for (MemberDao memberDao : memberDaos) {
            Member member = new Member();
            BeanUtils.copyProperties(memberDao, member);
            memberList.add(member);
        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getMemberInfoRequest")
    @ResponsePayload
    public GetMemberInfoResponse getMemberInfo(@RequestPayload GetMemberInfoRequest request) throws MemberNotFoundException {
        GetMemberInfoResponse response = new GetMemberInfoResponse();
        Member member = new Member();
        MemberDao memberInfo = memberService.getMemberInfo(request.getId());
        if (memberInfo == null) {
            throw new MemberNotFoundException("Invalid Member Id");
        }
        BeanUtils.copyProperties(memberInfo, member);
        response.setMember(member);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "addMemberRequest")
    @ResponsePayload
    public AddMemberResponse addMember(@RequestPayload AddMemberRequest request) {
        AddMemberResponse response = new AddMemberResponse();
        MemberDao memberDao = new MemberDao();
        memberDao.setName(request.getName());
        memberDao.setContact(request.getContact());
        MemberDao newMemberDao = memberService.addMember(memberDao);
        Member member = new Member();
        BeanUtils.copyProperties(newMemberDao, member);
        response.setMember(member);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "updateMemberRequest")
    @ResponsePayload
    public UpdateMemberResponse updateMember(@RequestPayload UpdateMemberRequest request) {
        UpdateMemberResponse response = new UpdateMemberResponse();
        MemberDao memberDao = new MemberDao();
        memberDao.setId(request.getId());
        memberDao.setName(request.getName());
        memberDao.setContact(request.getContact());
        MemberDao newMemberDao = memberService.updateMember(memberDao);
        Member member = new Member();
        BeanUtils.copyProperties(newMemberDao, member);
        response.setMember(member);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "deleteMemberRequest")
    @ResponsePayload
    public DeleteMemberResponse deleteMember(@RequestPayload DeleteMemberRequest request) {
        DeleteMemberResponse response = new DeleteMemberResponse();
        MemberDao deletedMemberDao = memberService.deleteMember(request.getId());
        Member member = new Member();
        BeanUtils.copyProperties(deletedMemberDao, member);
        response.setMember(member);
        return response;
    }
}
