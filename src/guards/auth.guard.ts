import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';

interface User {
  name: string;
  hashedPassword: string;
}

@Injectable()
export class AuthGuard implements CanActivate {

  private users: User[];

  constructor() {
    this.users = [{
      name: 'will',
      hashedPassword: '0209442e115ad7bc79fd281d91423a86b619e3c711fe574b7cc198d2e3c461c4',
    }];
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request?.headers?.authorization;
    const user = this.getUserFromBasicAuth(authorization);
    return this.authenticateUser(user);
  }

  private authenticateUser(user: User): boolean {
    return this.users.some((allowedUser) => allowedUser.name === user.name &&
      crypto.timingSafeEqual(Buffer.from(allowedUser.hashedPassword), Buffer.from(user.hashedPassword)));
  }

  private getUserFromBasicAuth(authorization: string): User {
    const encodedUser = Buffer.from(authorization.substr(6), 'base64').toString();
    return {
     name: encodedUser.substr(0, encodedUser.indexOf(':')),
     hashedPassword: this.hash(encodedUser.substr(encodedUser.indexOf(':') + 1)),
   };
  }

  private hash(str: string): string {
    return crypto.createHash('sha256').update(str).digest('hex').toString();
  }
}
