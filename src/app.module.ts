import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:pass@mongo:27017/'), BlogPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
