package Team049.Iguwana.MainProject.event;


import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class MemberRegistrationApplicationEvent extends ApplicationEvent {
    private Object member;
    private String code;

    private String email;

    public MemberRegistrationApplicationEvent(Object source, Object member, String code,String email) {
        super(source);
        this.member = member;
        this.code = code;
        this.email=email;
    }
}
