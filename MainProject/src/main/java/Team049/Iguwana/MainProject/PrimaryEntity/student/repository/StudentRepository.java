package Team049.Iguwana.MainProject.PrimaryEntity.student.repository;

import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query(value = "select * from student where email = :email", nativeQuery = true)
    Optional<Student> findByEmail(String email);
}
