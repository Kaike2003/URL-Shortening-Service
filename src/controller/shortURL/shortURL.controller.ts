import { Request, Response } from "express";
import ShortURLRepository from "../../repository/shortURL/shortURL.repository";
import { prisma } from "../../prisma/prisma";

export default class ShortURLController {
  private constructor() {}

  public static build() {
    return new ShortURLController();
  }

  public async create(req: Request, res: Response) {
    const { url } = req.body;
    const repository = ShortURLRepository.build(prisma);
    const { status, message } = await repository.create({
      url: url,
    });
    res.status(status).json(message);
  }

  public async delete(req: Request, res: Response) {
    const { shortCode } = req.params;
    const repository = ShortURLRepository.build(prisma);
    const { status, message } = await repository.delete({
      shortCode: shortCode,
    });
    res.status(status).json(message);
  }

  public async findAll(req: Request, res: Response) {
    const repository = ShortURLRepository.build(prisma);
    const { status, message } = await repository.findAll();
    res.status(status).json(message);
  }

  public async updateOne(req: Request, res: Response) {
    const { shortCode } = req.params;
    const { url } = req.body;
    const repository = ShortURLRepository.build(prisma);
    const { status, message } = await repository.updateOne({
      url: url,
      shortCode: shortCode,
    });
    res.status(status).json(message);
  }

  public async findOneStatistics(req: Request, res: Response) {
    const { shortCode } = req.params;
    const repository = ShortURLRepository.build(prisma);
    const { status, message } = await repository.findOneStatistics({
      shortCode: shortCode,
    });
    res.status(status).json(message);
  }
}
