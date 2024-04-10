import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module'; // Import module để sử dụng ở module hiện tại (CpuModule)

@Module({
  imports: [PowerModule], // Import module để sử dụng ở module hiện tại (CpuModule)
  providers: [CpuService],
  exports: [CpuService], // Export module để có thể sử dụng ở các module khác
})
export class CpuModule {}
