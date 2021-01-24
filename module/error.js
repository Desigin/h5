class BaseModel extends Error {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) this.data = data;
        if (message) this.message = message;
    }
}

export class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.code = 200;
    }
}

export class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.code = 201;
    }
}