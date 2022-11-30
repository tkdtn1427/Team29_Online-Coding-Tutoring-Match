package Team049.Iguwana.MainProject.PrimaryEntity.skill.repository;

import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    @Query(value = "select * from skill where name = :name", nativeQuery = true)
    Optional<Skill> findByName(String name);
}
