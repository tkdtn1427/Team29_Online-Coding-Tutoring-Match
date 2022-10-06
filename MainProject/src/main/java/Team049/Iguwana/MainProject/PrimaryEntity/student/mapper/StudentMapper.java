package Team049.Iguwana.MainProject.PrimaryEntity.student.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import Team049.Iguwana.MainProject.PrimaryEntity.student.dto.StudentDto;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.StudentSkill;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.mapper.TutoringMapper;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    default Student studentJoinToStudent(StudentDto.Join requestBody){
        Student student = new Student();
        student.setName(requestBody.getName());
        student.setEmail(requestBody.getEmail());
        student.setPassword(requestBody.getPassword());
        student.setNickName(requestBody.getNickName());
        student.setAboutMe(requestBody.getAboutMe());

        return student;
    }

    default Student studentPatchToStudent(StudentDto.Patch requestBody){
        Student student = new Student();
        student.setStudentId(requestBody.getStudentId());
        student.setAboutMe(requestBody.getAboutMe());
        student.setNickName(requestBody.getNickName());
        student.setPassword(requestBody.getPassword());
        if(requestBody.getSkillTableList() != null){
            List<StudentSkill> list = requestBody.getSkillTableList().stream()
                    .map(skillList -> {
                        StudentSkill studentSkill = new StudentSkill();
                        Skill skill = new Skill();

                        skill.setName(skillList.getName());

                        studentSkill.setStudent(student);
                        studentSkill.setSkill(skill);

                        return studentSkill;
                    }).collect(Collectors.toList());
            student.setStudentSkillList(list);
        }else{
            student.setStudentSkillList(null);
        }


        return student;
    }

//    Student studentPasswordToStudent(StudentDto.Password requestBody);

    default StudentDto.Response studentToStudentResponse(Student requestBody, TutoringMapper tutoringMapper){
        StudentDto.Response response = new StudentDto.Response();
        response.setStudentId(requestBody.getStudentId());
        response.setAboutMe(requestBody.getAboutMe());
        response.setEmail(requestBody.getEmail());
        response.setName(requestBody.getName());
        response.setNickName(requestBody.getNickName());
        response.setImageUrl(requestBody.getImageUrl());
        response.setTutoringList(requestBody.getTutoringList().stream().map(tutoring -> {
            return tutoringMapper.tutoringToTutoringResponse(tutoring);
        }).collect(Collectors.toList()));

        List<StudentDto.SkillResponse> skillResponseList = requestBody.getStudentSkillList().stream()
                .map(studentSkill -> {
                    StudentDto.SkillResponse res = new StudentDto.SkillResponse();

                    res.setSkillId(studentSkill.getSkill().getSkillId());
                    res.setName(studentSkill.getSkill().getName());
                    res.setColor(studentSkill.getSkill().getColor());

                    return res;
                }).collect(Collectors.toList());
        response.setSkillResponseList(skillResponseList);

        return response;
    }
//    @Mapping(target = "tutoringList", expression = "java(null)")
//    @Mapping(target = "skillResponseList", expression = "java(null)")
//    StudentDto.Response studentToStudentResponse(Student requestBody);
}
