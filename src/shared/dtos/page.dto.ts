import { ApiProperty } from '@nestjs/swagger';

export class Page {
  @ApiProperty({ type: Number, required: false })
  page?: number;

  @ApiProperty({ type: Number, required: false })
  size?: number;
}
