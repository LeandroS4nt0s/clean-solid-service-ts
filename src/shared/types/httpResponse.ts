export type HttpResponse<T = unknown> = {
  success: boolean
  message: string
  data?: T
  detail?: string
}
