import { Factor } from "../../shared/types/types";

export interface IPricingService {
  computeFactorFromAvgLoad(avgLoadPercent: number): Factor;
  computeNewPrice(
    basePrice: number,
    maxDynamicPercentage: number,
    factor: Factor,
  ): number;
}
