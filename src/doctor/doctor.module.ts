import { forwardRef, Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema } from './schemas/doctor.schema';
import { SlotService } from 'src/slot/slot.service';
import { SlotSchema } from 'src/slot/schemas/slot.schema';
import { BookingService } from 'src/booking/booking.service';
import { SlotModule } from 'src/slot/slot.module';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Doctor', schema: DoctorSchema },
      { name: 'Slot', schema: SlotSchema },
    ]),
    forwardRef(() => SlotModule),
    forwardRef(() => BookingModule),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
