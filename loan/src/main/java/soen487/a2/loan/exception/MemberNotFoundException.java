package soen487.a2.loan.exception;

import org.springframework.ws.soap.server.endpoint.annotation.FaultCode;
import org.springframework.ws.soap.server.endpoint.annotation.SoapFault;

@SoapFault(faultCode = FaultCode.CUSTOM,
        customFaultCode = "{" + MemberNotFoundException.NAMESPACE_URI + "}MEMBER_NOT_FOUND",
        faultStringOrReason = "@faultString")
public class MemberNotFoundException extends Exception{

    private static final long serialVersionUID = 1L;
    public static final String NAMESPACE_URI = "http://spring.io/guides/gs-producing-web-service";

    public MemberNotFoundException(String message) {
        super(message);
    }
}
