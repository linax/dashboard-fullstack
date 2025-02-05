import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsInt } from 'class-validator';
export class CreateProductDto {
  @ApiProperty({ example: 'Producto A', description: 'Producto' })
  @MinLength(3)
  name: string;
  @ApiProperty({ example: '1000', description: 'Precio' })
  @IsInt()
  price: number;
  @ApiProperty({ example: '100', description: 'Stock' })
  @IsInt()
  stock: number;
}
