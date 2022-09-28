package Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.service;

import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.entity.JwtToken;
import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.repository.JwtTokenRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class JwtTokenService {
    private final JwtTokenRepository jwtTokenRepository;

    private final TeacherService teacherService;

    private final StudentService studentService;

    public JwtTokenService(JwtTokenRepository jwtTokenRepository, @Lazy StudentService studentService,
                           @Lazy TeacherService teacherService){
        this.jwtTokenRepository = jwtTokenRepository;
        this.teacherService = teacherService;
        this.studentService = studentService;
    }

    public JwtToken reAccessToken(JwtToken jwtToken, HttpServletResponse response) throws IOException {
        Optional<JwtToken> optionalJwtToken = jwtTokenRepository.findByUserId(jwtToken.getUserId(), jwtToken.getRole());
        JwtToken findJwtToken = optionalJwtToken.orElseThrow(()->new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND));
        checkRefreshToken(jwtToken.getRefreshToken(), findJwtToken.getRefreshToken());
        String newAccessToken;
        if(jwtToken.getRole().equals("student")){
            Student student = studentService.findVerfiedStudent(jwtToken.getUserId());
            newAccessToken = refreshAccessToken(student,null);
        }else{
            Teacher teacher = teacherService.findVerfiedTeacher(jwtToken.getUserId());
            newAccessToken = refreshAccessToken(null,teacher);
        }
        findJwtToken.setAccessToken(newAccessToken);
        setReponse(findJwtToken, response);
        return jwtTokenRepository.save(findJwtToken);
    }

    public String refreshAccessToken(Student student, Teacher teacher){
        String accessToken;
        if(student != null){
            accessToken = JWT.create()
                    .withSubject("cos jwt token")
                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60 * 24)))
                    .withClaim("email", student.getEmail())
                    .withClaim("name", student.getName())
                    .withClaim("role", "student")
                    .sign(Algorithm.HMAC512("cos_jwt_token"));
        }else{
            accessToken = JWT.create()
                    .withSubject("cos jwt token")
                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60 * 24)))
                    .withClaim("email", teacher.getEmail())
                    .withClaim("name", teacher.getName())
                    .withClaim("role", "teacher")
                    .sign(Algorithm.HMAC512("cos_jwt_token"));
        }
        return accessToken;
    }

    public void checkRefreshToken(String refreshToken, String storeRefreshToken) throws IOException {
        String jwtToken = refreshToken.replace("Bearer ", "");
        if(!jwtToken.equals(String.valueOf(storeRefreshToken))){
            throw new BusinessLogicException(ExceptionCode.REFRESH_NOT_EQUAL);
        }
        try{
            JWT.require(Algorithm.HMAC512("cos_jwt_token")).build().verify(jwtToken);
        }catch (TokenExpiredException e){
            throw new BusinessLogicException(ExceptionCode.RERFRSH_EXPIRED);
        }
    }

    public void setReponse(JwtToken newJwtToken, HttpServletResponse response){
        response.addHeader("AccessToken", "Bearer " + newJwtToken.getAccessToken());
        response.addHeader("RefreshToken", "Bearer " + newJwtToken.getRefreshToken());
        response.addHeader("UserId", String.valueOf(newJwtToken.getUserId()));
    }

    public void deleteJwtToken(long userId, String role){
        Optional<JwtToken> optionalJwtToken = jwtTokenRepository.findByUserId(userId, role);
        JwtToken findJwtToken = optionalJwtToken.orElseThrow(()->new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND));
        jwtTokenRepository.delete(findJwtToken);
    }
}
