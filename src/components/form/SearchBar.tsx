import { forwardRef, useState, useEffect } from "react";

import { Input } from "@/components/ui/input"

import { Flare } from "@/components/utils/Flare";

import { Icon, Icons } from "../Icon";
import { TextInputControl } from "../text-inputs/TextInputControl";
import { cn } from "@/lib/utils";

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
      <Flare.Base
        className={cn({
          "z-[1] hover:flare-enabled group flex flex-col rounded-[28px] transition-colors sm:flex-row sm:items-center relative":
            true,
          "bg-input": !focused,
          "bg-input/80": focused,
        })}
      >
        <Flare.Light
          flareSize={400}
          enabled={focused}
          className="rounded-[28px]"
          backgroundClass={cn({
            "transition-colors": true,
            "bg-input/85": !focused,
            "bg-search-focused": focused,
          })}
        />
        <Flare.Child className="flex flex-row items-center w-full">
          <div className="ml-6 mr-0 text-accent/60">
            <Icon icon={Icons.SEARCH} />
          </div>

          <Input
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              props.onUnFocus();
            }}
            onChange={(e) => setSearch(e.target.value)}
            value={props.value}
            // className="w-full flex-1 bg-transparent px-4 py-4 pl-12 text-search-text placeholder-search-placeholder focus:outline-none sm:py-4 sm:pr-2"
            className="bg-transparent p-7 border-0 focus-visible:outline-none focus-visible:shadow-none"
            placeholder={props.placeholder}
          />
        </Flare.Child>
      </Flare.Base>
    );
  },
);
