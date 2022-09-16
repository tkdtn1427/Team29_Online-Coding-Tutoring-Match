package Team049.Iguwana.MainProject.PrimaryEntity.teacher.dto;

import Team049.Iguwana.MainProject.PrimaryEntity.review.dto.ReviewDto;
import Team049.Iguwana.MainProject.PrimaryEntity.review.entity.Review;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.SkillTable;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.dto.TutoringDto;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.entity.Tutoring;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

public class TeacherDto {
    @Getter
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class Join {

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String name;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        @NotBlank
        @Email
        private String email;

        private String career;

        private String aboutMe;

        private String nickName;

    }

    @Getter
    @Setter
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class Patch {

        private long teacherId;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String name;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        private String career;

        private String aboutMe;

        private String nickName;

        private List<SkillList> skillTableList;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class Response {
        private long teacherId;

        private String name;

        private String email;
        //double형으로 변경
        private double reputation;

        private String career;

        private String aboutMe;

        private String nickName;

        private List<SkillResponse> skillTableList;

        private List<TutoringDto.Response> tutoringList;

        private List<ReviewDto.Response> reviewList;
        //count 추가
        private int count;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class SkillList {

        private String name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class SkillResponse {

        private long skillId;

        private String name;

        private String color;
    }
}
