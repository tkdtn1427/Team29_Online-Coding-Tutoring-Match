package Team049.Iguwana.MainProject.PrimaryEntity.student.dto;

import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.dto.TutoringDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

public class StudentDto {
    @Getter
    @AllArgsConstructor
    public static class Join {

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String name;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        @NotBlank
        @Email
        private String email;

        private String nickName;

        private String aboutMe;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long studentId;

        private String aboutMe;

        private String nickName;

        private List<SkillList> skillTableList;

        private String password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long studentId;

        private String nickName;

        private String name;

        private String aboutMe;

        private String email;

        private List<TutoringDto.Response> tutoringList;

        private String imageUrl;

        private String code;

        private List<SkillResponse> skillResponseList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SkillList {

        private String name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SkillResponse {

        private long skillId;

        private String name;

        private String color;

    }
}
