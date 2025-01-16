import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WideContainerProps {
  classNames?: string;
  children?: ReactNode;
}

export function WideContainer(props: WideContainerProps) {
  return (
    <div
      className={cn(
        `mx-[100px]  px-8 max-w-[calc(100vw-256px)]`,
        props.classNames,
      )}
    >
      {props.children}
    </div>
  );
}
