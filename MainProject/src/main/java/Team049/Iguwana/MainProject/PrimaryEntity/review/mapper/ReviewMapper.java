package Team049.Iguwana.MainProject.PrimaryEntity.review.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.review.dto.ReviewDto;
import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
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

    default List<ReviewDto.Response> reviewToReviewResponses(List<Review> reviews, StudentService studentService){
        List<ReviewDto.Response> responses = new ArrayList<>();
        for(Review review : reviews){
            Student student = studentService.findVerfiedStudent(review.getStudentId());
            ReviewDto.Response tmp = new ReviewDto.Response();
            tmp.setReviewId(review.getReviewId());
            tmp.setTeacherId(review.getTeacher().getTeacherId());
            tmp.setTutoringId(review.getTutoringId());
            tmp.setStudentId(review.getStudentId());
            tmp.setContent(review.getContent());
            tmp.setReputation(review.getReputation());
            tmp.setNickName(student.getNickName());
            tmp.setImage(student.getImageUrl());
            tmp.setDate(review.getDate());
            responses.add(tmp);
        }
        return responses;
    }
}
