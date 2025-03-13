import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { SlotService } from "src/slot/slot.service";
import { CreateSlotDto } from "src/slot/dto/create-slot.dto";
import { BookingService } from "src/booking/booking.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger";
import { Doctor } from "./schemas/doctor.schema";
import { Slot } from "src/slot/schemas/slot.schema";
import { Booking } from "src/booking/schemas/booking.schema";

@ApiTags("Doctors")
@Controller("doctors")
export class DoctorController {
  constructor(
    private readonly slotService: SlotService,
    private readonly doctorService: DoctorService,
    private readonly bookingService: BookingService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new doctor",
    description:
      "Registers a new doctor in the system with the provided details.",
  })
  @ApiResponse({
    status: 201,
    description: "Doctor created successfully",
    type: Doctor,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(createDoctorDto);
  }

  @Post(":doctorId/slots")
  @ApiOperation({
    summary: "Create slots for a doctor",
    description:
      "Adds new time slots for a specific doctor based on availability.",
  })
  @ApiParam({
    name: "doctorId",
    required: true,
    description: "Unique identifier of the doctor",
  })
  @ApiResponse({
    status: 201,
    description: "Slots created successfully",
    type: [Slot],
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input data",
  })
  async addDoctorSlots(
    @Param("doctorId") doctorId: string,
    @Body() createSlotDto: CreateSlotDto,
  ): Promise<Slot[]> {
    return this.slotService.addDoctorSlots(doctorId, createSlotDto);
  }

  @Get(":doctorId/bookings")
  @ApiOperation({
    summary: "Get bookings for a specific doctor",
    description:
      "Retrieves all bookings associated with a specific doctor within an optional date range.",
  })
  @ApiParam({
    name: "doctorId",
    required: true,
    description: "Unique identifier of the doctor",
  })
  @ApiQuery({
    name: "startDate",
    required: false,
    description: "Start date for filtering bookings [YYYY-MM-DD]",
    type: String,
  })
  @ApiQuery({
    name: "endDate",
    required: false,
    description: "End date for filtering bookings [YYYY-MM-DD]",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Bookings retrieved successfully",
    type: [Booking],
  })
  @ApiResponse({
    status: 404,
    description: "Doctor not found or no bookings available",
  })
  async listDoctorBookings(
    @Param("doctorId") doctorId: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string,
  ): Promise<Booking[]> {
    return this.bookingService.listDoctorBookings(doctorId, startDate, endDate);
  }

  @Get(":doctorId/available_slots")
  @ApiOperation({
    summary: "Retrieve available slots for a specific doctor",
    description:
      "Fetches a list of available time slots for a given doctor within an optional date range.",
  })
  @ApiParam({
    name: "doctorId",
    required: true,
    description: "Unique identifier of the doctor",
  })
  @ApiQuery({
    name: "startDate",
    required: false,
    description: "Start date for filtering available slots [YYYY-MM-DD]",
    type: String,
  })
  @ApiQuery({
    name: "endDate",
    required: false,
    description: "End date for filtering available slots [YYYY-MM-DD]",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Available slots retrieved successfully",
    type: [Slot],
  })
  @ApiResponse({
    status: 404,
    description: "No available slots found for the given doctor and date range",
  })
  async listAvailableSlots(
    @Param("doctorId") doctorId: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string,
  ): Promise<Slot[]> {
    return this.slotService.listAvailableSlots(doctorId, startDate, endDate);
  }
}
