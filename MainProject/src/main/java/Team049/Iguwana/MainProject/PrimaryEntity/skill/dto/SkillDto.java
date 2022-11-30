package Team049.Iguwana.MainProject.PrimaryEntity.skill.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class SkillDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    public static class Post {
        @NotBlank(message="공백이 아니여야 합니다.")
        private String name;
        @NotBlank(message="공백이 아니여야 합니다.")
        private String color;
    }


    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    public static class Response {
        private long skillId;

        @NotBlank(message="공백이 아니여야 합니다.")
        private String name;

        private String color;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    public static class CountResponse {
        private long skillId;

        @NotBlank(message="공백이 아니여야 합니다.")
        private String name;

        private Long count;

        private String color;

    }
}
