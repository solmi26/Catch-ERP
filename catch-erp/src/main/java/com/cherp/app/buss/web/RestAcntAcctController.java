package com.cherp.app.buss.web;

import com.cherp.app.buss.service.AcntAcctService;
import com.cherp.app.buss.vo.AcntAcctVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestAcntAcctController {

    private final AcntAcctService acntAcctService;

    @Autowired
    public RestAcntAcctController(AcntAcctService acntAcctService) {
        this.acntAcctService = acntAcctService;
    }

    @GetMapping("acctList")
    public List<AcntAcctVO> acntAcctList() {
        return acntAcctService.acntAcctList();
    }

}
