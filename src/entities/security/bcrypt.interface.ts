export interface IBcrypt {
  hash(password: string): Promise<string>;
  compare(current: string, original: string): Promise<boolean>;
}
