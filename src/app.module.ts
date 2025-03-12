import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SlotModule } from './slot/slot.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://admin:helloworld123@cluster0.l5fn7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    ConfigModule.forRoot({ isGlobal: true }),
    // SlotModule,
    // BookingModule,
    // DoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
