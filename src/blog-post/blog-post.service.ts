import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost } from './blog-post.interface';

@Injectable()
export class BlogPostService {
  constructor(@InjectModel('BlogPost') private readonly blogPostModel: Model<BlogPost>) {}

  async create(createPostDto: any): Promise<BlogPost> {
    const createdPost = new this.blogPostModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<BlogPost[]> {
    return await this.blogPostModel.find().exec();
  }

  async findOne(id: string): Promise<BlogPost> {
    return await this.blogPostModel.find({ _id: id}).exec();
  }

  async isTitleUnique(title: string): Promise<boolean> {
    const posts = await this.blogPostModel.find({ title }).exec();
    return !posts.length;
  }

  async findAllByAuthor(author: string): Promise<BlogPost[]> {
    return await this.blogPostModel.find({ author }).exec();
  }

  async delete(id: string): Promise<boolean> {
    return await this.blogPostModel.deleteOne({ _id: id}).exec();
  }
}
