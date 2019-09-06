import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    if (filePath && filePath.includes('production')) {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync('development.env'));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
