import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
interface MediaGridProps {
  children?: React.ReactNode;
  className?: string;
}

export const MediaGrid = forwardRef<HTMLDivElement, MediaGridProps>(
    (props, ref) => {
      return (
        <div
          className={cn("grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 justify-center", props.className)}
          
          ref={ref}
        >
          {React.Children.map(props.children, (child) => (
            <div className="relative">{child}</div>
          ))}
        </div>
      );
    },
  );