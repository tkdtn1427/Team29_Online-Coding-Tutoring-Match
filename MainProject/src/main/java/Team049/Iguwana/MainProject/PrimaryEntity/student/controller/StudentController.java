package Team049.Iguwana.MainProject.PrimaryEntity.student.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.student.dto.StudentDto;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.mapper.StudentMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.student.repository.StudentRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.mapper.TutoringMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.service.TutoringService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/students")
@Validated
public class StudentController {

    private final StudentMapper studentMapper;

    private final StudentService studentService;
    
    private final TutoringMapper tutoringMapper;

    public StudentController(StudentMapper studentMapper, StudentService studentService,
                             TutoringMapper tutoringMapper){
        this.studentMapper = studentMapper;
        this.studentService = studentService;
        this.tutoringMapper = tutoringMapper;
    }

    @PostMapping("/join")
    public ResponseEntity joinStudent(@Validated @RequestBody StudentDto.Join join){
        Student student = studentMapper.studentJoinToStudent(join);
        studentService.createStudent(student);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{student-id}")
    public ResponseEntity deleteStudent(@PathVariable("student-id") long studentId){
        studentService.deleteStudent(studentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/myPage/{student-id}")
    public ResponseEntity showStudent(@PathVariable("student-id") long studentId){
        Student student = studentService.findVerfiedStudent(studentId);

        StudentDto.Response response = studentMapper.studentToStudentResponse(student, tutoringMapper);
        studentService.setCode(response);
        return new ResponseEntity(response,HttpStatus.OK);
    }

    @PatchMapping("/update/{student-id}")
    public ResponseEntity updateStudent(@PathVariable("student-id") long studentId,
                                        @RequestBody StudentDto.Patch patch){
        patch.setStudentId(studentId);
        Student student = studentMapper.studentPatchToStudent(patch);
        Student updateStudent = studentService.updateStudent(student);
        StudentDto.Response response = studentMapper.studentToStudentResponse(updateStudent, tutoringMapper);
        studentService.setCode(response);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/password/{student-id}")
    public ResponseEntity updatePassword(@PathVariable("student-id") long studentId,
                                         @RequestBody StudentDto.Password password){
        password.setStudentId(studentId);
        Student student = studentMapper.studentPasswordToStudent(password);
        studentService.updatePassword(student);
        return new ResponseEntity(HttpStatus.OK);
    }
}
