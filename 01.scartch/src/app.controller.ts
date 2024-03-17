import { Controller, Get } from "@nestjs/common"; // Nhận module và controller từ thư viện nestjs để sử dụng, Get để nhận request từ client
@Controller("/app") // Tạo controller với annotation @Controller và đường dẫn là /app
export class AppController {
  @Get()
  getRootRoute() {
    return "Hello World"; // Nếu nhận request từ client thì chạy hàm này vơi đường dẫn là /app
  }
  @Get("/about")
  getAboutRoute() {
    return "About Us"; // Nếu nhận request từ client thì chạy hàm này vơi đường dẫn là /app/about
  }
} // Class AppController dùng để điều khiển các request đến server
