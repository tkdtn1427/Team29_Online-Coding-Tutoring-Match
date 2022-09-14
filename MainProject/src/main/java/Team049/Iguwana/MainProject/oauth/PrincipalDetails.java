package Team049.Iguwana.MainProject.oauth;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Data
public class PrincipalDetails implements UserDetails {

    private Student student;

    private Teacher teacher;

    private String role;

    public PrincipalDetails(Student student){
        this.student = student;
        this.role = "student";
    }

    public PrincipalDetails(Teacher teacher){
        this.teacher = teacher;
        this.role = "teacher";
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role.equals("student")){
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            student.getRoleList().forEach(n -> {
                authorities.add(() -> n);
            });
            return authorities;
        }else{
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            teacher.getRoleList().forEach(n -> {
                authorities.add(() -> n);
            });
            return authorities;
        }
    }

    @Override
    public String getPassword() {
        if(this.role.equals("student")){
            return student.getPassword();
        }else{
            return teacher.getPassword();
        }
    }

    @Override
    public String getUsername() {
        if(this.role.equals("student")){
            return student.getEmail();
        }else{
            return teacher.getEmail();
        }
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
