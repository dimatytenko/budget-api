const TIMER_HOURS = {
  '12h': 12,
  '24h': 24,
  '48h': 48,
  '72h': 72,
};

const getDecisionEndsAt = (createdAt, decisionTimer) => {
  const hours = TIMER_HOURS[decisionTimer];
  return new Date(createdAt.getTime() + hours * 60 * 60 * 1000);
};

export default getDecisionEndsAt;
