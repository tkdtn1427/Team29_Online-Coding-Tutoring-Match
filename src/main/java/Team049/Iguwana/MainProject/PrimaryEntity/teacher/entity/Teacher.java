package Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity;

import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
//import Team049.Iguwana.MainProject.PrimaryEntity.s3.entity.Images;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.entity.Tutoring;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Column
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String roles;
    //double 형으로 수정
    @Column
    private double reputation;

    @Column(columnDefinition = "Text")
    private String career;

    @Column(columnDefinition = "Text")
    private String aboutMe;

    @Column
    private String nickName;

    @OneToMany(mappedBy = "teacher", cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    private List<SkillTable> skillTableList = new ArrayList<>();

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.REMOVE)
    private List<Tutoring> tutoringList = new ArrayList<>();

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.REMOVE)
    private List<Review> reviewList = new ArrayList<>();

    /*@JsonManagedReference
    @OneToOne(mappedBy = "teacher", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Images image;*/

    public void addReview(Review review) {
        this.reviewList.add(review);
        if (review.getTeacher() != this) {
            review.setTeacher(this);
        }
    }

    public void addTutoring(Tutoring tutoring) {
        this.tutoringList.add(tutoring);
        if (tutoring.getTeacher() != this) {
            tutoring.setTeacher(this);
        }
    }

    public void addSkillTable(SkillTable skillTable) {
        this.skillTableList.add(skillTable);
        if (skillTable.getTeacher() != this) {
            skillTable.setTeacher(this);
        }
    }

    public List<String> getRoleList() {
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    //리뷰 개수 카운트 추가
    private int count;

    /*@JsonManagedReference
    @OneToOne(mappedBy = "teacher", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Images image;

    public void setImage(Images image) {
        this.image = image;
        if (image.getTeacher() != this) {
            image.setTeacher(this);
        }
    }*/
    private String imageUrl="x";
}
