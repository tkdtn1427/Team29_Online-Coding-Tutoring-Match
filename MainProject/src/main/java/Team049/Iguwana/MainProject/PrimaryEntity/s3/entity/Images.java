package Team049.Iguwana.MainProject.PrimaryEntity.s3.entity;


import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ImagesId;

    private String imagesKey;

    private long memberId;

    private String users;

}