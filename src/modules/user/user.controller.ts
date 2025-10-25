import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './user.dto';
import express from 'express';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService,private authService:AuthService){}

    @Post('login')
    async login(@Body() body:UserLoginDto,@Res({passthrough:true}) res: express.Response){
        const data = await this.userService.login(body)
        res.cookie('token',data.token,{
            httpOnly:true,
            sameSite:'none',
            path:"/",
            secure:true
        })
        return {message:"login success!",data:data.response}

    }

    @Post('register')
    async register(@Body() body:any,@Res({passthrough:true}) res: express.Response){
        const data = await this.userService.register(body)
        res.cookie('token',data.token,{
            httpOnly:true,
            sameSite:'none',
            path:"/",
            secure:true
        })
        return {message:"login success!",data:data.user}

    }

    @Get("me")
    async me(@Req() req:express.Request){
        const {token} = req.cookies
        const user = this.authService.verifyToken(token)
        return {
            message:"user authenticated!",
            data:{
                email: user.email,
                role:user.role,
                username:user.username
            }
        }
    }

    @Delete('logout')
    async logout(@Res({passthrough:true}) res:express.Response){
        res.clearCookie('token',{
            httpOnly:true,
            path:'/',
            secure:true,
            sameSite:'none'
        })
        return {message:"logout success!"}
    }
}
