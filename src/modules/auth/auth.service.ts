import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService){}

    generateToken(user:any){
        const payload = {email:user.email,username:user.username,role:user.role}
        return this.jwtService.sign(payload)
    }
    verifyToken(token:string){
        const payload = this.jwtService.verify(token)
        if(!payload) throw new UnauthorizedException("Token is not valid!")
        return payload
    }
}
