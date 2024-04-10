import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service'; // Import service để sử dụng ở service hiện tại (CpuService)
// sau khi đã import module PowerModule ở CpuModule, ta có thể sử dụng service PowerService ở CpuService

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {} // Inject PowerService vào CpuService để sử dụng
  compute(a: number, b: number) {
    this.powerService.supplyPower(10); // Gọi phương thức supplyPower của PowerService
    return a + b;
  }
}
