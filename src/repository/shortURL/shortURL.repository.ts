import { IShortURL, IStatus } from "../../interface/shortURL.interface";
import { PrismaClient } from "@prisma/client";
import {
  ShortUrlCreateDto,
  ShortUrlDeleteDto,
  ShortUrlStatistics,
  ShortUrlUpdateDto,
} from "./dto/shortURL.dto";
const shortId = require("shortid");

export default class ShortURLRepository implements IShortURL {
  private constructor(private prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new ShortURLRepository(prisma);
  }

  private async verifyURL(shortCode: string): Promise<boolean> {
    const res = await this.prisma.shortURL.findUnique({
      where: {
        shortCode,
      },
    });

    if (res?.shortCode === shortCode) {
      return true;
    }

    return false;
  }

  public async create(data: ShortUrlCreateDto): Promise<IStatus> {
    const { url } = data;
    const shortCode = shortId.generate();
    const res = await this.verifyURL(shortCode);

    if (res === true) {
      return { status: 404, message: "Error" };
    }

    return await this.prisma.shortURL
      .create({
        data: {
          url,
          shortCode,
        },
      })
      .then(() => {
        return { status: 201, message: "Create Short URL" };
      })
      .catch((error) => {
        return { status: 404, message: error };
      });
  }

  public async delete(data: ShortUrlDeleteDto): Promise<IStatus> {
    const { shortCode } = data;
    const res = await this.verifyURL(shortCode);

    if (res === true) {
      return await this.prisma.shortURL
        .delete({
          where: {
            shortCode,
          },
        })
        .then(() => {
          return { status: 200, message: "Delete Short URL" };
        })
        .catch((error) => {
          return { status: 400, message: error };
        });
    }

    return { status: 400, message: "Erro ao deletar URL" };
  }

  public async findAll(): Promise<IStatus> {
    return await this.prisma.shortURL
      .findMany()
      .then(async (data) => {
        return { status: 200, message: data };
      })
      .catch((error) => {
        return { status: 400, message: error };
      });
  }

  public async updateOne(data: ShortUrlUpdateDto): Promise<IStatus> {
    const { url, shortCode } = data;
    const res = await this.verifyURL(shortCode);

    if (res === true) {
      return await this.prisma.shortURL
        .update({
          where: {
            shortCode,
          },
          data: {
            url,
          },
        })
        .then(() => {
          return { status: 200, message: "Update Short URL" };
        })
        .catch((error) => {
          return { status: 400, message: error };
        });
    }

    return { status: 400, message: "Short URL nao existe" };
  }

  public async findOneStatistics(data: ShortUrlStatistics): Promise<IStatus> {
    const { shortCode } = data;
    const res = await this.verifyURL(shortCode);

    if (res === true) {
      let data = await this.prisma.shortURL.findUnique({
        where: {
          shortCode,
        },
      });

      return await this.prisma.shortURL
        .update({
          where: {
            shortCode,
          },
          data: {
            accessCount: Number(data?.accessCount) + 1,
          },
        })
        .then((sucess) => {
          return { status: 200, message: sucess };
        })
        .catch((error) => {
          return { status: 400, message: error };
        });
    }

    return { status: 400, message: "Erro interno" };
  }
}
