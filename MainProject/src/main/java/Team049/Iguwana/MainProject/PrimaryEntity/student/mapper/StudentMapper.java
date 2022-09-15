package Team049.Iguwana.MainProject.PrimaryEntity.student.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.student.dto.StudentDto;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.mapper.TutoringMapper;
import org.mapstruct.*;

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

    Student studentPatchToStudent(StudentDto.Patch requestBody);

    Student studentPasswordToStudent(StudentDto.Password requestBody);

//    default StudentDto.Response studentToStudentResponse(Student requestBody, TutoringMapper tutoringMapper){
//        StudentDto.Response response = new StudentDto.Response();
//        response.setStudentId(requestBody.getStudentId());
//        response.setAboutMe(requestBody.getAboutMe());
//        response.setEmail(requestBody.getEmail());
//        response.setName(requestBody.getName());
//        response.setNickName(requestBody.getNickName());
//        response.setTutoringList(requestBody.getTutoringList().stream().map(tutoring -> {
//            return tutoringMapper.tutoringToTutoringResponse(tutoring);
//        }).collect(Collectors.toList()));
//        return response;
//    }
    @Mapping(target = "tutoringList", expression = "java(null)")
    StudentDto.Response studentToStudentResponse(Student requestBody);
}
