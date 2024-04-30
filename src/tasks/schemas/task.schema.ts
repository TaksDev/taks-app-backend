import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { v4 } from 'uuid';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    type: Types.UUID,
    default: v4(),
    required: true,
    immutable: true,
  })
  _id: string;
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    trim: true,
  })
  description: string;

  @Prop({
    default: false,
  })
  done: boolean;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
