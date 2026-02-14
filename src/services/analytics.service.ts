const usageLog: Map<string, number> = new Map();
const requestsPerSecond: number[] = [];

export const trackUsageService = (endpoint: string) => {
  usageLog.set(endpoint, (usageLog.get(endpoint) || 0) + 1);
  requestsPerSecond.push(Date.now());
};

export const getAnalyticsService = () => {
  const now = Date.now();
  const oneSecondAgo = now - 1000;
  
  const rps = requestsPerSecond.filter(timestamp => timestamp > oneSecondAgo).length;
  requestsPerSecond.splice(0, requestsPerSecond.findIndex(t => t > oneSecondAgo));

  const topEndpoints = Array.from(usageLog.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    currentRps: rps,
    topEndpoints: Object.fromEntries(topEndpoints)
  };
};