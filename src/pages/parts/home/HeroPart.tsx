import { useCallback, useEffect, useRef, useState } from "react";
import Sticky from "react-sticky-el";
import { useWindowSize } from "react-use";

import { SearchBarInput } from "@/components/form/SearchBar";
import { ThinContainer } from "@/components/layout/ThinContainer";
import { useSlashFocus } from "@/components/player/hooks/useSlashFocus";
import { HeroTitle } from "@/components/text/HeroTitle";
import { useRandomTranslation } from "@/hooks/useRandomTranslation";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useBannerSize } from "@/stores/banner";

export interface HeroPartProps {
    setIsSticky: (val: boolean) => void;
    searchParams: ReturnType<typeof useSearchQuery>;
}

function getTimeOfDay(date: Date): "night" | "morning" | "day" | "420" | "69" {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (month === 4 && day === 20) return "420";
    if (month === 6 && day === 9) return "69";
    const hour = date.getHours();
    if (hour < 5) return "night";
    if (hour < 12) return "morning";
    if (hour < 19) return "day";
    return "night";
}

export function HeroPart({ setIsSticky, searchParams }: HeroPartProps) {
    const { t: randomT } = useRandomTranslation();
    const [search, setSearch, setSearchUnFocus] = searchParams;
    const [, setShowBg] = useState(false);
    const bannerSize = useBannerSize();
    const stickStateChanged = useCallback(
        (isFixed: boolean) => {
            setShowBg(isFixed);
            setIsSticky(isFixed);
        },
        [setShowBg, setIsSticky],
    );

    const { width: windowWidth } = useWindowSize();

    const topSpacing = 16;
    const [stickyOffset, setStickyOffset] = useState(topSpacing);
    useEffect(() => {
        if (windowWidth > 1200) {
            // On large screens the bar goes inline with the nav elements
            setStickyOffset(topSpacing);
        } else {
            // On smaller screens the bar goes below the nav elements
            setStickyOffset(topSpacing + 60);
        }
    }, [windowWidth]);

    const time = getTimeOfDay(new Date());
    const title = randomT(`home.titles.${time}`);
    const placeholder = randomT(`home.search.placeholder`);
    const inputRef = useRef<HTMLInputElement>(null);
    useSlashFocus(inputRef);

    return (
        <ThinContainer>
            <div className="mt-44 space-y-16 text-center">
                <div className="relative z-1 mb-16">
                    <HeroTitle className="mx-auto max-w-md">{title}</HeroTitle>
                </div>
                <div className="relative h-20 z-1">
                    <SearchBarInput
                        ref={inputRef}
                        onChange={setSearch}
                        value={search}
                        onUnFocus={setSearchUnFocus}
                        placeholder={placeholder ?? ""}
                    />
                </div>
            </div>
        </ThinContainer>
    );
}
