# Doctor Appointment System

The Doctor Appointment System is a backend solution for managing doctor appointment slots. Doctors can create and manage appointment slots with flexible scheduling options like daily, weekly, or one-time occurrences. 

Patients can book available slots, and once a slot is booked, it becomes unavailable for others. The system ensures seamless appointment management, making it easy to handle recurring schedules efficiently.
## Project Structure

```bash
|-- src
|   |-- booking
|   |   |-- dto
|   |   |-- schemas
|   |   |-- booking.controller.ts
|   |   |-- booking.module.ts
|   |   |-- booking.service.ts
|   |-- doctor
|   |   |-- dto
|   |   |-- schemas
|   |   |-- doctor.controller.ts
|   |   |-- doctor.module.ts
|   |   |-- doctor.service.ts
|   |-- slot
|   |   |-- dto
|   |   |-- schemas
|   |   |-- slot.controller.ts
|   |   |-- slot.module.ts
|   |   |-- slot.service.ts
|   |-- app.controller.ts
|   |-- app.module.ts
|   |-- app.service.ts
|   |-- main.ts
|-- README.md
```

## Setup

### Prerequisites
- Node.js (v20+)
- Docker (latest version)

### Installation

Install dependencies:

```bash
npm install
```

Configure environment variables:

```bash
cp .env.example .env
# Update .env with your configuration
```

### Running the Application with Docker

**Ensure Docker is Running:**

Verify Docker and Docker Compose are installed and running.

```bash
docker --version
docker-compose --version
```

**Build and Start the Containers:**

```bash
docker-compose up --build
```

**Access the API:**

Once running, the application will be available at:

```
http://localhost:3000
```

Swagger documentation:

```
http://localhost:3000/api
```

**Stopping the Containers:**

```bash
docker-compose down
```


## License

This project is licensed under the MIT License.
