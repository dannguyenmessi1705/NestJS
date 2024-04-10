import { Injectable } from '@nestjs/common';
@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    console.log(`Power is plugged in with ${watts} watts`);
  }
}
