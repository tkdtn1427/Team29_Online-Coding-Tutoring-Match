package Team049.Iguwana.MainProject.PrimaryEntity.chat.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class ChatDto {
    @Getter
    @Setter
    public static class ResponseDto<T>{
        private List<T> roomDtoList;
    }

    @Getter
    @Setter
    public static class SRoomDto{
        private String roomId;
        private long teahcerId;
        private String roomName;
    }

    @Getter
    @Setter
    public static class TRoomDto{
        private String roomId;
        private long studentId;
        private String roomName;
    }
}
