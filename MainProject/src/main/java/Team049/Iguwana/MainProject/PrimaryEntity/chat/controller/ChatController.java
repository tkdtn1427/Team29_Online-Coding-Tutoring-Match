package Team049.Iguwana.MainProject.PrimaryEntity.chat.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatDto;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoom;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoomForm;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.repository.ChatRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/chat")
@Validated
public class ChatController {
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private StudentService studentService;
    @Autowired
    private TeacherService teacherService;

    @PostMapping("/room")
    public ResponseEntity createRoom(@RequestBody ChatRoomForm.Create create){
        Teacher teacher = teacherService.findVerfiedTeacher(create.getTeacherId());
        Student student = studentService.findVerfiedStudent(create.getStudentId());
        String roomName = student.getNickName()+"-"+teacher.getNickName();
        ChatRoom chatRoom = chatRepository.createChatRoom(create, roomName);
        ChatDto.roomResponse response = new ChatDto.roomResponse(chatRoom.getStudentId(), chatRoom.getTeacherId(), chatRoom.getRoomId());
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity findRooms(@RequestParam long userId, @RequestParam String role){
        ChatDto.ResponseDto responseDto = chatRepository.findByUser(role, userId);

        return new ResponseEntity(responseDto, HttpStatus.OK);
    }
}
