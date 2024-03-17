import { Controller, Module, Get } from "@nestjs/common"; // Nhận module và controller từ thư viện nestjs để sử dụng, Get để nhận request từ client
import { NestFactory } from "@nestjs/core"; // Nhận NestFactory từ thư viện nestjs để sử dụng để tạo server

@Controller("/app") // Tạo controller với annotation @Controller để sử dụng q
class AppController {
  @Get() // Nhận request từ client
  getRootRoute() {
    // Nếu nhận request từ client thì chạy hàm này vơi đường dẫn là /
    return "Hello World"; // Trả về dữ liệu cho client
  }
  @Get("/about")
  getAboutRoute() {
    return "About Us";
  }
} // Class AppController dùng để điều khiển các request đến server

// Mục đích của module là để điều khiển các controller
@Module({
  controllers: [AppController], // Module này sẽ sử dụng controller AppController để điều khiển request
})
class AppModule {} // Class AppModule dùng để điều khiển các module

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Tạo server với AppModule là module điều khiển
  await app.listen(9000); // Server sẽ lắng nghe ở cổng 9000
}
bootstrap(); // Chạy hàm bootstrap để tạo server
