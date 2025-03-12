import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Doctor extends Document {
  @ApiProperty({
    example: "dr_john_doe",
    description: "Unique username for the doctor",
  })
  @Prop({ required: true })
  username: string;

  @ApiProperty({ example: "John", description: "First name of the doctor" })
  @Prop({ required: true })
  first_name: string;

  @ApiProperty({ example: "Doe", description: "Last name of the doctor" })
  @Prop({ required: true })
  last_name: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Unique email of the doctor",
  })
  @Prop({ required: true, unique: true })
  email: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
