import { IApi, IApiOptions } from "../iapi";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";
const expressListEndpoints = require("express-list-endpoints");

export default class ApiExpress implements IApi, IApiOptions {
  private constructor(private app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        legacyHeaders: false,
      })
    );
    dotenv.config();
    app.use(morgan("dev"));

    return new ApiExpress(app);
  }

  public getAdd(path: string, handler: (req: Request, res: Response) => void) {
    this.app.get(path, handler);
  }

  public putAdd(path: string, handler: (req: Request, res: Response) => void) {
    this.app.put(path, handler);
  }

  public deleteAdd(
    path: string,
    handler: (req: Request, res: Response) => void
  ) {
    this.app.delete(path, handler);
  }

  public postAdd(path: string, handler: (req: Request, res: Response) => void) {
    this.app.post(path, handler);
  }

  server(port: number): void {
    this.app.listen(process.env["PORTA"] || port, () => {
      console.log(
        `Servidor funcionando na porta: ` + process.env["PORTA"] || port
      );
    });
  }

  getRotes(): void {
    const allEndpoints = expressListEndpoints(this.app);
    console.log(allEndpoints);
  }
}
