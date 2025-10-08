import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.cookies.token

    if(!token){
      throw new UnauthorizedException("No token existed!");
    }

    const roles = Reflect.getMetadata('roles',context.getHandler())||[];
    if(!roles.includes('auth')){
      throw new UnauthorizedException("Forbidden") 
    }
    return true;
  }
}
