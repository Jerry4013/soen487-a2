package soen487.a2.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soen487.a2.library.CommonReturnType;
import soen487.a2.library.model.MemberModel;
import soen487.a2.library.service.MemberService;

import java.util.List;

@RestController
@RequestMapping("/member")
@CrossOrigin(origins = {"*"}, allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping(value = "/list")
    public CommonReturnType getList() {
        List<MemberModel> list = memberService.list();
        return CommonReturnType.create(list);
    }

    @GetMapping(value = "/{id}")
    public CommonReturnType getMemberById(@PathVariable String id) {
        MemberModel member = memberService.getMember(Integer.parseInt(id));
        return CommonReturnType.create(member);
    }

    @GetMapping(value = "/name")
    public CommonReturnType getMemberByName(@RequestParam String name) {
        MemberModel member = memberService.getMemberByName(name);
        return CommonReturnType.create(member);
    }

    @PostMapping()
    public CommonReturnType addMember(@RequestBody MemberModel memberModel) {
        MemberModel member = memberService.addMember(memberModel);
        return CommonReturnType.create(member);
    }

    @PutMapping()
    public CommonReturnType updateMember(@RequestBody MemberModel memberModel) {
        MemberModel member = memberService.updateMember(memberModel);
        return CommonReturnType.create(member);
    }

    @DeleteMapping(value = "/{id}")
    public CommonReturnType deleteMember(@PathVariable String id) {
        MemberModel member = memberService.deleteMember(Integer.parseInt(id));
        return CommonReturnType.create(member);
    }
}
