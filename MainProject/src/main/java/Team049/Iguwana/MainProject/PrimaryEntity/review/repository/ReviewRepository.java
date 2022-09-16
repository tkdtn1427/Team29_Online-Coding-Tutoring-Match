package Team049.Iguwana.MainProject.PrimaryEntity.review.repository;

import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "select * from review where tutoring_id = :tutoringId AND student_id = :studentId", nativeQuery = true)
    Optional<Review> findByIds(long tutoringId, long studentId);
    @Query(value = "select * from review where teacher_id = :teacherId", nativeQuery = true)
    Page<Review> findByteacherId(long teacherId, Pageable pageable);
}
