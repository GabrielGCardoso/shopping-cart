import { IsOptional, IsEmpty, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductDTO {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  qtd: number;

  @IsOptional()
  @IsNumber()
  price: number;
}