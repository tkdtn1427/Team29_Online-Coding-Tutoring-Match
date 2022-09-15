package Team049.Iguwana.MainProject.PrimaryEntity.tutoring.repositroy;

import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.entity.Tutoring;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TutoringRepository extends JpaRepository<Tutoring, Long> {
    @Query(value = "select * from tutoring where student_id = :studentId", nativeQuery = true)
    List<Tutoring> findByStudentId(long studentId);

    @Query(value = "select * from tutoring where teacher_id = :teacherId", nativeQuery = true)
    List<Tutoring> findByTeacherId(long teacherId);
}