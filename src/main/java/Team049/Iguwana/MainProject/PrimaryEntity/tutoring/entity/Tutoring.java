package Team049.Iguwana.MainProject.PrimaryEntity.tutoring.entity;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Tutoring {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tutoringId;

    @Column
    private String subject;

    @Column(columnDefinition = "Text")
    private String content;

    @Column
    private LocalDate start_pd;

    @Column
    private LocalDate end_pd;

    @Column
    private String time;

    @ManyToOne
    @JoinColumn(name = "TEACHER_ID")
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "STUDENT_ID")
    private Student student;

    public void setStudent(Student student){
        this.student = student;
        if(!this.student.getTutoringList().contains(this)){
            this.student.addTutoring(this);
        }
    }

    public void setTeacher(Teacher teacher){
        this.teacher = teacher;
        if(!this.teacher.getTutoringList().contains(this)){
            this.teacher.addTutoring(this);
        }
    }
}
