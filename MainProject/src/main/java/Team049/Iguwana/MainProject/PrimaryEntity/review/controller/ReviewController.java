package Team049.Iguwana.MainProject.PrimaryEntity.review.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.review.dto.ReviewDto;
import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
import Team049.Iguwana.MainProject.PrimaryEntity.review.mapper.ReviewMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.review.service.ReviewService;
import Team049.Iguwana.MainProject.dto.MultiResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/reviews")
@Validated
public class ReviewController {
    public final ReviewService reviewService;
    public final ReviewMapper reviewMapper;

    public ReviewController(ReviewService reviewService, ReviewMapper reviewMapper){
        this.reviewMapper = reviewMapper;
        this.reviewService = reviewService;
    }

    @PostMapping("/register")
    public ResponseEntity registerReview(@RequestBody ReviewDto.Register register){
        Review review = reviewMapper.reviewRegisterToReview(register);
        Review resposne = reviewService.createReview(review);
        return new ResponseEntity(reviewMapper.reviewToReviewResponse(resposne),HttpStatus.CREATED);
    }

    @PatchMapping("/update/{review-id}")
    public ResponseEntity updateReview(@PathVariable("review-id") long reviewId,
                                       @RequestBody ReviewDto.Patch patch){
        patch.setReviewId(reviewId);
        Review review = reviewMapper.reviewPatchToReview(patch);
        Review response = reviewService.updateReview(review);
        return new ResponseEntity(reviewMapper.reviewToReviewResponse(response),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id") long reviewId){
        reviewService.deleteReview(reviewId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/{teacher-id}")
    public ResponseEntity getReview(
            @PathVariable("teacher-id") long teacherId,
            @Positive @RequestParam int page,
            @Positive @RequestParam int size,
            @RequestParam String arrange
            ) {
        Page<Review> reviews = reviewService.findByTeacherId(page-1,size,arrange,teacherId);
        List<Review> list = reviews.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(reviewMapper.reviewToReviewResponses(list), reviews),
                HttpStatus.OK);
    }

}
