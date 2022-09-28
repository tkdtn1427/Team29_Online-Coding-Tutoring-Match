package Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.dto.JwtTokenDto;
import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.entity.JwtToken;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface JwtTokenMapper {
    JwtToken jwtTokenRefreshToJwtToken(JwtTokenDto.Refresh requestBody);
}
