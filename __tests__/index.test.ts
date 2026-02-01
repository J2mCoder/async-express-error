import { Request, Response, NextFunction } from "express";
import asyncHandler from "../src/index";

describe("asyncHandler", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("quand la fonction asynchrone réussit", () => {
    it("devrait exécuter la fonction sans erreur", async () => {
      const asyncFn = jest.fn().mockResolvedValue(undefined);
      const wrappedHandler = asyncHandler(asyncFn);

      await wrappedHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(asyncFn).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("devrait permettre à la fonction de retourner une valeur", async () => {
      const result = { data: "test" };
      const asyncFn = jest.fn().mockResolvedValue(result);
      const wrappedHandler = asyncHandler(asyncFn);

      await wrappedHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(asyncFn).toHaveBeenCalled();
    });

    it("devrait gérer correctement les promesses résolues", async () => {
      let resolved = false;
      const asyncFn = async () => {
        await Promise.resolve();
        resolved = true;
      };
      const wrappedHandler = asyncHandler(asyncFn);

      await wrappedHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(resolved).toBe(true);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("quand la fonction asynchrone échoue", () => {
    it("devrait appeler next() avec l'erreur en cas de rejet", async () => {
      const error = new Error("Test error");
      const asyncFn = jest.fn().mockRejectedValue(error);
      const wrappedHandler = asyncHandler(asyncFn);

      await wrappedHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockNext).toHaveBeenCalledTimes(1);
    });

    it("devrait gérer les erreurs synchrones dans une fonction async", async () => {
      const error = new Error("Sync error in async");
      const asyncFn = jest.fn().mockImplementation(async () => {
        throw error;
      });
      const wrappedHandler = asyncHandler(asyncFn);

      await wrappedHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("devrait transmettre différents types d'erreurs", async () => {
      const errors = [
        new Error("Standard error"),
        new TypeError("Type error"),
        new RangeError("Range error"),
        { message: "Object error" },
        "String error",
        42,
      ];

      for (const error of errors) {
        mockNext.mockClear();
        const asyncFn = jest.fn().mockRejectedValue(error);
        const wrappedHandler = asyncHandler(asyncFn);

        await wrappedHandler(
          mockReq as Request,
          mockRes as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(error);
      }
    });
  });

  describe("gestion des arguments", () => {
    it("devrait passer tous les arguments à la fonction", async () => {
      const asyncFn = jest.fn().mockResolvedValue(undefined);
      const wrappedHandler = asyncHandler(asyncFn);
      const customReq = { body: { test: "data" } } as unknown as Request;
      const customRes = { locals: {} } as unknown as Response;

      await wrappedHandler(customReq, customRes, mockNext);

      expect(asyncFn).toHaveBeenCalledWith(customReq, customRes, mockNext);
    });
  });

  describe("types génériques", () => {
    it("devrait accepter des fonctions avec types Express", async () => {
      const asyncFn = async (req: Request, res: Response) => {
        const _id = req.params.id;
        const _name = req.body.name;
        res.json({ success: true });
      };

      const wrappedHandler = asyncHandler(asyncFn);

      // Cela devrait compiler sans erreur
      expect(typeof wrappedHandler).toBe("function");
    });
  });

  describe("scénarios Edge Cases", () => {
    it("devrait gérer les fonctions retournant null", async () => {
      const asyncFn = jest.fn().mockResolvedValue(null);
      const wrappedHandler = asyncHandler(asyncFn);

      await wrappedHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).not.toHaveBeenCalled();
    });

    it("devrait gérer les fonctions retournant undefined", async () => {
      const asyncFn = jest.fn().mockResolvedValue(undefined);
      const wrappedHandler = asyncHandler(asyncFn);

      await wrappedHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).not.toHaveBeenCalled();
    });

    it("devrait gérer les fonctions vides", async () => {
      const asyncFn = jest.fn().mockResolvedValue(undefined);
      const wrappedHandler = asyncHandler(asyncFn);

      await wrappedHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(asyncFn).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
