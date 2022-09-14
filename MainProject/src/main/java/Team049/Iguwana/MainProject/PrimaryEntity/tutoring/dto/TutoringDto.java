package Team049.Iguwana.MainProject.PrimaryEntity.tutoring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class TutoringDto {
    @Getter
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class Register {
        @NotBlank(message = "TeacherId can't blank.")
        private long teacherId;

        @NotBlank(message = "StudentId can't blank.")
        private long studentId;

        @NotBlank(message = "subject cna't blank")
        private String subject;

        private String content;

        private String start_pd;

        private String end_pd;
    }
}
