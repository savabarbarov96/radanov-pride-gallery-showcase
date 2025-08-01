import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CatStatusTagProps {
  status: string;
  className?: string;
  variant?: "default" | "compact";
}

export const CatStatusTag = ({ status, className, variant = "default" }: CatStatusTagProps) => {
  // Determine if status indicates availability
  const isAvailable = status === "Достъпен" || status === "Налична";
  
  // Get status color and styling based on availability
  const getStatusStyle = () => {
    if (isAvailable) {
      return {
        badgeVariant: "default" as const,
        className: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
      };
    } else {
      return {
        badgeVariant: "secondary" as const,
        className: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200"
      };
    }
  };

  const statusStyle = getStatusStyle();
  const isCompact = variant === "compact";

  return (
    <Badge 
      variant={statusStyle.badgeVariant}
      className={cn(
        "font-medium border",
        statusStyle.className,
        isCompact ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5",
        className
      )}
    >
      {isAvailable ? "Налична" : "Недостъпна"}
    </Badge>
  );
};

export default CatStatusTag;