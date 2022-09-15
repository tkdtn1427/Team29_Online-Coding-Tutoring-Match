package Team049.Iguwana.MainProject.PrimaryEntity.tutoring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class TutoringDto {
    @Getter
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class Register {
        @NotNull(message = "TeacherId can't blank.")
        private Long teacherId;

        @NotNull(message = "StudentId can't blank.")
        private Long studentId;

        @NotBlank(message = "subject can't blank")
        private String subject;

        private String content;

        private LocalDate start_pd;

        private LocalDate end_pd;

        private List<Map<String, Object>> time;
    }

    @Getter
    @Setter
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class Patch {
        private long tutoringId;

        private String subject;

        private String content;

        private LocalDate start_pd;

        private LocalDate end_pd;

        private List<Map<String, Object>> time;
    }

    @Getter
    @Setter
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    @NoArgsConstructor
    public static class Response {
        private long tutoringId;

        private long teacherId;

        private long studentId;

        private String subject;

        private String content;

        private LocalDate start_pd;

        private LocalDate end_pd;

        private List<Map<String, Object>> time;
    }
}
