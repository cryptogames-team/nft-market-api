import { Controller, Body, Post, Get, UseInterceptors, UploadedFile, ValidationPipe, BadRequestException, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import UseAuthGuard from './auth-guards/use-auth';
import AuthUser from 'src/core/auth-user.decorator';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/')
    @ApiOperation({summary: '유저 생성 API', description: '유저를 생성함'})
    @ApiCreatedResponse({description:'유저 생성', type: User})
    createUser(@Body(ValidationPipe) userDto: UserDto): Promise<{accessToken: string , user: User}> {
        return this.userService.createUser(userDto);
    }

    @Get('/:user_name')
    @ApiOperation({summary: '유저 정보 API', description: '유저 이름으로 정보 찾기'})
    @ApiCreatedResponse({description:'유저 정보',type: User})
    getUserByName(@Param('user_name') user_name: string): Promise<User> {
        return this.userService.getUserByName(user_name);
    }

    @Patch('/')
    @UseAuthGuard()
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({summary: '프로필 사진 수정 API', description: '이미지 파일도 담아서 보내야함'})
    uploadProfileImage(
        @AuthUser() user: User,
        @UploadedFile() file: Express.Multer.File): Promise<string> {
            return this.userService.changeProfileImage(user,file);
    }
}
