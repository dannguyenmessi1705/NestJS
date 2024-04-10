import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  exports: [PowerService], // Export module để có thể sử dụng ở các module khác
})
export class PowerModule {}
