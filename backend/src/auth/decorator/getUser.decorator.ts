import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      console.log('from getUser decorator');

      console.log('type of data', typeof request.user[data]);

      return request.user[data];
    }
    return request.user;
  },
);
