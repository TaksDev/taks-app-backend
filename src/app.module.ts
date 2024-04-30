import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://abrahanMateo:01092022Mateo.@cluster0.53tu0l1.mongodb.net/testdb',
    ),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
