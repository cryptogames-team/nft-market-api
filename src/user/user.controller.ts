import { Controller, Body, Post, UseInterceptors, UploadedFile, ValidationPipe, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/')
    createUser(@Body() userDto: UserDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @Post('/profileImage')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
              const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
              return callback(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
    }))
    uploadProfileImage(
        @Body(ValidationPipe) userDto: UserDto,
        @UploadedFile() file: Express.Multer.File) {
            this.userService.changeProfileImage(userDto,file.path);
    }
}
