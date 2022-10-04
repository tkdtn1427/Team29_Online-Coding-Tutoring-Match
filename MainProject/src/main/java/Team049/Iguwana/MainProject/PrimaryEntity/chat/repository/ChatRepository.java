package Team049.Iguwana.MainProject.PrimaryEntity.chat.repository;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatDto;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoom;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoomForm;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.entity.Room;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.service.RoomService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
@Slf4j
public class ChatRepository {
    private Map<String, ChatRoom> chatRooms;
    private Map<Long, Set<String>> studentRooms;
    private Map<Long, Set<String>> teacherRooms;
    private Set<OneToOneRoom> oneToOneRooms;
    @Autowired
    private RoomService roomService;

    @PostConstruct
    private void init(){
        chatRooms = new LinkedHashMap<>();
        studentRooms = new LinkedHashMap<>();
        teacherRooms = new LinkedHashMap<>();
        oneToOneRooms = new HashSet<>();

        List<Room> findRooms = roomService.findAll();
        loadRooms(findRooms);
    }

    public ChatRoom findById(String roomId){
        return chatRooms.get(roomId);
    }

    public ChatRoom createChatRoom(ChatRoomForm.Create create){
        String chatRoomId = verifiedRooms(create.getStudentId(), create.getTeacherId());
        ChatRoom chatRoom;
        if(chatRoomId == null){
            chatRoom = ChatRoom.create(create);
            chatRooms.put(chatRoom.getRoomId(), chatRoom);
            if(studentRooms.get(create.getStudentId()) == null){
                studentRooms.put(create.getStudentId(), new HashSet<>());
                studentRooms.get(create.getStudentId()).add(chatRoom.getRoomId());
            }else{
                studentRooms.get(create.getStudentId()).add(chatRoom.getRoomId());
            }

            if(teacherRooms.get(create.getTeacherId()) == null){
                teacherRooms.put(create.getTeacherId(), new HashSet<>());
                teacherRooms.get(create.getTeacherId()).add(chatRoom.getRoomId());
            }else{
                teacherRooms.get(create.getTeacherId()).add(chatRoom.getRoomId());
            }
            oneToOneRooms.add(new OneToOneRoom(create.getStudentId(), create.getTeacherId(), chatRoom.getRoomId()));
            // 저장
            roomService.saveRoom(chatRoom.getStudentId(), chatRoom.getTeacherId(), chatRoom.getRoomId(), chatRoom.getRoomName());

        }else{
            chatRoom = findById(chatRoomId);
        }

        return chatRoom;
    }

    public void loadRooms(List<Room> rooms){
        for(Room room : rooms){
            ChatRoom chatRoom = ChatRoom.load(room);
            chatRooms.put(chatRoom.getRoomId(), chatRoom);
            if(studentRooms.get(room.getStudentId()) == null){
                studentRooms.put(room.getStudentId(), new HashSet<>());
                studentRooms.get(room.getStudentId()).add(chatRoom.getRoomId());
            }else{
                studentRooms.get(room.getStudentId()).add(chatRoom.getRoomId());
            }

            if(teacherRooms.get(room.getTeacherId()) == null){
                teacherRooms.put(room.getTeacherId(), new HashSet<>());
                teacherRooms.get(room.getTeacherId()).add(chatRoom.getRoomId());
            }else{
                teacherRooms.get(room.getTeacherId()).add(chatRoom.getRoomId());
            }
            oneToOneRooms.add(new OneToOneRoom(room.getStudentId(), room.getTeacherId(), room.getRoomId()));
        }
    }

    public Set<String> getUserRooms(String role, long userId){
        if(role.equals("student")){
            return studentRooms.get(userId);
        }else{
            return teacherRooms.get(userId);
        }
    }

    public String verifiedRooms(long studentId, long teacherId){
        for(OneToOneRoom oneToOneRoom : oneToOneRooms){
            if(oneToOneRoom.getStudentId() == studentId && oneToOneRoom.getTeacherId() == teacherId){
                System.out.println("룸아이디 찾음");
                System.out.println(oneToOneRoom.getTeacherId());
                System.out.println(teacherId);
                return oneToOneRoom.getRoomId();
            }
        }
        return null;
    }

    public void findOneToOneRoom(String roomId){
        for(OneToOneRoom oneToOneRoom : oneToOneRooms){
            if(oneToOneRoom.getRoomId().equals(roomId)) oneToOneRooms.remove(oneToOneRoom);
        }
    }

    public ChatDto.ResponseDto findByUser(String role, long userId){
        ChatDto.ResponseDto responseDto = new ChatDto.ResponseDto();
        if(role.equals("student")){
            Set<String> sets = studentRooms.get(userId);
            List<ChatDto.SRoomDto> dtos = new ArrayList<>();
            for(String str : sets){
                ChatRoom chatRoom = chatRooms.get(str);
                ChatDto.SRoomDto dto = new ChatDto.SRoomDto();
                dto.setRoomName(chatRoom.getRoomName());
                dto.setTeacherId(chatRoom.getTeacherId());
                dto.setRoomId(chatRoom.getRoomId());
                dtos.add(dto);
            }
            responseDto.setRoomDtoList(dtos);
        }else{
            Set<String> sets = teacherRooms.get(userId);
            List<ChatDto.TRoomDto> dtos = new ArrayList<>();
            for(String str : sets){
                ChatRoom chatRoom = chatRooms.get(str);
                ChatDto.TRoomDto dto = new ChatDto.TRoomDto();
                dto.setRoomName(chatRoom.getRoomName());
                dto.setStudentId(chatRoom.getStudentId());
                dto.setRoomId(chatRoom.getRoomId());
                dtos.add(dto);
            }
            responseDto.setRoomDtoList(dtos);
        }
        return responseDto;
    }

    public void deleteRoom(String roomId){
        chatRooms.remove(roomId);
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
