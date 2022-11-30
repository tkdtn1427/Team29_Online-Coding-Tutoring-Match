package Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.dto;

import Team049.Iguwana.MainProject.PrimaryEntity.student.dto.StudentDto;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.dto.TutoringDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

public class JwtTokenDto {
    @Getter
    @AllArgsConstructor
    public static class Refresh {
        @NotNull(message = "UserId can't blank")
        private long userId;

        @NotBlank(message = "Role can't blank")
        private String role;

        @NotBlank(message = "RefreshToken can't blank")
        private String refreshToken;
    }
}
