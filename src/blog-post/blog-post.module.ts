import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import {BlogPostSchema} from './blog-post.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'BlogPost',
    schema: BlogPostSchema,
  }])],
  controllers: [BlogPostController],
  providers: [BlogPostService],
})
export class BlogPostModule {}
