import { Request, Response, NextFunction, RequestHandler } from 'express'

export const asyncHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}
