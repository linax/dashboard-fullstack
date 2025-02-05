import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @ApiOperation({ summary: 'Obtener todas las métricas' })
  @ApiResponse({
    status: 200,
    description: 'Métricas obtenidas exitosamente',
  })
  @Get()
  findAll() {
    return this.metricsService.findAll();
  }
}
