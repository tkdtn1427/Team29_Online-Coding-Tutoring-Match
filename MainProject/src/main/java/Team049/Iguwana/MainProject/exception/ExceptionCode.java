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
    IMAGE_CHECK(404, "image not include");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
