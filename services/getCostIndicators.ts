export interface CostIndicatorData {
  date: string
  totalCost: number
  cpm: number
  cpc: number
}

// Mock data that matches the patterns from the provided chart image
const mockCostIndicators: CostIndicatorData[] = [
  { date: "21 Jul", totalCost: 52, cpm: 1.5, cpc: 0.06 },
  { date: "22 Jul", totalCost: 57, cpm: 1.4, cpc: 0.06 },
  { date: "23 Jul", totalCost: 59, cpm: 1.5, cpc: 0.05 },
  { date: "24 Jul", totalCost: 52, cpm: 1.6, cpc: 0.06 },
  { date: "25 Jul", totalCost: 48, cpm: 1.5, cpc: 0.05 },
  { date: "26 Jul", totalCost: 55, cpm: 1.4, cpc: 0.06 },
  { date: "27 Jul", totalCost: 62, cpm: 1.7, cpc: 0.07 },
  { date: "28 Jul", totalCost: 68, cpm: 1.8, cpc: 0.08 },
  { date: "29 Jul", totalCost: 45, cpm: 1.3, cpc: 0.04 },
  { date: "30 Jul", totalCost: 71, cpm: 1.9, cpc: 0.09 },
  { date: "31 Jul", totalCost: 65, cpm: 1.6, cpc: 0.07 },
  { date: "01 Aug", totalCost: 58, cpm: 1.5, cpc: 0.06 },
  { date: "02 Aug", totalCost: 73, cpm: 1.8, cpc: 0.08 },
  { date: "03 Aug", totalCost: 69, cpm: 1.7, cpc: 0.07 },
  { date: "04 Aug", totalCost: 76, cpm: 1.9, cpc: 0.09 },
  { date: "05 Aug", totalCost: 82, cpm: 2.0, cpc: 0.1 },
  { date: "06 Aug", totalCost: 78, cpm: 1.8, cpc: 0.08 },
  { date: "07 Aug", totalCost: 85, cpm: 2.1, cpc: 0.11 },
  { date: "08 Aug", totalCost: 67, cpm: 1.6, cpc: 0.07 },
  { date: "09 Aug", totalCost: 72, cpm: 1.7, cpc: 0.08 },
  { date: "10 Aug", totalCost: 88, cpm: 2.2, cpc: 0.12 },
  { date: "11 Aug", totalCost: 91, cpm: 2.1, cpc: 0.11 },
  { date: "12 Aug", totalCost: 64, cpm: 1.5, cpc: 0.06 },
  { date: "13 Aug", totalCost: 69, cpm: 1.6, cpc: 0.07 },
  { date: "14 Aug", totalCost: 75, cpm: 1.8, cpc: 0.08 },
  { date: "15 Aug", totalCost: 82, cpm: 1.9, cpc: 0.09 },
  { date: "16 Aug", totalCost: 78, cpm: 2.0, cpc: 0.1 },
  { date: "17 Aug", totalCost: 86, cpm: 2.1, cpc: 0.11 },
  { date: "18 Aug", totalCost: 71, cpm: 1.7, cpc: 0.08 },
  { date: "19 Aug", totalCost: 77, cpm: 1.8, cpc: 0.09 },
]

/**
 * Service function to get cost indicators data
 * This function is designed to be easily replaceable with an API call
 * @param dateRange - Optional date range filter (for future API integration)
 * @returns Promise<CostIndicatorData[]> - Array of cost indicator data points
 */
export async function getCostIndicators(dateRange?: { from: Date; to: Date }): Promise<CostIndicatorData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // In the future, this would be replaced with:
  // const response = await fetch('/api/cost-indicators', { ... })
  // return response.json()

  // For now, return mock data
  const filteredData = mockCostIndicators

  // Apply date filtering if provided (for future use)
  if (dateRange) {
    // This would be handled by the API in a real implementation
    // filteredData = mockCostIndicators.filter(...)
  }

  return filteredData
}

/**
 * Get summary statistics for cost indicators
 * @param data - Cost indicator data array
 * @returns Summary statistics object
 */
export function getCostIndicatorsSummary(data: CostIndicatorData[]) {
  const totalCosts = data.map((d) => d.totalCost)
  const cpms = data.map((d) => d.cpm)
  const cpcs = data.map((d) => d.cpc)

  return {
    totalCost: {
      sum: totalCosts.reduce((a, b) => a + b, 0),
      avg: totalCosts.reduce((a, b) => a + b, 0) / totalCosts.length,
      max: Math.max(...totalCosts),
      min: Math.min(...totalCosts),
    },
    cpm: {
      avg: cpms.reduce((a, b) => a + b, 0) / cpms.length,
      max: Math.max(...cpms),
      min: Math.min(...cpms),
    },
    cpc: {
      avg: cpcs.reduce((a, b) => a + b, 0) / cpcs.length,
      max: Math.max(...cpcs),
      min: Math.min(...cpcs),
    },
  }
}
