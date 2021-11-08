import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(public messageRepository: MessagesRepository) {}

  async findById(id: string) {
    return await this.messageRepository.findById(id);
  }

  async findAll() {
    return await this.messageRepository.findAll();
  }

  async save(content: string) {
    await this.messageRepository.save(content);
  }
}
