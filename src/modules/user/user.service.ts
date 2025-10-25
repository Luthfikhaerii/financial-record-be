import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserLoginDto } from './user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private authService: AuthService) { }

    async login(body: UserLoginDto) {
        const response = await this.prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (!response) throw new BadRequestException("User is not exist!")
        if (response.password !== body.password) throw new BadRequestException("Wrong password!")

        const token = this.authService.generateToken({
            email: response.email,
            role: response.role,
            username: response.username
        })

        return { token, response }
    }

    async register(body: any) {
        const user = await this.prisma.user.create({
            data: {
                ...body
            }
        })
        const token = this.authService.generateToken({
            email: user.email,
            role: user.role,
            username: user.username
        })
        return { token, user }
    }
}
