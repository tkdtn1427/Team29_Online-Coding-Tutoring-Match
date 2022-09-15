package Team049.Iguwana.MainProject.PrimaryEntity.review.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.review.dto.ReviewDto;
import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
import Team049.Iguwana.MainProject.PrimaryEntity.review.mapper.ReviewMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/reivews")
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
        reviewService.createReview(review);
        return new ResponseEntity(HttpStatus.CREATED);
    }

//    @PatchMapping("/update/{review-id}")
//    public ResponseEntity updateReview(@PathVariable("review-id") long reviewId,
//                                       @RequestBody )
}
