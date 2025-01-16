import { forwardRef, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";

export interface SearchBarProps {
  placeholder?: string;
  onChange: (value: string, force: boolean) => void;
  onUnFocus: (newSearch?: string) => void;
  value: string;
}

export const SearchBarInput = forwardRef<HTMLInputElement, SearchBarProps>(
  (props, ref) => {
    const [focused, setFocused] = useState(false);

    function setSearch(value: string) {
      props.onChange(value, true);
    }

    useEffect(() => {
      console.log(focused, "focus");
    }, [focused, props.value]);

    return (
      <div className="group relative">
        <div className="absolute transition-all duration-300 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <Input
          ref={ref}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            props.onUnFocus();
          }}
          onChange={(e) => setSearch(e.target.value)}
          value={props.value}
          className="relative p-7 border focus-visible:outline-none focus-visible:shadow-none rounded-2xl"
          placeholder={props.placeholder}
        />
      </div>
    );
  },
);
