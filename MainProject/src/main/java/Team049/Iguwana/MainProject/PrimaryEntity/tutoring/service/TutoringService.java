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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;
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

    public Tutoring createdTutoring(Tutoring tutoring, long teacherId, long studentId){
        Teacher teacher = teacherService.findVerfiedTeacher(teacherId);
        Student student = studentService.findVerfiedStudent(studentId);
        tutoring.setStudent(student);
        tutoring.setTeacher(teacher);
        return tutoringRepository.save(tutoring);
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
        List<Tutoring> tutoringList = new ArrayList<>();
        if(role.equals("student")){
            tutoringList = tutoringRepository.findByStudentId(userId);
        }
        List<TutoringDto.Response> responses = tutoringConvert(tutoringList, "");
        return responses;
    }

    public long codeToStudent(String code){
        String str = code.replace("#","");
        return Long.parseLong(str);
    }

    public long codeToTeacher(String code){
        String str = code.replace("@","");
        return Long.parseLong(str);
    }

    public Page<Tutoring> findTutorings(int page, int size, long teacherId){
        Page<Tutoring> tutoringPage = tutoringRepository.findByTeacherId(teacherId, PageRequest.of(page,size,Sort.by("start_pd").descending()));
        return tutoringPage;
    }

    public List<TutoringDto.Response> tutoringConvert(List<Tutoring> tutoringList, String date){

        if(date.isEmpty()){
            List<TutoringDto.Response> responses = tutoringList.stream().
                    map(tutoring -> {
                        return tutoringMapper.tutoringToTutoringResponse(tutoring);
                    }).collect(Collectors.toList());
            return responses;
        }else{
            LocalDate callDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
            List<TutoringDto.Response> responses = tutoringList.stream().filter(tutoring ->{
                        Tutoring responseTutoring = new Tutoring();
                        if(tutoring.getStart_pd().isBefore(callDate.plusDays(1)) && tutoring.getEnd_pd().plusDays(1).isAfter(callDate)){
                            String getTime = tutoring.getTime();
                            StringTokenizer st = new StringTokenizer(getTime,"\n");
                            while (st.hasMoreTokens()){
                                String perTime = st.nextToken();
                                StringTokenizer st_ = new StringTokenizer(perTime, ":");
                                if(String.valueOf(callDate.getDayOfWeek().getValue()).equals(st_.nextToken())){
                                    return true;
                                }
                            }
                            return false;
                        }else return false;
                    }).
                    map(tutoring -> {
                        Tutoring responseTutoring = new Tutoring();
                        responseTutoring.setTutoringId(tutoring.getTutoringId());
                        responseTutoring.setSubject(tutoring.getSubject());
                        responseTutoring.setContent(tutoring.getContent());
                        responseTutoring.setTeacher(tutoring.getTeacher());
                        responseTutoring.setStudent(tutoring.getStudent());
                        responseTutoring.setStart_pd(tutoring.getStart_pd());
                        responseTutoring.setEnd_pd(tutoring.getEnd_pd());
                        StringBuilder sb = new StringBuilder("");
                        String getTime = tutoring.getTime();
                        StringTokenizer st = new StringTokenizer(getTime, "\n");
                        while (st.hasMoreTokens()){
                            String perTime = st.nextToken();
                            StringTokenizer st_ = new StringTokenizer(perTime, ":");
                            if(String.valueOf(callDate.getDayOfWeek().getValue()).equals(st_.nextToken())){
                                sb.append(perTime);
                            }
                        }
                        responseTutoring.setTime(sb.toString());
                        return tutoringMapper.tutoringToTutoringResponse(responseTutoring);
                    }).collect(Collectors.toList());
            return responses;
        }

    }
}
