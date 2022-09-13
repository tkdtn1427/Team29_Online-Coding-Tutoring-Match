package Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity;

import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.entity.Tutoring;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long teacherId;

    @Column
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String roles;

    @Column
    private long reputation;

    @Column(columnDefinition = "Text")
    private String career;

    @Column(columnDefinition = "Text")
    private String aboutMe;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.REMOVE)
    private List<SkillTable> skillTableList = new ArrayList<>();

    @OneToMany(mappedBy = "teacher")
    private List<Tutoring> tutoringList = new ArrayList<>();

    @OneToMany(mappedBy = "teacher")
    private List<Review> reviewList = new ArrayList<>();

    public void addReview(Review review){
        this.reviewList.add(review);
        if(review.getTeacher() != this){
            review.setTeacher(this);
        }
    }

    public void addTutoring(Tutoring tutoring){
        this.tutoringList.add(tutoring);
        if(tutoring.getTeacher() != this){
            tutoring.setTeacher(this);
        }
    }

    public void addSkillTable(SkillTable skillTable){
        this.skillTableList.add(skillTable);
        if(skillTable.getTeacher() != this){
            skillTable.setTeacher(this);
        }
    }

    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }
}
