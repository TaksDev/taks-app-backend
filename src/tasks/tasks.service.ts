import { Injectable } from '@nestjs/common';
import { Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async finAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
  async createTask(createTask: CreateTaskDto) {
    // forzar nuevo _id
    const _id = v4();

    const newTask = new this.taskModel({
      _id,
      ...createTask,
    });

    return newTask.save();
  }
  async findOne(id: string) {
    return this.taskModel.findById(id);
  }

  deleteTask(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }

  async updateTask(id: string, task: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }
}
