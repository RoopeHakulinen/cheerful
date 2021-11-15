import { Controller, Get, Param } from '@nestjs/common';

interface Choreography {
  id: number;
  name: string;
}

@Controller('choreographies')
export class ChoreographiesController {
  @Get()
  getAll(): Choreography[] {
    return [];
  }

  @Get(':id')
  getOne(@Param('id') id: string): Choreography {
    return {
      id: parseInt(id, 10),
      name: '',
    };
  }
}
