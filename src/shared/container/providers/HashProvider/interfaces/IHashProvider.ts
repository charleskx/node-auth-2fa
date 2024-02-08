export interface IHashProvider {
  compare(s: string, hash: string): Promise<boolean>
  hash(s: string, salt: number): Promise<string>
}
