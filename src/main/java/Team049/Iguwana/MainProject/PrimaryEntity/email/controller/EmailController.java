package Team049.Iguwana.MainProject.PrimaryEntity.email.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.email.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/emails")
@Validated
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/check")
    @ResponseStatus(HttpStatus.CREATED)
    public String checkMember(String code) {

        String user =emailService.emailCheckMember(code);
        return user+" 인증 완료";
    }
}
