import {
  createParamDecorator, // Sử dụng createParamDecorator để tạo decorator cho request
  ExecutionContext, // Sử dụng ExecutionContext để lấy request từ client
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest(); // context bao gồm các thông tin của request, response, next, chuyển context HTTP request
    return request.user; // Trả về user từ request nếu đã được gán từ interceptor
  },
);
