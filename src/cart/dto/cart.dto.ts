import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CartDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: 'sale_id'})
    sale_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'collection_name'})
    collection_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'nft_name'})
    nft_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'nft_image'})
    nft_image: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'price'})
    price: string;
}