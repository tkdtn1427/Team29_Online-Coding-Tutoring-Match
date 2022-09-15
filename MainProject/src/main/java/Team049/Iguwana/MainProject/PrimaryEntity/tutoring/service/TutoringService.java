package Team049.Iguwana.MainProject.PrimaryEntity.tutoring.service;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.dto.TutoringDto;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.entity.Tutoring;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.mapper.TutoringMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.repositroy.TutoringRepository;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TutoringService {
    private final TeacherService teacherService;
    private final StudentService studentService;
    private final TutoringRepository tutoringRepository;

    private final TutoringMapper tutoringMapper;

    public TutoringService(@Lazy TeacherService teacherService, @Lazy StudentService studentService,
                           TutoringRepository tutoringRepository, TutoringMapper tutoringMapper){
        this.teacherService = teacherService;
        this.studentService = studentService;
        this.tutoringRepository = tutoringRepository;
        this.tutoringMapper = tutoringMapper;
    }

    public void createdTutoring(Tutoring tutoring, long teacherId, long studentId){
        Teacher teacher = teacherService.findVerfiedTeacher(teacherId);
        Student student = studentService.findVerfiedStudent(studentId);
        tutoring.setStudent(student);
        tutoring.setTeacher(teacher);
        tutoringRepository.save(tutoring);
    }

    public Tutoring updateTutoring(Tutoring tutoring){
        Tutoring findTutoring = findVerfiedTutoring(tutoring.getTutoringId());
        System.out.println(tutoring.getTime());

        Optional.ofNullable(tutoring.getSubject()).ifPresent(subject -> findTutoring.setSubject(subject));
        Optional.ofNullable(tutoring.getContent()).ifPresent(content -> findTutoring.setContent(content));
        Optional.ofNullable(tutoring.getStart_pd()).ifPresent(start_pd -> findTutoring.setStart_pd(start_pd));
        Optional.ofNullable(tutoring.getEnd_pd()).ifPresent(end_pd -> findTutoring.setEnd_pd(end_pd));
        Optional.ofNullable(tutoring.getTime()).ifPresent(time -> findTutoring.setTime(time));

        return findTutoring;
    }

    public Tutoring findVerfiedTutoring(long tutoringId){
        Optional<Tutoring> optionalTutoring = tutoringRepository.findById(tutoringId);
        Tutoring tutoring = optionalTutoring.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND));
        return tutoring;
    }

    public void deleteTutoring(long tutoringId){
        Tutoring tutoring = findVerfiedTutoring(tutoringId);
        tutoringRepository.delete(tutoring);
    }

    public List<TutoringDto.Response> findTutoringByUserId(long userId, String role){
        List<Tutoring> tutoringList;
        if(role.equals("student")){
            tutoringList = tutoringRepository.findByStudentId(userId);
        }else{
            tutoringList = tutoringRepository.findByTeacherId(userId);
        }

        List<TutoringDto.Response> responses = tutoringList.stream().map(tutoring -> {
            return tutoringMapper.tutoringToTutoringResponse(tutoring);
        }).collect(Collectors.toList());


        return responses;
    }
}
