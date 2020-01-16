import {BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query, UseGuards} from '@nestjs/common';
import {BlogPostService} from './blog-post.service';
import {BlogPost} from './blog-post.interface';
import {AuthGuard} from '../guards/auth.guard';
import {MoonPipe} from '../pipes/moon.pipe';
import {BlogPostProp} from './blog-post-body.decorator';

@Controller('posts')
export class BlogPostController {

  constructor(private readonly blogPostService: BlogPostService) {
  }

  @Get()
  public async getAll(): Promise<BlogPost[]> {
    return this.blogPostService.findAll();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.findOne(id);
  }

  @Get('author/:author')
  public async getOneByParam(@Param('author') author: string): Promise<BlogPost[]> {
    return this.blogPostService.findAllByAuthor(author);
  }

  @Post('new')
  @UseGuards(AuthGuard)
  public async create(@BlogPostProp('title') title, @Body() blogPost: any): Promise<BlogPost> {
    if (!(await this.blogPostService.isTitleUnique(title))) {
      throw new BadRequestException();
    }
    return this.blogPostService.create(blogPost);
  }

  @Post('new-moon')
  @UseGuards(AuthGuard)
  public async createWithMoonPipe(@Body(new MoonPipe()) blogPost: any): Promise<BlogPost> {
    return this.blogPostService.create(blogPost);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public async delete(@Param('id') id: string): Promise<boolean> {
    return this.blogPostService.delete(id);
  }
}
