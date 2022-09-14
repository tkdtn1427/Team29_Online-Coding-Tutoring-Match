package Team049.Iguwana.MainProject.PrimaryEntity.student.service;

import Team049.Iguwana.MainProject.PrimaryEntity.student.dto.StudentDto;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.mapper.StudentMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.student.repository.StudentRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class StudentService {
    private final StudentRepository studentRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final TeacherService teacherService;

    public StudentService(StudentRepository studentRepository, BCryptPasswordEncoder bCryptPasswordEncoder, @Lazy TeacherService teacherService){
        this.studentRepository = studentRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.teacherService = teacherService;
    }

    public void createStudent(Student student){
        verifyExistsEMail(student.getEmail());
        teacherService.verifyExistsEMail(student.getEmail());
        student.setPassword(transPassword(student.getPassword()));
        student.setRoles("ROLE_USER");
        studentRepository.save(student);
    }

    public void deleteStudent(long studentId){
        Student student = findVerfiedStudent(studentId);
        studentRepository.delete(student);
    }

    public Student updateStudent(Student student){
        Student findStudent = findVerfiedStudent(student.getStudentId());

        Optional.ofNullable(student.getNickName()).ifPresent(nickName -> findStudent.setNickName(nickName));
        Optional.ofNullable(student.getAboutMe()).ifPresent(aboutMe -> findStudent.setAboutMe(aboutMe));

        return studentRepository.save(findStudent);
    }

    public void updatePassword(Student student){
        Student findStudent = findVerfiedStudent(student.getStudentId());

        findStudent.setPassword(transPassword(student.getPassword()));
        studentRepository.save(findStudent);
    }


    public void verifyExistsEMail(String email){
        Optional<Student> optionalStudent = studentRepository.findByEmail(email);
        if(optionalStudent.isPresent()){
            throw new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND);
        }
    }

    public Student findVerfiedStudent(long studentId){
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        Student student = optionalStudent.orElseThrow( () -> new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND));
        return student;
    }

    public String transPassword(String password){
        return bCryptPasswordEncoder.encode(password);
    }
}
