package Team049.Iguwana.MainProject.PrimaryEntity.student.repository;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.StudentSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentSkillRepository extends JpaRepository<StudentSkill, Long> {
}
