package Team049.Iguwana.MainProject.PrimaryEntity.teacher.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.teacher.dto.TeacherDto;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.mapper.TeacherMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository.SkillTableRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import Team049.Iguwana.MainProject.dto.MultiResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/v1/teachers")
@Validated
public class TeacherController {
    private final TeacherMapper teacherMapper;

    private final TeacherService teacherService;

    private final SkillTableRepository skillTableRepository;
    public TeacherController(TeacherMapper teacherMapper, TeacherService teacherService, SkillTableRepository skillTableRepository) {
        this.teacherMapper = teacherMapper;
        this.teacherService = teacherService;
        this.skillTableRepository = skillTableRepository;
    }

    @PostMapping("/join")
    public ResponseEntity joinTeacher(@Validated @RequestBody TeacherDto.Join join){
        teacherService.createTeacher(teacherMapper.teacherJoinToTeacher(join));
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/update/{teacher-id}")
    public ResponseEntity patchTeacher(
            @PathVariable("teacher-id") @Positive long teacherId,
            @Valid @RequestBody TeacherDto.Patch requestBody
    ) {
        requestBody.setTeacherId(teacherId);
        Teacher teacher = teacherService.updateTeacher(teacherMapper.teacherPatchToTeacher(requestBody,skillTableRepository));

        return new ResponseEntity(teacherMapper.teacherToResponse(teacher), HttpStatus.OK);
    }

    @GetMapping("/{teacher-id}")
    public ResponseEntity getTeacher(@PathVariable("teacher-id") long teacherId){
        Teacher teacher = teacherService.findVerfiedTeacher(teacherId);
        TeacherDto.Response response = teacherMapper.teacherToResponse(teacher);

        return new ResponseEntity(response,HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getTeachers(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size,
                                   @RequestParam String arrange,
                                   @RequestParam String skill
    ) {
        Page<Teacher> pages = teacherService.findTeachers(page - 1, size,arrange);
        List<Teacher> teachers = pages.getContent();
        if (!skill.equals("x")) {
            teachers = teacherService.skillCheck(teachers, skill);
        }
        return new ResponseEntity<>(new MultiResponseDto<>(teacherMapper.teachersToResponses(teachers), pages),
                HttpStatus.OK);
    }

    @DeleteMapping("/delete/{teacher-id}")
    public ResponseEntity deleteTeacher(
            @PathVariable("teacher-id") @Positive long teacherId
    ){
        teacherService.deleteTeacher(teacherId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }
}
