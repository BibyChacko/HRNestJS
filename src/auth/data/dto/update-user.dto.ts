import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthDto extends PartialType(SignUpDto) {

    @ApiProperty()
    id: string;


    @ApiProperty()
    name: string;

}
