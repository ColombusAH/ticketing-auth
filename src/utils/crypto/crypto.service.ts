import { Injectable } from '@nestjs/common';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService {
  scriptAsync = promisify(scrypt);
  async hash(value: string) {
    const salt = randomBytes(32).toString('hex');
    const buffer = (await promisify(scrypt)(value, salt, 256)) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
  }
  async compare(savedPass: string, toCheckPass: string) {
    const [hashedPass, salt] = savedPass.split('.');
    const buffer = (await promisify(scrypt)(toCheckPass, salt, 256)) as Buffer;
    return buffer.toString('hex') === hashedPass;
  }
}
