package Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity;

import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
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
public class SkillTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long skillTableId;

    @ManyToOne
    @JoinColumn(name = "TEACHER_ID")
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "SKILL_ID")
    private Skill skill;

    public void setTeacher(Teacher teacher){
        this.teacher = teacher;
        if(!this.teacher.getSkillTableList().contains(this)){
            this.teacher.addSkillTable(this);
        }
    }

    public void setSkill(Skill skill){
        this.skill = skill;
        if(!this.skill.getSkillTableList().contains(this)){
            this.skill.addSkillTable(this);
        }
    }
}
