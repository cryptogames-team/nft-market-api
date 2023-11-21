import { IsString, MaxLength,IsNotEmpty } from "class-validator";

export class UserDto {

    @IsString()
    @MaxLength(12)
    @IsNotEmpty()
    user_name: string;
}