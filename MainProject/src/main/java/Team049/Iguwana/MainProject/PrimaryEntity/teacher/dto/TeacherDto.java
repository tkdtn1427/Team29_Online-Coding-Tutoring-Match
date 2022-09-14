package Team049.Iguwana.MainProject.PrimaryEntity.teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

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

        private String nickName;

        private String aboutMe;

        private String career;
    }
}
