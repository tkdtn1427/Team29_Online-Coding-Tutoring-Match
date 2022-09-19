/*
package Team049.Iguwana.MainProject.event;

import Team049.Iguwana.MainProject.PrimaryEntity.email.EmailSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@EnableAsync
@Configuration
@Component
@Slf4j
public class MemberRegistrationEventListener {
    @Value("${mail.subject.member.registration}")
    private String subject;
    private final EmailSender emailSender;


    public MemberRegistrationEventListener(EmailSender emailSender) {
        this.emailSender = emailSender;
    }

    @Async
    @EventListener
    public void listen(MemberRegistrationApplicationEvent event) throws Exception {
        try {
            String[] to = new String[]{event.getEmail()};


            String message = " 아래 코드를 인증 페이지에 입력해주세요 \n" +
                    "\n" +
                    event.getCode();

            emailSender.sendEmail(to, subject, message);
        } catch (MailSendException e) {
            e.printStackTrace();
            log.error("MailSendException: rollback for Member Registration:");
        }
    }
}
*/
