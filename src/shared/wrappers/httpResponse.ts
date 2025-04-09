import { HttpResponse } from '@shared/types/httpResponse'

export const successResponse = <T>(message: string, data?: T): HttpResponse<T> => ({
  success: true,
  message,
  ...(data !== undefined && { data }),
})

export const errorResponse = (message: string, detail?: string): HttpResponse => ({
  success: false,
  message,
  ...(detail !== undefined && { detail }),
})

export const warningResponse = <T>(message: string, data?: T): HttpResponse<T | null> => ({
  success: true,
  message,
  data: data ?? null,
})
