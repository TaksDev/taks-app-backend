import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('v1/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.finAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Post()
  async createTask(@Body() newTask: CreateTaskDto) {
    try {
      return await this.tasksService.createTask(newTask);
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Task alredy exists');
      }
      throw error;
    }
  }
  @Patch(':id')
  async updatedTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.updateTask(id, updateTaskDto);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteTask(@Param('id') id: string) {
    const task = await this.tasksService.deleteTask(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
