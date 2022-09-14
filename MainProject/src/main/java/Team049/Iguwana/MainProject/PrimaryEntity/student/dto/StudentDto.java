package Team049.Iguwana.MainProject.PrimaryEntity.student.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class StudentDto {
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
    }

    @Getter
    @Setter
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class Patch {
        private long studentId;

        private String aboutMe;

        private String nickName;
    }

    @Getter
    @Setter
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class Password {
        private long studentId;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long studentId;

        private String nickName;

        private String name;

        private String aboutMe;

        private String email;
    }
}
