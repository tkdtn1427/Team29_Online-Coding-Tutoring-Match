package Team049.Iguwana.MainProject.PrimaryEntity.skill.entity;

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

    @OneToMany(mappedBy = "skill")
    private List<SkillTable> skillTableList = new ArrayList<>();

    public void addSkillTable(SkillTable skillTable){
        this.skillTableList.add(skillTable);
        if(skillTable.getSkill() != this){
            skillTable.setSkill(this);
        }
    }
}
