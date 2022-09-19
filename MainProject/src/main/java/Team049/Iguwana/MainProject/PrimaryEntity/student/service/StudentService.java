package Team049.Iguwana.MainProject.PrimaryEntity.student.service;

import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.service.JwtTokenService;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.repository.SkillRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.dto.StudentDto;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.StudentSkill;
import Team049.Iguwana.MainProject.PrimaryEntity.student.repository.StudentRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.repository.StudentSkillRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.service.TutoringService;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentService {
    private final StudentRepository studentRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TeacherService teacherService;
    private final StudentSkillRepository studentSkillRepository;
    private final SkillRepository skillRepository;

    private final JwtTokenService jwtTokenService;

    public StudentService(StudentRepository studentRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                          @Lazy TeacherService teacherService, SkillRepository skillRepository, StudentSkillRepository studentSkillRepository,
                          JwtTokenService jwtTokenService){
        this.studentRepository = studentRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.teacherService = teacherService;
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.jwtTokenService = jwtTokenService;
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
        jwtTokenService.deleteJwtToken(studentId,"student");
        studentRepository.delete(student);
    }

    public Student updateStudent(Student student){
        Student findStudent = findVerfiedStudent(student.getStudentId());

        Optional.ofNullable(student.getNickName()).ifPresent(nickName -> findStudent.setNickName(nickName));
        Optional.ofNullable(student.getAboutMe()).ifPresent(aboutMe -> findStudent.setAboutMe(aboutMe));
        Optional.ofNullable(student.getStudentSkillList()).ifPresent(studentSkillList -> {
            for (int i=0; i< findStudent.getStudentSkillList().size(); i++)
                studentSkillRepository.delete(findStudent.getStudentSkillList().get(i));

            for (int i=0; i< studentSkillList.size(); i++){
                Optional<Skill> response = skillRepository.findByName(studentSkillList.get(i).getSkill().getName());
                Skill answer = response.orElseThrow(()->new BusinessLogicException(ExceptionCode.SKILL_NOT_FOUND));
                student.getStudentSkillList().get(i).setSkill(answer);
            }

            findStudent.setStudentSkillList(student.getStudentSkillList());
        });

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
    public StudentDto.Response setCode(StudentDto.Response response){
        response.setCode(codeInit(response.getStudentId()));
        return response;
    }

    public String codeInit(long studentId){
        StringBuilder sb = new StringBuilder("#");
        int len = String.valueOf(studentId).length();
        for(int i=0; i<4-len; i++) sb.append("0");
        sb.append(studentId);
        return sb.toString();
    }
}
