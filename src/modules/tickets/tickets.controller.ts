import { Body, Controller, Get, Param, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TicketsService } from './tickets.service';
import { MongoExceptionFilter } from '../../filters/mongo-exception.filter';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseFilters(MongoExceptionFilter)
  @Post('create')
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAllTickets() {
    return await this.ticketsService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('/:ticketId')
  async getTicket(@Param('ticketId') ticketId) {
    return await this.ticketsService.findOne(ticketId);
  }
}
