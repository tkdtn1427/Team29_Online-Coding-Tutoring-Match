package Team049.Iguwana.MainProject.PrimaryEntity.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class ReviewDto {
    @Getter
    @AllArgsConstructor
    public static class Register {

        @NotNull(message = "teacherId can't black")
        private long teacherId;

        @NotNull(message = "studentId can't black")
        private long studentId;

        @NotEmpty(message = "studentId can't black")
        private String content;

        @NotNull(message = "studentId can't black")
        private long reputation;
    }
}
