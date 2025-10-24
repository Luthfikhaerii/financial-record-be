import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ReceivableService } from './receivable.service';

@Controller('receivable')
export class ReceivableController {
  constructor(private readonly receivableService: ReceivableService) {}

  @Post()
  create(@Body() body: any) {
    return this.receivableService.createReceivable(body);
  }

  @Get()
  findAll() {
    return this.receivableService.getAllReceivables();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.receivableService.getOneReceivable(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.receivableService.updateReceivable(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.receivableService.deleteReceivable(id);
  }
}
