package Team049.Iguwana.MainProject.PrimaryEntity.chat.repository;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoom;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoomForm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

@Repository
public class ChatRepository {
    private Map<String, ChatRoom> chatRooms;
    private Map<Long, String> studentRooms;
    private Map<Long, String> teacherRooms;

    private Set<OneToOneRoom> oneToOneRooms;

    @PostConstruct
    private void init(){
        chatRooms = new LinkedHashMap<>();
        studentRooms = new LinkedHashMap<>();
        teacherRooms = new LinkedHashMap<>();
        oneToOneRooms = new HashSet<>();
    }

    public ChatRoom findById(String roomId){
        return chatRooms.get(roomId);
    }

    public ChatRoom createChatRoom(ChatRoomForm.Create create){
        String chatRoomId = verifiedRooms(create.getStudentId(), create.getStudentId());
        ChatRoom chatRoom;
        if(chatRoomId == null){
            chatRoom = ChatRoom.create(create.getRoomName());
            chatRooms.put(chatRoom.getRoomId(), chatRoom);
            studentRooms.put(create.getStudentId(), chatRoom.getRoomId());
            teacherRooms.put(create.getTeacherId(), chatRoom.getRoomId());
            oneToOneRooms.add(new OneToOneRoom(create.getStudentId(), create.getTeacherId(), chatRoom.getRoomId()));
        }else{
            chatRoom = findById(chatRoomId);
        }

        return chatRoom;
    }

    public Map<Long, String> getUserRooms(String role){
        if(role.equals("student")){
            return studentRooms;
        }else{
            return teacherRooms;
        }
    }

    public String verifiedRooms(long studentId, long teacherId){
        for(OneToOneRoom oneToOneRoom : oneToOneRooms){
            if(oneToOneRoom.getStudentId() == studentId && oneToOneRoom.getTeacherId() == teacherId) return oneToOneRoom.getRoomId();
        }
        return null;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    static class OneToOneRoom{
        private long studentId;
        private long teacherId;
        private String roomId;
    }
}
