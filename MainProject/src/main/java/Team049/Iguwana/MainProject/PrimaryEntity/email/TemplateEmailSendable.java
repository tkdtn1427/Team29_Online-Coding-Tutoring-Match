package Team049.Iguwana.MainProject.PrimaryEntity.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.internet.MimeMessage;

@Slf4j
public class TemplateEmailSendable implements EmailSendable {
    private final JavaMailSender javaMailSender;

    public TemplateEmailSendable(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void send(String[] to, String subject, String message) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = null;
        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(message, true);

            javaMailSender.send(mimeMessage);
            log.info("Sent Template email!");
        } catch (Exception e) {
            log.error("email send error: ", e);
        }

    }
}
