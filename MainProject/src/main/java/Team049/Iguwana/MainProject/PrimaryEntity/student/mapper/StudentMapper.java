package Team049.Iguwana.MainProject.PrimaryEntity.student.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.student.dto.StudentDto;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

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

    Student studentPatchToStudent(StudentDto.Patch requestBody);

    Student studentPasswordToStudent(StudentDto.Password requestBody);

    StudentDto.Response studentToStudentResponse(Student requestBody);
}
