import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import { PowerModule } from 'src/power/power.module'; // Import module để sử dụng ở module hiện tại (DiskModule)

@Module({
  imports: [PowerModule], // Import module để sử dụng ở module hiện tại (DiskModule)
  providers: [DiskService],
  exports: [DiskService], // Export module để có thể sử dụng ở các module khác
})
export class DiskModule {}
