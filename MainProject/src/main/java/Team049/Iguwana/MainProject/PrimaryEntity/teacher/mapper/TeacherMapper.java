package Team049.Iguwana.MainProject.PrimaryEntity.teacher.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.repository.SkillRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.dto.TeacherDto;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.SkillTable;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.SkillTableRepository;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TeacherMapper {
    Teacher teacherJoinToTeacher(TeacherDto.Join requestBody);

    default Teacher teacherPatchToTeacher(TeacherDto.Patch requestBody, SkillTableRepository skillTableRepository) {
        Teacher teacher = new Teacher();

        teacher.setTeacherId(requestBody.getTeacherId());
        teacher.setName(requestBody.getName());
        teacher.setPassword(requestBody.getPassword());
        teacher.setCareer(requestBody.getCareer());
        teacher.setAboutMe(requestBody.getAboutMe());
        teacher.setNickName(requestBody.getNickName());

        List<SkillTable> list = requestBody.getSkillTableList().stream()
                .map(skillTableList ->{
                    SkillTable skillTable = new SkillTable();
                    Skill response = new Skill();

                    response.setName(skillTableList.getName());

                    skillTable.setTeacher(teacher);
                    skillTable.setSkill(response);

                    return skillTable;
                }).collect(Collectors.toList());
        teacher.setSkillTableList(list);

        return teacher;
    }

    default TeacherDto.Response teacherToResponse(Teacher teacher) {
        TeacherDto.Response response = new TeacherDto.Response();
        response.setTeacherId(teacher.getTeacherId());
        response.setName(teacher.getName());
        response.setEmail(teacher.getEmail());
        response.setReputation(teacher.getReputation());
        response.setCareer(teacher.getCareer());
        response.setAboutMe(teacher.getAboutMe());
        response.setNickName(teacher.getNickName());
        response.setCount(teacher.getCount());
        response.setImageUrl(teacher.getImageUrl());
        if (!response.getImageUrl().equals("x")) {
            response.setImageUrl("https://pre-029-bucket.s3.ap-northeast-2.amazonaws.com/"+response.getImageUrl());
        }

        List<TeacherDto.SkillResponse> skillTableList=
                teacher.getSkillTableList().stream()
                        .map(skillTable -> {
                            TeacherDto.SkillResponse res = new TeacherDto.SkillResponse();

                            res.setSkillId(skillTable.getSkill().getSkillId());
                            res.setName(skillTable.getSkill().getName());
                            res.setColor(skillTable.getSkill().getColor());

                            return res;
                        }).collect(Collectors.toList());
        response.setSkillTableList(skillTableList);

        String fourCode = teacher.getTeacherId() + "";
        fourCode.trim();
        if (fourCode.length() < 4) {
            for (int i = 0; i < 6 - fourCode.length(); i++) {
                fourCode = "0" + fourCode;
            }
        }
        fourCode = "@" + fourCode;
        response.setCode(fourCode);
        return response;
    }

    List<TeacherDto.Response> teachersToResponses(List<Teacher> teachers);
}
