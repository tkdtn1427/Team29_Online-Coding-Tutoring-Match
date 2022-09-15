package Team049.Iguwana.MainProject.PrimaryEntity.teacher.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.teacher.dto.TeacherDto;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.mapper.TeacherMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/teachers")
@Validated
public class TeacherController {
    private final TeacherMapper teacherMapper;

    private final TeacherService teacherService;

    public TeacherController(TeacherMapper teacherMapper, TeacherService teacherService){
        this.teacherMapper = teacherMapper;
        this.teacherService = teacherService;
    }

    @PostMapping("/join")
    public ResponseEntity joinTeacher(@Validated @RequestBody TeacherDto.Join join){
        teacherService.createTeacher(teacherMapper.teacherJoinToTeacher(join));
        return new ResponseEntity(HttpStatus.CREATED);
    }
}
