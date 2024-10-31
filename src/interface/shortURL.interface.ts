import {
  ShortUrlCreateDto,
  ShortUrlDeleteDto,
  ShortUrlStatistics,
  ShortUrlUpdateDto,
} from "../repository/shortURL/dto/shortURL.dto";

export interface IStatus {
  status: number;
  message: any;
}

export interface IShortURL {
  create(data: ShortUrlCreateDto): Promise<IStatus>;
  delete(data: ShortUrlDeleteDto): Promise<IStatus>;
  findAll(): Promise<IStatus>;
  updateOne(data: ShortUrlUpdateDto): Promise<IStatus>;
  findOneStatistics(data: ShortUrlStatistics): Promise<IStatus>;
}
