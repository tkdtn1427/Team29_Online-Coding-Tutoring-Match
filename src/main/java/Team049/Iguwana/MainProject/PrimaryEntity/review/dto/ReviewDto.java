package Team049.Iguwana.MainProject.PrimaryEntity.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

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

        @NotNull(message = "tutoringId can't black")
        private long tutoringId;

        @NotEmpty(message = "content can't black")
        private String content;

        @NotNull(message = "reputation can't black")
        private double reputation;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        @NotNull(message = "reviewId can't black")
        private long reviewId;

        @NotEmpty(message = "content can't black")
        private String content;

        @NotNull(message = "reputation can't black")
        private double reputation;

        private boolean checking;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private long reviewId;

        private long teacherId;

        private long tutoringId;

        private long studentId;

        private String content;

        private double reputation;

        private LocalDate date;
    }
}
