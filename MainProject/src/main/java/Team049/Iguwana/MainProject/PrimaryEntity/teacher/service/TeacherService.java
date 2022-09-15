package Team049.Iguwana.MainProject.PrimaryEntity.teacher.service;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.TeacherRepository;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class TeacherService {
    private final TeacherRepository teacherRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final StudentService studentService;

    public TeacherService(TeacherRepository teacherRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                          StudentService studentService){
        this.teacherRepository = teacherRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.studentService = studentService;
    }

    public void createTeacher(Teacher teacher){
        verifyExistsEMail(teacher.getEmail());
        studentService.verifyExistsEMail(teacher.getEmail());
        teacher.setPassword(transPassword(teacher.getPassword()));
        teacher.setRoles("ROLE_TEACHER");
        teacherRepository.save(teacher);
    }

    public void verifyExistsEMail(String email){
        Optional<Teacher> optionalTeacher = teacherRepository.findByEmail(email);
        if(optionalTeacher.isPresent()){
            throw new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND);
        }
    }

    public String transPassword(String password){
        return bCryptPasswordEncoder.encode(password);
    }
    public Teacher findVerfiedTeacher(long teacherId){
        Optional<Teacher> optionalStudent = teacherRepository.findById(teacherId);
        Teacher teacher = optionalStudent.orElseThrow( () -> new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND));
        return teacher;
    }
}
