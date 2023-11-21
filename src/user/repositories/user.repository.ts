import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserDto } from "../dto/user.dto";
import { CustomRepository } from "src/core/typeorm-ex.decorator";

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(userDto: UserDto): Promise<User>{
        
        const {user_name} = userDto;

        const user = this.create({user_name , profile_image : "" })

        try{
            await this.save(user)
            return user;
        }catch(error){
            console.log(error)
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async getUser(userDto: UserDto): Promise<User> {
        const {user_name} = userDto;
        const user = await this.findOne({ where : { user_name} });

        if (!user) {
            throw new NotFoundException(`Cant't found user name by ${user_name}`);
        }

        return user;
    }

    async changeProfileImage(userDto: UserDto, filePath: string){
        const finalFilePate = 'http://221.148.25.234/nft-market-api/' + filePath;
        
        const user = await this.getUser(userDto);
    
        user.profile_image = finalFilePate;
        await this.save(user);

        return user;
    }
}