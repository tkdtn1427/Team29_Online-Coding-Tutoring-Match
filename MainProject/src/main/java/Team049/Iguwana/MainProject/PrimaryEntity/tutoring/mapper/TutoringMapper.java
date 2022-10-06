package Team049.Iguwana.MainProject.PrimaryEntity.tutoring.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.dto.TutoringDto;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.entity.Tutoring;
import org.mapstruct.Mapper;

import java.util.*;

@Mapper(componentModel = "spring")
public interface TutoringMapper {
    default Tutoring tutoringRegisterToTutoring(TutoringDto.Register requestBody){
        Tutoring tutoring = new Tutoring();
        tutoring.setStart_pd(requestBody.getStart_pd());
        tutoring.setEnd_pd(requestBody.getEnd_pd());
        tutoring.setContent(requestBody.getContent());
        tutoring.setSubject(requestBody.getSubject());
        List<Map<String, Object>> map = requestBody.getTime();
        StringBuilder sb = new StringBuilder("");
        if(!map.get(0).keySet().isEmpty()){
            for(String str : map.get(0).keySet()){
                sb.append(str+":"+map.get(0).get(str)+"\n");
            }
            sb.replace(sb.length()-1,sb.length(),"");
        }
        tutoring.setTime(sb.toString());
        return tutoring;
    }
    default Tutoring tutoringPatchToTutoring(TutoringDto.Patch requestBody){
        Tutoring tutoring = new Tutoring();
        tutoring.setTutoringId(requestBody.getTutoringId());
        tutoring.setStart_pd(requestBody.getStart_pd());
        tutoring.setEnd_pd(requestBody.getEnd_pd());
        tutoring.setContent(requestBody.getContent());
        tutoring.setSubject(requestBody.getSubject());
        List<Map<String, Object>> map = requestBody.getTime();
        StringBuilder sb = new StringBuilder("");
        if(!map.get(0).keySet().isEmpty()){
            for(String str : map.get(0).keySet()){
                sb.append(str+":"+map.get(0).get(str)+"\n");
            }
            sb.replace(sb.length()-1,sb.length(),"");
        }
        tutoring.setTime(sb.toString());
        return tutoring;
    }

    default TutoringDto.Response tutoringToTutoringResponse(Tutoring requestBody){
        TutoringDto.Response response = new TutoringDto.Response();
//        StringBuilder sbS = new StringBuilder("#");
//        StringBuilder sbT = new StringBuilder("#");
//        int lenStudent = String.valueOf(requestBody.getStudent().getStudentId()).length();
//        int lenTeacher = String.valueOf(requestBody.getTeacher().getTeacherId()).length();
//        for(int i=0; i<4-lenStudent; i++) sbS.append("0");
//        sbS.append(requestBody.getStudent().getStudentId());
//        for(int i=0; i<4-lenTeacher; i++) sbT.append("0");
//        sbT.append(requestBody.getTeacher().getTeacherId());
        response.setStudentId(userIdToCode(requestBody.getStudent().getStudentId(),"student"));
        response.setTeacherId(userIdToCode(requestBody.getTeacher().getTeacherId(),"teacher"));
        response.setTutoringId(requestBody.getTutoringId());
        response.setSubject(requestBody.getSubject());
        response.setContent(requestBody.getContent());
        response.setStart_pd(requestBody.getStart_pd());
        response.setEnd_pd(requestBody.getEnd_pd());
        List<Map<String, Object>> timeSet = new ArrayList<>();
        timeSet.add(new HashMap<>());
        String str = requestBody.getTime();
        StringTokenizer st = new StringTokenizer(str,"\n");
        while (st.hasMoreTokens()){
            String perTime = st.nextToken();
            StringTokenizer st_ = new StringTokenizer(perTime, ":");
            timeSet.get(0).put(st_.nextToken(), st_.nextToken()+":"+st_.nextToken()+":"+st_.nextToken());
        }
        response.setTime(timeSet);

        return response;
    }

    default String userIdToCode(long userId, String find){
        StringBuilder sb;
        if(find.equals("student")) sb = new StringBuilder("#");
        else sb = new StringBuilder("@");
        int len = String.valueOf(userId).length();
        for(int i=0; i<4-len; i++) sb.append("0");
        sb.append(userId);
        return sb.toString();
    }
}
