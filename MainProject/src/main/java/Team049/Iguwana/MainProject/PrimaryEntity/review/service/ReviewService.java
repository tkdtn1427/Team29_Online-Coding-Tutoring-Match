package Team049.Iguwana.MainProject.PrimaryEntity.review.service;

import Team049.Iguwana.MainProject.PrimaryEntity.review.dto.ReviewDto;
import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
import Team049.Iguwana.MainProject.PrimaryEntity.review.mapper.ReviewMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.review.repository.ReviewRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.service.TutoringService;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
@Transactional
public class ReviewService {
    public final ReviewRepository reviewRepository;
    public final TeacherService teacherService;
    public final TutoringService tutoringService;

    public final ReviewMapper reviewMapper;

    public ReviewService(ReviewRepository reviewRepository, TeacherService teacherService,
                         TutoringService tutoringService, ReviewMapper reviewMapper){
        this.reviewRepository = reviewRepository;
        this.teacherService = teacherService;
        this.tutoringService = tutoringService;
        this.reviewMapper = reviewMapper;
    }

    public Review createReview(Review review){
        Teacher teacher = teacherService.findVerfiedTeacher(review.getTeacher().getTeacherId());
        tutoringService.findVerfiedTutoring(review.getTutoringId());
        if(isStudentRegisterReview(review.getTutoringId(), review.getStudentId())){
            throw new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND);
        }
        review.setTeacher(teacher);
        teacherService.updateReputation(teacher.getTeacherId(), review.getReputation(), 0,"create");
        return reviewRepository.save(review);
    }

    public Review updateReview(Review review){
        Review findReview = findverifiedReview(review.getReviewId());
        findReview.setDate(LocalDate.now());
        teacherService.updateReputation(findReview.getTeacher().getTeacherId(), review.getReputation(), findReview.getReputation(), "update");
        Optional.ofNullable(review.getContent()).ifPresent(content -> findReview.setContent(content));
        Optional.ofNullable(review.getReputation()).ifPresent(reputation -> findReview.setReputation(reputation));

        return reviewRepository.save(findReview);
    }

    public Review findverifiedReview(long reviewId){
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        Review review = optionalReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND));
        return review;
    }

    public void deleteReview(long reviewId){
        Review review = findverifiedReview(reviewId);
        teacherService.updateReputation(review.getTeacher().getTeacherId(), 0, review.getReputation(), "delete");
        reviewRepository.delete(review);
    }

    public boolean isStudentRegisterReview(long tutoringId, long studentId){
        Optional<Review> optionalReview = reviewRepository.findByIds(tutoringId,studentId);
        if(optionalReview.isPresent()){
            return true;
        }else{
            return false;
        }
    }
    
    // Teacher 쪽에서 리뷰 목록 가져오기 위한 코드
    //리턴 타입 Page<Review>에서 List<ReviewDto.Response>로 변경 -도윤
    public Page<Review> findByTeacherId(int page, int size,String arrange, long teacherId){
        teacherService.findVerfiedTeacher(teacherId);
        Page<Review> reviewPage = reviewRepository.findByteacherId(teacherId,
                PageRequest.of(page, size, Sort.by(arrange).descending()));

        return reviewPage;
    }

}
