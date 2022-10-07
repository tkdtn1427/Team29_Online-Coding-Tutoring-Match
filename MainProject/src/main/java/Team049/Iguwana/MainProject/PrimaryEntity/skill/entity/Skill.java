package Team049.Iguwana.MainProject.PrimaryEntity.skill.entity;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.StudentSkill;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.SkillTable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long skillId;

    @Column
    private String name;

    @Column
    private String color;
    @OneToMany(mappedBy = "skill")
    private List<SkillTable> skillTableList = new ArrayList<>();

    public void addSkillTable(SkillTable skillTable){
        this.skillTableList.add(skillTable);
        if(skillTable.getSkill() != this){
            skillTable.setSkill(this);
        }
    }

    @OneToMany(mappedBy = "skill")
    private List<StudentSkill> studentSkillList = new ArrayList<>();

    public void addstudentSkill(StudentSkill studentSkill){
        this.studentSkillList.add(studentSkill);
        if(studentSkill.getSkill() != this){
            studentSkill.setSkill(this);
        }
    }
}
