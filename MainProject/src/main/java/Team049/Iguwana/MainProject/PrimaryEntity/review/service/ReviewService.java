package Team049.Iguwana.MainProject.PrimaryEntity.review.service;

import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
import Team049.Iguwana.MainProject.PrimaryEntity.review.repository.ReviewRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReviewService {
    public final ReviewRepository reviewRepository;
    public final TeacherService teacherService;

    public ReviewService(ReviewRepository reviewRepository, TeacherService teacherService){
        this.reviewRepository = reviewRepository;
        this.teacherService = teacherService;
    }

    public void createReview(Review review){
        Teacher teacher = teacherService.findVerfiedTeacher(review.getTeacher().getTeacherId());
        review.setTeacher(teacher);
        //teacher 평판 변경하는 로직 필요
        reviewRepository.save(review);
    }
}
