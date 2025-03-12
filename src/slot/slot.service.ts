import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Slot } from './schemas/slot.schema';
import { Model, Types } from 'mongoose';

interface SlotType {
  start_time: Date;
  end_time: Date;
  status: string;
  doctor_id: Types.ObjectId;
}

@Injectable()
export class SlotService {
  constructor(@InjectModel(Slot.name) private slotModel: Model<Slot>) {}

  async findById(id: string): Promise<Slot | null> {
    const slot = await this.slotModel.findById(id);
    return slot;
  }

  async addDoctorSlots(
    doctorId: string,
    { start_time, end_time, slot_duration, recurrence }: CreateSlotDto
  ): Promise<Slot[]> {
    const slots: SlotType[] = [];
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);
    const yearEnd = new Date(startDate.getFullYear(), 11, 31);
  
    // Map day names to Date.getDay() numbers
    const daysOfWeekMap: Record<string, number> = {
      Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
      Thursday: 4, Friday: 5, Saturday: 6,
    };

    const generateTimeSlots = (date: Date): void => {
      // Set start time to match initial start time's hours/minutes
      let current = new Date(date);
      current.setHours(startDate.getHours(), startDate.getMinutes(), 0, 0);
      
      // Set end time to match initial end time's hours/minutes
      const end = new Date(date);
      end.setHours(endDate.getHours(), endDate.getMinutes(), 0, 0);
  
      // Create slots until we reach the end time
      while (current < end) {
        const slotEnd = new Date(current);
        slotEnd.setMinutes(slotEnd.getMinutes() + slot_duration);
  
        slots.push({
          doctor_id: new Types.ObjectId(doctorId),
          start_time: new Date(current),
          end_time: new Date(slotEnd),
          status: 'available',
        });
  
        current = new Date(slotEnd);
      }
    };
  
     // Check recurrence rules for each date
    const shouldGenerateSlot = (date: Date): boolean => {
      switch (recurrence.type) {
        case 'one-time':
          return date.toDateString() === startDate.toDateString();
        case 'daily':
          return true;
        case 'weekly':
          return recurrence.daysOfWeek?.map(day => daysOfWeekMap[day]).includes(date.getDay()) ?? false;
        default:
          return false;
      }
    };
  
    // Generate slots for each valid day until year end
    for (let day = new Date(startDate); day <= yearEnd; day.setDate(day.getDate() + 1)) {
      if (shouldGenerateSlot(day)) {
        generateTimeSlots(day);
      }
    }
  
    return this.slotModel.insertMany(slots);
  }
  

  async bookSlot(slotId: string): Promise<Slot> {
    const filter = {
      _id: new Types.ObjectId(slotId),
      status: 'available',
    };
    const update = {
      $set: {
        status: 'booked',
      },
    };
    const options = {
      new: true,
    };

    const updatedSlot = await this.slotModel.findOneAndUpdate(
      filter,
      update,
      options,
    );

    return updatedSlot as Slot;
  }

  async listAvailableSlots(
    doctorId: string,
    startDate?: string,
    endDate?: string,
  ) {
    const filter: any = {
      doctor_id: new Types.ObjectId(doctorId),
      status: 'available',
    };

    if (startDate && endDate) {
      filter.start_time = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    return this.slotModel.find(filter).exec();
  }
}
