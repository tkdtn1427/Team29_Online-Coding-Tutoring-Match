package Team049.Iguwana.MainProject.oauth;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.repository.StudentRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.TeacherRepository;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {
    private final StudentRepository studentRepository;

    private final TeacherRepository teacherRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Student> optionalStudent = studentRepository.findByEmail(email);
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);
        if(optionalStudent.isPresent()){
            return new PrincipalDetails(optionalStudent.get());
        }
        if(optionalTeacher.isPresent()){
            return new PrincipalDetails(optionalTeacher.get());
        }

        throw new BusinessLogicException(ExceptionCode.LOGIN_FAILURE);
    }
}
