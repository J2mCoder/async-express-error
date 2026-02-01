import { Request, Response, NextFunction } from "express";

/**
 * Type pour une fonction handler Express asynchrone
 */
export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | Promise<unknown>;

/**
 * Enveloppe une fonction asynchrone pour gérer les erreurs de manière centralisée.
 * Capture les erreurs et les transmet au middleware next() d'Express.
 *
 * @param fn - La fonction asynchrone à envelopper
 * @returns Une fonction enveloppée qui gère les erreurs automatiquement
 *
 * @example
 * ```typescript
 * import express from "express";
 * import asyncHandler from "async-express-error";
 *
 * const app = express();
 *
 * app.get(
 *   "/users/:id",
 *   asyncHandler(async (req, res) => {
 *     const user = await getUserById(req.params.id);
 *     res.json(user);
 *   })
 * );
 * ```
 */
function asyncHandler(
  fn: AsyncRequestHandler
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncHandler;
export { asyncHandler };
