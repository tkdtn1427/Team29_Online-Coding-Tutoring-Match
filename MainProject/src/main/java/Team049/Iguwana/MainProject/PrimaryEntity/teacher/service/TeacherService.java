package Team049.Iguwana.MainProject.PrimaryEntity.teacher.service;


//import Team049.Iguwana.MainProject.PrimaryEntity.email.entity.Email;
//import Team049.Iguwana.MainProject.PrimaryEntity.email.repository.EmailRepository;

import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.service.JwtTokenService;

import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.repository.SkillRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.dto.TeacherDto;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.SkillTableRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.TeacherRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.service.TutoringService;
//import Team049.Iguwana.MainProject.event.MemberRegistrationApplicationEvent;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
public class TeacherService {
    private final TeacherRepository teacherRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final StudentService studentService;
    private final SkillRepository skillRepository;
    private final SkillTableRepository skillTableRepository;

    //private final ApplicationEventPublisher publisher;
    //private Random random = new Random();
    //private final EmailRepository emailRepository;

    //Sangsoo 추가분 
    private final JwtTokenService jwtTokenService;

    public TeacherService(TeacherRepository teacherRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                          StudentService studentService, SkillRepository skillRepository, SkillTableRepository skillTableRepository,
                          JwtTokenService jwtTokenService){
        this.teacherRepository = teacherRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.studentService = studentService;
        this.skillRepository = skillRepository;
        this.skillTableRepository = skillTableRepository;

        //this.publisher = publisher;

        this.jwtTokenService = jwtTokenService;

    }

    public void createTeacher(Teacher teacher){
        verifyExistsEMail(teacher.getEmail());
        studentService.verifyExistsEMail(teacher.getEmail());
/*
        String code = random.nextInt()+"";
        publisher.publishEvent(new MemberRegistrationApplicationEvent(this, teacher,"1",teacher.getEmail()));
        Email email = new Email();
        email.setName(teacher.getName());
        email.setPassword(teacher.getPassword());
        email.setEmail(teacher.getEmail());
        email.setCareer(teacher.getCareer());
        email.setAboutMe(teacher.getAboutMe());
        email.setNickName(teacher.getNickName());
        email.setCode("1");
        email.setUsers("teacher");
        emailRepository.save(email);
*/
        teacher.setPassword(transPassword(teacher.getPassword()));
        teacher.setRoles("ROLE_TEACHER");
        teacherRepository.save(teacher);
    }



    public Teacher updateTeacher(Teacher teacher){
        Teacher findTeacher = findVerfiedTeacher(teacher.getTeacherId());

        Optional.ofNullable(teacher.getName()).ifPresent(name -> findTeacher.setName(name));
        Optional.ofNullable(teacher.getPassword()).ifPresent(password -> findTeacher.setPassword(password));
        Optional.ofNullable(teacher.getCareer()).ifPresent(career -> findTeacher.setCareer(career));
        Optional.ofNullable(teacher.getAboutMe()).ifPresent(aboutMe -> findTeacher.setAboutMe(aboutMe));
        Optional.ofNullable(teacher.getNickName()).ifPresent(nickName -> findTeacher.setNickName(nickName));
        Optional.ofNullable(teacher.getSkillTableList())
                .ifPresent(skillTable->{
                    for (int i = 0; i < findTeacher.getSkillTableList().size(); i++) {
                        skillTableRepository.delete(findTeacher.getSkillTableList().get(i));
                    }

                    for (int i = 0; i < skillTable.size(); i++) {

                        Optional<Skill> response =skillRepository.findByName(skillTable.get(i).getSkill().getName());
                        Skill answer = response.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.SKILL_NOT_FOUND));
                        teacher.getSkillTableList().get(i).setSkill(answer);

                    }

                    findTeacher.setSkillTableList(teacher.getSkillTableList());
                });


        return teacherRepository.save(findTeacher);
    }

    public Page<Teacher> findTeachers(int page, int size, String arrange){
        return teacherRepository.findAll(PageRequest.of(page, size,
                Sort.by(arrange).descending()));
    }

    public List<Teacher> skillCheck(List<Teacher> teachers, String skills) {
        List<Teacher> result = new ArrayList<>();

        Optional<Skill> skill = skillRepository.findByName(skills);
        Skill answer = skill.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.SKILL_NOT_FOUND));

        for (int i = 0; i < teachers.size(); i++) {
            for (int j = 0; j < teachers.get(i).getSkillTableList().size(); j++) {
                if (teachers.get(i).getSkillTableList().get(j).getSkill() == answer) {
                    result.add(teachers.get(i));
                }
            }
        }
        return result;
    }
    public void deleteTeacher(long teacherId) {
        Teacher teacher = findVerfiedTeacher(teacherId);
        jwtTokenService.deleteJwtToken(teacherId,"teacher");
        teacherRepository.delete(teacher);
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


/*    public TeacherDto.Response setTutoring(TeacherDto.Response response){
        response.setTutoringList(tutoringService.findTutoringByUserId(response.getTeacherId(), "teacher"));
        return response;
    }
    public List<TeacherDto.Response> setTutorings(List<TeacherDto.Response> responses) {

        return responses.stream()
                .map(response -> {
                    response.setTutoringList(tutoringService.findTutoringByUserId(response.getTeacherId(), "teacher"));
                    return response;
                }).collect(Collectors.toList());
    }*/
    //수정 - 평판 변경 로직
    public void updateReputation(long teacherId, double reputation, double preReputation, String str){
        Teacher teacher = findVerfiedTeacher(teacherId);
        int reviewCount = teacher.getCount();
        double nowReputation = teacher.getReputation();
        double updateReputation ;
        if(str.equals("create")){
            if(reviewCount == 0){
                updateReputation = reputation;
            }else{
                updateReputation = (((double)reviewCount * nowReputation) + reputation) / (double)(reviewCount+1) ;
            }
            teacher.setCount(reviewCount + 1);
            teacher.setReputation(Double.parseDouble(String.format("%.3f", updateReputation)));
        }else if (str.equals("update")){
            updateReputation = ((double)reviewCount * nowReputation) - preReputation + reputation;
            updateReputation /= (double) reviewCount;
            teacher.setReputation(Double.parseDouble(String.format("%.3f", updateReputation)));
        }else{
            updateReputation = ((double)reviewCount * nowReputation) - preReputation;
            updateReputation /= (double) (reviewCount-1);
            teacher.setCount(reviewCount - 1);
            if(reviewCount == 1){
                teacher.setReputation(0);
            }else{
                teacher.setReputation(Double.parseDouble(String.format("%.3f", updateReputation)));
            }

        }
        teacherRepository.save(teacher);

    }
}
