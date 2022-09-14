package Team049.Iguwana.MainProject.filter;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.repository.StudentRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.TeacherRepository;
import Team049.Iguwana.MainProject.oauth.PrincipalDetails;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private StudentRepository studentRepository;
    private AuthenticationManager authenticationManager;

    private TeacherRepository teacherRepository;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, StudentRepository studentRepository,
                                   TeacherRepository teacherRepository){
        this.authenticationManager = authenticationManager;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            ObjectMapper om = new ObjectMapper();
            if(request.getHeader("role").equals("student")){
                System.out.println("학생 로그인");
                Student student = om.readValue(request.getInputStream(), Student.class);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(student.getEmail(), student.getPassword());
                Authentication authentication = authenticationManager.authenticate(authenticationToken);
                return authentication;
            }else{
                System.out.println("선생님 로그인");
                Teacher teacher = om.readValue(request.getInputStream(), Teacher.class);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(teacher.getEmail(), teacher.getPassword());
                Authentication authentication = authenticationManager.authenticate(authenticationToken);
                return authentication;
            }
//            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        System.out.println("successfulAuthentication");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        if(request.getHeader("role").equals("student")){
            String jwtToken = JWT.create()
                    .withSubject("cos jwt token")
                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 30)))
                    .withClaim("email", principalDetails.getStudent().getEmail())
                    .withClaim("name", principalDetails.getStudent().getName())
                    .withClaim("role", principalDetails.getRole())
                    .sign(Algorithm.HMAC512("cos_jwt_token"));
            response.addHeader("Authorization", "Bearer " + jwtToken);
            response.addHeader("StudentId", String.valueOf(principalDetails.getStudent().getStudentId()));
        }else{
            String jwtToken = JWT.create()
                    .withSubject("cos jwt token")
                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 30)))
                    .withClaim("email", principalDetails.getTeacher().getEmail())
                    .withClaim("name", principalDetails.getTeacher().getName())
                    .withClaim("role", principalDetails.getRole())
                    .sign(Algorithm.HMAC512("cos_jwt_token"));
            response.addHeader("Authorization", "Bearer " + jwtToken);
            response.addHeader("TeacherID", String.valueOf(principalDetails.getTeacher().getTeacherId()));
        }
    }
}
