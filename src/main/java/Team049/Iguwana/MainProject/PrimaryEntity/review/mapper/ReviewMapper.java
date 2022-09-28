package Team049.Iguwana.MainProject.PrimaryEntity.review.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.review.dto.ReviewDto;
import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    default Review reviewRegisterToReview(ReviewDto.Register requestBody){
        Review review = new Review();
        Teacher teacher = new Teacher();
        teacher.setTeacherId(requestBody.getTeacherId());

        review.setTeacher(teacher);
        review.setContent(requestBody.getContent());
        review.setStudentId(requestBody.getStudentId());
        review.setReputation(requestBody.getReputation());
        review.setTutoringId(requestBody.getTutoringId());

        return review;
    }

    Review reviewPatchToReview(ReviewDto.Patch requestBody);

    @Mapping(target = "teacherId", expression = "java(review.getTeacher().getTeacherId())")
    ReviewDto.Response reviewToReviewResponse(Review review);

    //아래 코드 추가 -도윤
    List<ReviewDto.Response> reviewToReviewResponses(List<Review> reviews);
}
