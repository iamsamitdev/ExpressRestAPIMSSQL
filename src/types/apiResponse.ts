export interface successResponse<T> {
    status: "success",
    success: true,
    message: string,
    data: T
}

export interface errorResponse {
    status: "error",
    success: false,
    message: string
}