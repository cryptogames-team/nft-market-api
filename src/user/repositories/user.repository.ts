import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserDto } from "../dto/user.dto";
import { CustomRepository } from "src/core/typeorm-ex.decorator";

@CustomRepository(User)
export class UserRepository extends Repository<User>{

    async getUser(user_name: string): Promise<User> {
        const user = await this.findOne({ where : { user_name} });

        if (!user) {
            throw new NotFoundException(`Cant't found user name by ${user_name}`);
        }

        return user;
    }

    async checkUser(userDto: UserDto): Promise<Boolean> {
        const {user_name} = userDto;

        const user = await this.findOne({ where : { user_name} });

        if (!user) {
            return false;
        }

        return true;
    }
    async createUser(userDto: UserDto): Promise<User>{
        
        const {user_name} = userDto;

        const user = this.create({user_name , profile_image : ""})

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

    async changeProfileImage(user: User, filePath: string): Promise<string> {
        const user_row = await this.getUser(user.user_name);
    
        user_row.profile_image = filePath;
        const save_user = await this.save(user_row);

        if(!save_user){
            throw new InternalServerErrorException();
        }

        return 'success';
    }
}