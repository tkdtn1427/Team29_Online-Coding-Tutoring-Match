package Team049.Iguwana.MainProject.PrimaryEntity.teacher.repository;

import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    @Query(value = "select * from teacher where email = :email", nativeQuery = true)
    Optional<Teacher> findByEmail(String email);
}
