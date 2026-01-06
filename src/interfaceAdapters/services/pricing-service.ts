import { injectable } from "tsyringe";
import { IPricingService } from "../../entities/serviceInterfaces/pricing-service.interfac";
import { Factor } from "../../shared/types/types";

@injectable()
export class PricingService implements IPricingService {
  constructor() {}

  computeFactorFromAvgLoad(avgLoadPercent: number): Factor {
    if (avgLoadPercent >= 75) return 1;
    if (avgLoadPercent >= 55) return 0.6;
    if (avgLoadPercent >= 30) return 0.3;
    return 0;
  }

  computeNewPrice(
    basePrice: number,
    maxDynamicPercentage: number,
    factor: Factor,
  ): number {
    const allowedIncrease = (basePrice * maxDynamicPercentage) / 100; // absolute max increase amount
    const increase = allowedIncrease * factor;
    const raw = basePrice + increase;
    const capped = Math.min(raw, basePrice + allowedIncrease);
    return Math.round(capped);
  }
}
