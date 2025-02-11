import { successResponse , errorResponse } from '../types/apiResponse'

export const success = <T>(data: T, message: string = 'Success'): successResponse<T> => ({
    status: 'success',
    success: true,
    message,
    data
})

export const errors = (message: string): errorResponse => ({
    status: 'error',
    success: false,
    message
})