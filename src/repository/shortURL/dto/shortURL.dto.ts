export class ShortUrlCreateDto {
  url!: string;
}

export class ShortUrlDeleteDto {
  shortCode!: string;
}

export class ShortUrlUpdateDto {
  url!: string;
  shortCode!: string;
}

export class ShortUrlStatistics {
  shortCode!: string;
}
