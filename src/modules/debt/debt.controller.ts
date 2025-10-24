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
import { DebtService } from './debt.service';

@Controller('debt')
export class DebtController {
    constructor(private readonly debtService: DebtService) { }

    @Post()
    create(@Body() body: any) {
        return this.debtService.createDebt(body);
    }

    @Get()
    findAll() {
        return this.debtService.getAllDebts();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.debtService.getOneDebt(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any,
    ) {
        return this.debtService.updateDebt(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.debtService.deleteDebt(id);
    }
}