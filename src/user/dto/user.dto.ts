import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength,IsNotEmpty } from "class-validator";

export class UserDto {

    @IsString()
    @MaxLength(12)
    @IsNotEmpty()
    @ApiProperty({description: '이름'})
    user_name: string;
}