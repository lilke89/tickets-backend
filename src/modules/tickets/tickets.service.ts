import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './interfaces/ticket.interface';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {

  constructor(@InjectModel('Ticket') private readonly ticketModel: Model<Ticket>) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const createdTicket = new this.ticketModel(createTicketDto);
    return createdTicket.save();
  }

  async findOne(id: string): Promise<Ticket | undefined> {
    return this.ticketModel.findOne({_id: id});
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find();
  }
}
