import { Badge } from "@/view/components/ui/badge"
import { Layout, Palette, Rocket, Settings } from "lucide-react"

export type ProjectType = "Site Template" | "Site Personalizado" | "Landing Page" | "Sistema"

export function ProjectTypeBadge({ type }: { type: ProjectType }) {
  const typeConfig = {
    "Site Template": { color: "bg-blue-100 text-blue-800 border-blue-800/20", icon: <Layout className="w-3 h-3 mr-1" /> },
    "Site Personalizado": { color: "bg-purple-100 text-purple-800 border-purple-800/20", icon: <Palette className="w-3 h-3 mr-1" /> },
    "Landing Page": { color: "bg-amber-100 text-amber-800 border-amber-800/20", icon: <Rocket className="w-3 h-3 mr-1" /> },
    Sistema: { color: "bg-green-100 text-green-800 border-green-800/20", icon: <Settings className="w-3 h-3 mr-1" /> },
  }

  return (
    <Badge variant="outline" className={`flex font-medium items-center ${typeConfig[type]?.color}`}>
      {typeConfig[type]?.icon}
      {type}
    </Badge>
  )
}
