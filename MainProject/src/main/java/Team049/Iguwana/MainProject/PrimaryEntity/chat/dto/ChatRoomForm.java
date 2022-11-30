package Team049.Iguwana.MainProject.PrimaryEntity.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
public class ChatRoomForm {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Create {
        @NotBlank
        private long studentId;
        @NotBlank
        private long teacherId;
        private String roomName;
    }
}
