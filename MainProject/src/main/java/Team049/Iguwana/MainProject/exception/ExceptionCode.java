package Team049.Iguwana.MainProject.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    TEMP_NOT_FOUND(404, "temp exception Code"),

    SKILL_EXISTS(409,"skill is exists"),

    SKILL_NOT_FOUND(404, "skill not found"),
    CODE_NOT_FOUND(404, "Code not found"),
    IMAGE_EXISTS(409, "image is exists"),
    IMAGE_NOT_FOUND(404, "image not found"),
    IMAGE_CHECK(404, "image not include"),
    REVIEW_NOT_FOUND(404, "Review not found"),
    STUDENT_ALREADY_EXISTS(409, "Student already exists"),
    EMAIL_EXISTS(409, "Email is exists"),
    STUDENT_NOT_FOUND(404, "Student not found"),
    TEACHER_NOT_FOUND(404, "Teacher not found"),
    TUTORING_NOT_FOUND(404, "Tutoring not found"),
    REFRESH_NOT_EQUAL(403, "Refresh token not equal"),
    RERFRSH_EXPIRED(403, "Please login again"),
    LOGIN_FAILURE(404, "User or Password not wrong"),
    PASSWORD_EXCEPTION(400, "Password length wrong(password.length > 4)");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
