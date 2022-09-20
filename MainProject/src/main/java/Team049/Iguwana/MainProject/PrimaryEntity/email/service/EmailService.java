package Team049.Iguwana.MainProject.PrimaryEntity.email.service;


import Team049.Iguwana.MainProject.PrimaryEntity.email.entity.Email;
import Team049.Iguwana.MainProject.PrimaryEntity.email.repository.EmailRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.repository.StudentRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.TeacherRepository;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class EmailService {
    private final EmailRepository emailRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final TeacherRepository teacherRepository;

    private final StudentRepository studentRepository;

    public EmailService(EmailRepository emailRepository, BCryptPasswordEncoder bCryptPasswordEncoder, TeacherRepository teacherRepository, StudentRepository studentRepository) {
        this.emailRepository = emailRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

    public void emailCheckMember(String code) {
        Optional<Email> result = emailRepository.findByCodes(code);

        if(result.isPresent()){
            Email email = result.get();
            if (email.getUsers().equals("teacher")) {
                Teacher teacher = new Teacher();
                teacher.setName(email.getName());
                teacher.setEmail(email.getEmail());
                teacher.setCareer(email.getCareer());
                teacher.setAboutMe(email.getAboutMe());
                teacher.setNickName(email.getNickName());

                String password = email.getPassword();

                teacher.setPassword(transPassword(password));
                teacher.setRoles("ROLE_TEACHER");
                teacherRepository.save(teacher);

            }else{
                Student student = new Student();
                student.setName(email.getName());
                student.setEmail(email.getEmail());
                student.setAboutMe(email.getAboutMe());
                student.setNickName(email.getNickName());

                String password = email.getPassword();

                student.setPassword(transPassword(password));
                student.setRoles("ROLE_USER");
                studentRepository.save(student);
            }
        }else{
            throw new BusinessLogicException(ExceptionCode.CODE_NOT_FOUND);
        }

    }

    public String transPassword(String password){
        return bCryptPasswordEncoder.encode(password);
    }
}
