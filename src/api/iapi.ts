export interface IApi {
  server(port: number): void;
}

export interface IApiOptions {
  getRotes(): void;
}
