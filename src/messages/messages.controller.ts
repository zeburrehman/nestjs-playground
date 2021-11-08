import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messageService: MessagesService) {}

  @Get()
  async getAll() {
    return await this.messageService.findAll();
  }

  @Post()
  async create(@Body() body: CreateMessageDto) {
    try {
      await this.messageService.save(body.content);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const message = await this.messageService.findById(id);
    if (!message)
      throw new NotFoundException('Message with given Id not found.');
    return message;
  }
}
