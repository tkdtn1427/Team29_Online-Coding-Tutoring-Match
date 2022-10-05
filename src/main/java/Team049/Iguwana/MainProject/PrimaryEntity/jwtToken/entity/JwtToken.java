package Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long jwtTokenId;

    @Column(columnDefinition = "Text")
    private String accessToken;

    @Column(columnDefinition = "Text")
    private String refreshToken;

    @Column
    private String role;

    @Column
    private long userId;
}
