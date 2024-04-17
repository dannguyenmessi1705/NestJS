import {
  CanActivate, // CanActive là 1 interface, sử dụng để tạo guard cho route
  ExecutionContext, // ExecutionContext là 1 interface, sử dụng để lấy request từ client
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest(); // context bao gồm các thông tin của request, response, next, chuyển context HTTP request
    return request.session.user_id; // Trả về user_id từ session trong request, nếu không tồn tại thì trả về false
  }
}
