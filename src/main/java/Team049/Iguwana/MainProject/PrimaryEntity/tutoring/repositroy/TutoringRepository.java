package Team049.Iguwana.MainProject.PrimaryEntity.tutoring.repositroy;

import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.entity.Tutoring;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TutoringRepository extends JpaRepository<Tutoring, Long> {
    @Query(value = "select * from tutoring where student_id = :studentId", nativeQuery = true)
    List<Tutoring> findByStudentId(long studentId);

    @Query(value = "select * from tutoring where teacher_id = :teacherId", nativeQuery = true)
    Page<Tutoring> findByTeacherId(long teacherId, Pageable pageable);
}
