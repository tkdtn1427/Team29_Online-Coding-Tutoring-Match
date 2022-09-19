/*
package Team049.Iguwana.MainProject.PrimaryEntity.s3.service;

import Team049.Iguwana.MainProject.PrimaryEntity.s3.entity.Images;
import Team049.Iguwana.MainProject.PrimaryEntity.s3.repository.ImagesRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.student.entity.Student;
import Team049.Iguwana.MainProject.PrimaryEntity.student.service.StudentService;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.entity.Teacher;
import Team049.Iguwana.MainProject.PrimaryEntity.teacher.service.TeacherService;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ImagesService {

    private final AmazonS3 amazonS3;
    private final ImagesRepository repository;

    private final TeacherService teacherService;

    private final StudentService studentService;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.dir}")
    private String dirName;

    public ImagesService(AmazonS3 amazonS3, ImagesRepository repository, TeacherService teacherService, StudentService studentService) {
        this.amazonS3 = amazonS3;
        this.repository = repository;
        this.teacherService = teacherService;
        this.studentService = studentService;

    }

    public Images upload(MultipartFile multipartFile, long memberId,String users) throws IOException {
        Object member = null;

        if (users.equals("teacher")) {
            member = teacherService.findVerfiedTeacher(memberId);
            if (!((Teacher) member).getImageUrl().equals("x")) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EXISTS);
            }
        }else{
            member = studentService.findVerfiedStudent(memberId);
            if (!((Student) member).getImageUrl().equals("x")) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EXISTS);
            }
        }

        Optional<File> file = Optional.ofNullable(convertMultipartFileToFile(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail")));
        Images image = upload(file.get(),users,memberId);

        repository.save(image);

        if (users.equals("teacher")) {
            ((Teacher) member).setImageUrl(image.getImagesKey());
        } else {
            ((Student) member).setImageUrl(image.getImagesKey());
        }

        return image;
    }

    private Images upload(File file,String users,long memberId) {
        String key = randomFileName(file);
        putS3(file, key);
        removeFile(file);
        Images image = new Images();
        image.setImagesKey(key);
        image.setUsers(users);
        image.setMemberId(memberId);
        return image;

    }

    private String randomFileName(File file) {
        return dirName + "/" + UUID.randomUUID() + file.getName();
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return getS3(bucket, fileName);
    }

    private String getS3(String bucket, String fileName) {
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private void removeFile(File file) {
        file.delete();
    }

    public Optional<File> convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        System.out.println(file.getName());
        if (file.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(file);
        }
        return Optional.empty();
    }

    public void remove(long memberId,String users) {
        Object member=null;
        String key = "";
        if (users.equals("teacher")) {
            member = teacherService.findVerfiedTeacher(memberId);
            if (((Teacher) member).getImageUrl().equals("x")) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND);
            }
            key = ((Teacher) member).getImageUrl();
        }else{
            member = studentService.findVerfiedStudent(memberId);
            if (((Student) member).getImageUrl().equals("x")) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND);
            }
            key = ((Student) member).getImageUrl();
        }

        if (!amazonS3.doesObjectExist(bucket,key)) {
            throw new AmazonS3Exception("Object " + key + " does not exist!");
        }
        amazonS3.deleteObject(bucket, key);
        if (users.equals("teacher")) {
            repository.delete(repository.findByKeys(((Teacher) member).getImageUrl()).get());
            ((Teacher) member).setImageUrl("x");
        }else{
            repository.delete(repository.findByKeys(((Student) member).getImageUrl()).get());
            ((Student) member).setImageUrl("x");
        }

    }

    public Images update(MultipartFile multipartFile, long memberId,String users) throws IOException {
        Object member=null;
        if (multipartFile == null) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_CHECK);
        }

        if(users.equals("teacher")) {
            member = teacherService.findVerfiedTeacher(memberId);
            if (((Teacher) member).getImageUrl().equals("x")) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND);
            }

        }else{
            member = studentService.findVerfiedStudent(memberId);
            if (((Student) member).getImageUrl().equals("x")) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND);
            }

        }


        remove(memberId,users);
        return upload(multipartFile, memberId,users);

    }

}
*/
