package Team049.Iguwana.MainProject.PrimaryEntity.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
public class ChatRoomForm {
    @Getter
    @Setter
    @AllArgsConstructor // TODO 테스트를 위해 추가됨
    public static class Create {
        @NotBlank
        private long studentId;
        @NotBlank
        private long teacherId;
        private String roomName;
    }
}
