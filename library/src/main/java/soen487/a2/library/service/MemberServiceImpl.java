package soen487.a2.library.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soen487.a2.library.dataobject.Member;
import soen487.a2.library.error.BusinessException;
import soen487.a2.library.error.EmBusinessError;
import soen487.a2.library.model.MemberModel;
import soen487.a2.library.repository.MemberJpaRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberJpaRepository memberJpaRepository;

    @Autowired
    public MemberServiceImpl(MemberJpaRepository memberJpaRepository) {
        this.memberJpaRepository = memberJpaRepository;
    }

    @Override
    public List<MemberModel> list() {
        List<Member> memberList = memberJpaRepository.findAll();
        List<MemberModel> memberModels = new ArrayList<>();
        for (Member member : memberList) {
            MemberModel memberModel = new MemberModel();
            BeanUtils.copyProperties(member, memberModel);
            memberModels.add(memberModel);
        }
        return memberModels;
    }

    @Override
    public MemberModel getMember(Integer id) {
        if (id == null) {
            throw new BusinessException(EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        Member member = memberJpaRepository.findById(id).orElse(null);
        if (member == null) {
            throw new BusinessException(EmBusinessError.BOOK_NOT_EXIST);
        }
        MemberModel memberModel = new MemberModel();
        BeanUtils.copyProperties(member, memberModel);
        return memberModel;
    }

    @Override
    public MemberModel getMemberByName(String name) {
        Member member = memberJpaRepository.getMemberByName(name);
        if (member == null) {
            throw new BusinessException(EmBusinessError.MEMBER_NOT_EXIST);
        }
        MemberModel memberModel = new MemberModel();
        BeanUtils.copyProperties(member, memberModel);
        return memberModel;
    }

    @Override
    @Transactional
    public MemberModel addMember(MemberModel memberModel) {
        if (memberModel == null) {
            throw new BusinessException(EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        Member member = new Member();
        BeanUtils.copyProperties(memberModel, member);
        Member savedMember = memberJpaRepository.save(member);
        memberModel.setId(savedMember.getId());
        return memberModel;
    }

    @Override
    @Transactional
    public MemberModel updateMember(MemberModel member) {
        return addMember(member);
    }

    @Override
    @Transactional
    public MemberModel deleteMember(Integer id) {
        Member member = memberJpaRepository.findById(id).orElse(null);
        if (member == null) {
            throw new BusinessException(EmBusinessError.MEMBER_NOT_EXIST);
        }
        MemberModel memberModel = new MemberModel();
        BeanUtils.copyProperties(member, memberModel);
        memberJpaRepository.deleteById(id);
        return memberModel;
    }
}
