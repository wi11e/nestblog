import { createParamDecorator } from '@nestjs/common';

export const BlogPostProp = createParamDecorator((prop: string, req) => {
  return prop ? req?.body[prop] : null;
});
