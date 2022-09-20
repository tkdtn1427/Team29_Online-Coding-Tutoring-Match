package Team049.Iguwana.MainProject.filter;

import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.entity.JwtToken;
import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.repository.JwtTokenRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.repository.StudentRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.TeacherRepository;
import Team049.Iguwana.MainProject.oauth.PrincipalDetails;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

//@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private StudentRepository studentRepository;
    private AuthenticationManager authenticationManager;

    private TeacherRepository teacherRepository;

    private JwtTokenRepository jwtTokenRepository;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, StudentRepository studentRepository,
                                   TeacherRepository teacherRepository, JwtTokenRepository jwtTokenRepository){
        this.authenticationManager = authenticationManager;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.jwtTokenRepository = jwtTokenRepository;
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
            String accessToken = JWT.create()
                    .withSubject("cos jwt token")
                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60 * 3)))
                    .withClaim("email", principalDetails.getStudent().getEmail())
                    .withClaim("name", principalDetails.getStudent().getName())
                    .withClaim("role", principalDetails.getRole())
                    .sign(Algorithm.HMAC512("cos_jwt_token"));

            String refreshToken = JWT.create()
                    .withSubject("cos jwt token")
                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60 * 72)))
                    .withClaim("email", principalDetails.getStudent().getEmail())
                    .withClaim("name", principalDetails.getStudent().getName())
                    .withClaim("role", principalDetails.getRole())
                    .sign(Algorithm.HMAC512("cos_jwt_token"));


            response.addHeader("AccessToken", "Bearer " + accessToken);
            response.addHeader("RefreshToken", "Bearer " + refreshToken);
            response.addHeader("UserId", String.valueOf(principalDetails.getStudent().getStudentId()));

            saveJwtToken(principalDetails, accessToken, refreshToken,"student");

        }else{
            String accessToken = JWT.create()
                    .withSubject("cos jwt token")
                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60 * 3)))
                    .withClaim("email", principalDetails.getTeacher().getEmail())
                    .withClaim("name", principalDetails.getTeacher().getName())
                    .withClaim("role", principalDetails.getRole())
                    .sign(Algorithm.HMAC512("cos_jwt_token"));

            String refreshToken = JWT.create()
                    .withSubject("cos jwt token")
                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60 * 72)))
                    .withClaim("email", principalDetails.getTeacher().getEmail())
                    .withClaim("name", principalDetails.getTeacher().getName())
                    .withClaim("role", principalDetails.getRole())
                    .sign(Algorithm.HMAC512("cos_jwt_token"));

            response.addHeader("AccessToken", "Bearer " + accessToken);
            response.addHeader("RefreshToken", "Bearer " + refreshToken);
            response.addHeader("UserId", String.valueOf(principalDetails.getTeacher().getTeacherId()));

            saveJwtToken(principalDetails, accessToken, refreshToken,"teacher");
        }
    }

    public void saveJwtToken(PrincipalDetails principalDetails, String accessToken, String refreshToken, String role){
        JwtToken jwtToken;
        if(role.equals("student")){
            jwtToken = new JwtToken();
            jwtToken.setAccessToken(accessToken);
            jwtToken.setRefreshToken(refreshToken);
            jwtToken.setUserId(principalDetails.getStudent().getStudentId());
            jwtToken.setRole(role);
        }else{
            jwtToken = new JwtToken();
            jwtToken.setAccessToken(accessToken);
            jwtToken.setRefreshToken(refreshToken);
            jwtToken.setUserId(principalDetails.getTeacher().getTeacherId());
            jwtToken.setRole(role);
        }

        Optional<JwtToken> optionalJwtToken = jwtTokenRepository.findByUserId(jwtToken.getUserId(), jwtToken.getRole());
        if(optionalJwtToken.isEmpty()){
            jwtTokenRepository.save(jwtToken);
        }else{
            JwtToken preJwtToken = optionalJwtToken.get();
            preJwtToken.setAccessToken(jwtToken.getAccessToken());
            preJwtToken.setRefreshToken(jwtToken.getRefreshToken());
            jwtTokenRepository.save(preJwtToken);
        }
    }
}
