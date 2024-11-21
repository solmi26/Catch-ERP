package com.cherp.app.buss.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ClientVO {
    private String clientCode;
    private String clientName;
    private String ceoName;
    private String tradeItem;
    private String tradeType;
    private String companyTel;
    private String fax;
    private String address;
    private String employeeName;
    private String employeeTel;
    private String employeeEmail;
    private String clientBacct;
    private Date clientDate;
    private int balancek;
    private int balancem;
    private String state;
    private String event;
    private String summary;
}
