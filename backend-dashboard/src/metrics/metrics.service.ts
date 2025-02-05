import { Injectable } from '@nestjs/common';
import { Metrics } from './entities/metrics.entity';

@Injectable()
export class MetricsService {
  private metrics: Metrics = { income: 500000, totalProducts: 10 };

  findAll() {
    return this.metrics;
  }
}
