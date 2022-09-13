package Team049.Iguwana.MainProject.PrimaryEntity.review.entity;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    @Column
    private long tutoringId;

    @Column(columnDefinition = "Text")
    private String content;

    @Column
    private long reputation;

    @ManyToOne
    @JoinColumn(name = "TEACHER_ID")
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "STUDENT_ID")
    private Student student;

    public void setTeacher(Teacher teacher){
        this.teacher = teacher;
        if(!this.teacher.getReviewList().contains(this)){
            this.teacher.addReview(this);
        }
    }

    public void setStudent(Student student){
        this.student = student;
        if(!this.student.getReviewList().contains(this)){
            this.student.addReview(this);
        }
    }
}
