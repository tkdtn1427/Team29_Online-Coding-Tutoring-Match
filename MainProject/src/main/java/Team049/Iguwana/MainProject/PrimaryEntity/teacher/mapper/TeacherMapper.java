package Team049.Iguwana.MainProject.PrimaryEntity.teacher.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.teacher.dto.TeacherDto;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeacherMapper {
    Teacher teacherJoinToTeacher(TeacherDto.Join requestBody);
}
