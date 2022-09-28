package Team049.Iguwana.MainProject.PrimaryEntity.student.entity;

import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudentSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long studentSkillId;

    @ManyToOne
    @JoinColumn(name = "STUDENT_ID")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "SKILL_ID")
    private Skill skill;

    public void setStudent(Student student){
        this.student = student;
        if(!this.student.getStudentSkillList().contains(this)){
            this.student.addStudentSkill(this);
        }
    }

    public void setSkill(Skill skill){
        this.skill = skill;
        if(!this.skill.getStudentSkillList().contains(this)){
            this.skill.addstudentSkill(this);
        }
    }
}
