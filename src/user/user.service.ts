import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { S3FolderName, mediaUpload } from 'src/utils/s3-utils';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async createUser(userDto: UserDto): Promise<{accessToken: string, user: User}> {
        const { user_name } = userDto;

        let user: User;

        if(this.userRepository.checkUser(userDto)){
            user = await this.userRepository.getUser(user_name);
        }else {
            user = await this.userRepository.createUser(userDto);
        }
        
        const accessToken = await this.jwtService.sign({ user_name });

        return {accessToken, user};
    }

    getUserByName(user_name: string): Promise<User> {
        return this.userRepository.getUser(user_name);
    }

    async changeProfileImage(user: User,file: Express.Multer.File): Promise<string>{

        if(!file) {
            throw new NotFoundException(`select the image file`);
        }
        const url = await mediaUpload(file, S3FolderName.PROFILE);

        if(!url){
            throw new InternalServerErrorException();
        }

        return this.userRepository.changeProfileImage(user,url);
    }
}
