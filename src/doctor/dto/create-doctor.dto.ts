import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateDoctorDto {
  @ApiProperty({
    description: "Unique username for the doctor",
    example: "dr_johndoe",
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: "Doctor's first name",
    example: "John",
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    description: "Doctor's last name",
    example: "Doe",
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    description: "Doctor's unique email address",
    example: "john.doe@example.com",
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
