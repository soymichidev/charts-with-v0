import { ChartPieLegend } from "@/components/my-chart"
import { ChartBarHorizontal } from "@/components/horizontal-chart"
import { ChartComposed } from "@/components/composed-chart";
export default function Home() {
  return <div className="max-w-[900px]">
   <div className="p-10 border bg-white">
  <ChartComposed />
  </div>
  <ChartBarHorizontal/>
  <ChartPieLegend/>
 
  </div>
}
