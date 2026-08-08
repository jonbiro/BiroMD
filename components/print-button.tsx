import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrintButton({ label = "Print This Guide" }: { label?: string }) {
  return (
    <Button type="button" variant="outline" data-print-page>
      <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  )
}
