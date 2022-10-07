package Team049.Iguwana.MainProject.PrimaryEntity.chat.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private long studentId;

    @Column
    private long teacherId;

    @Column
    private String roomId;

    @Column
    private String roomName;
}
