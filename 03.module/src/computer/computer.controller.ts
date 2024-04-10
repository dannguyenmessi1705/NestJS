import { Controller, Get } from '@nestjs/common';
// Do trong module CPU và module Disk đều import module PowerModule, nên không cần phải import PowerModule ở ComputerModule
import { CpuService } from './../cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private cpuService: CpuService,
    private diskService: DiskService
  ) {}
  @Get()
  run() {
    return {
      cpu: this.cpuService.compute(1, 2),
      disk: this.diskService.getData(),
    };
  }
}
