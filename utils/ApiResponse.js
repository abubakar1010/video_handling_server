class ApiResponse{
    constructor(statusCode, data, message){
        this.statusCode = statusCode,
        this.message= message,
        this.data= data,
        this.success= statusCode
    }
}

export default ApiResponse