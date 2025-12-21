import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type WithTooltipProps = {
  label: string
  collapsed: boolean
  children: React.ReactNode
}

export function WithTooltip({ label, collapsed, children }: WithTooltipProps) {
  if (!collapsed) return <>{children}</>

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
