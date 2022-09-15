package Team049.Iguwana.MainProject.PrimaryEntity.teacher.service;

import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.repository.SkillRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.SkillTableRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.TeacherRepository;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeacherService {
    private final TeacherRepository teacherRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final StudentService studentService;
    private final SkillRepository skillRepository;
    private final SkillTableRepository skillTableRepository;
    public TeacherService(TeacherRepository teacherRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                          StudentService studentService, SkillRepository skillRepository, SkillTableRepository skillTableRepository){
        this.teacherRepository = teacherRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.studentService = studentService;
        this.skillRepository = skillRepository;
        this.skillTableRepository = skillTableRepository;
    }

    public void createTeacher(Teacher teacher){
        verifyExistsEMail(teacher.getEmail());
        studentService.verifyExistsEMail(teacher.getEmail());
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
}
