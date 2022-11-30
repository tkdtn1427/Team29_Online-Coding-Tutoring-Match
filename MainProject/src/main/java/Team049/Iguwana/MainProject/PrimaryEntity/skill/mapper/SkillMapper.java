package Team049.Iguwana.MainProject.PrimaryEntity.skill.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.skill.dto.SkillDto;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SkillMapper {
    Skill skillPostToSkill(SkillDto.Post requestBody);

    SkillDto.Response skillToResponse(Skill skill);

    List<SkillDto.Response> skillsToResponse(List<Skill> skills);
}
