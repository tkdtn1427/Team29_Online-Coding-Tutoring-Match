package Team049.Iguwana.MainProject.filter;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.repository.StudentRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.TeacherRepository;
import Team049.Iguwana.MainProject.oauth.PrincipalDetails;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private StudentRepository studentRepository;

    private TeacherRepository teacherRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, StudentRepository studentRepository, TeacherRepository teacherRepository) {
        super(authenticationManager);
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String jwtHeader = request.getHeader("AccessToken");

        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }

        String jwtToken = jwtHeader.replace("Bearer ", "");
        try {
            String email = JWT.require(Algorithm.HMAC512("cos_jwt_token")).build().verify(jwtToken).getClaim("email").asString();
            String role  = JWT.require(Algorithm.HMAC512("cos_jwt_token")).build().verify(jwtToken).getClaim("role").asString();

            if (email != null && role.equals("student")) {
                Student studentEntity = studentRepository.findByEmail(email).get();
                PrincipalDetails principalDetails = new PrincipalDetails(studentEntity);
                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);

                chain.doFilter(request, response);
            }else if(email != null && role.equals("teacher")){
                Teacher teacherEntity = teacherRepository.findByEmail(email).get();
                PrincipalDetails principalDetails = new PrincipalDetails(teacherEntity);
                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);

                chain.doFilter(request,response);
            }

        }catch (TokenExpiredException e){
            log.info("AccessToken 만료 ");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            ResponseError responseError = new ResponseError(HttpStatus.UNAUTHORIZED.value(), "Jwt Token Expired");
            response.getWriter().write(new ObjectMapper(). writeValueAsString(responseError));
        }
    }
    @Getter
    @AllArgsConstructor
    public static class ResponseError{
        private int status;
        private String message;
    }
}
