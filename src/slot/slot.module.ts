import { forwardRef, Module } from "@nestjs/common";
import { SlotService } from "./slot.service";
import { SlotController } from "./slot.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SlotSchema } from "./schemas/slot.schema";
import { DoctorSchema } from "src/doctor/schemas/doctor.schema";
import { BookingSchema } from "src/booking/schemas/booking.schema";
import { BookingModule } from "src/booking/booking.module";
import { DoctorModule } from "src/doctor/doctor.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Slot", schema: SlotSchema },
      { name: "Doctor", schema: DoctorSchema },
      { name: "Booking", schema: BookingSchema },
    ]),
    forwardRef(() => DoctorModule),
    forwardRef(() => BookingModule),
  ],
  controllers: [SlotController],
  providers: [SlotService],
  exports: [SlotService],
})
export class SlotModule {}
