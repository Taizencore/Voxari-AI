export interface CallMetric {
  sessionId: string;
  workerId: string;
  duration: number;
  outcome: 'booked' | 'transferred' | 'resolved' | 'failed';
  cost: number;
  revenue?: number;
}

export class AnalyticsEngine {
  calculateROI(metrics: CallMetric[]) {
    const totalCost = metrics.reduce((acc, m) => acc + m.cost, 0);
    const totalRevenue = metrics.reduce((acc, m) => acc + (m.revenue || 0), 0);
    return {
      totalCost,
      totalRevenue,
      roi: totalRevenue - totalCost,
      efficiency: metrics.length > 0 ? metrics.filter(m => m.outcome !== 'failed').length / metrics.length : 0,
    };
  }
}
