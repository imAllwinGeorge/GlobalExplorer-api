export interface IQrServices {
  qrGenerate(data: string): Promise<string>;
}
