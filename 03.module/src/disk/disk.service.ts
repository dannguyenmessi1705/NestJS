import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service'; // Import service để sử dụng ở service hiện tại (DiskService)
// sau khi đã import module PowerModule ở DiskModule, ta có thể sử dụng service PowerService ở DiskService

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {} // Inject PowerService vào DiskService
  getData() {
    this.powerService.supplyPower(5); // Gọi phương thức supplyPower của PowerService
    return 'Data from disk';
  }
}
