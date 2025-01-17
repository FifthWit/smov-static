import * as React from "react";
import clsx from "clsx";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuSubButton,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuBadge,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Play,
    Film,
    MonitorPlay,
    ChevronUp,
    BookmarkCheck,
    Settings,
    CircleHelp,
    Sparkles,
    Github,
} from "lucide-react";
import { shouldShowProgress } from "@/stores/progress/utils";
import { MediaItem } from "@/utils/mediaTypes";
import { mediaItemToId } from "@/backend/metadata/tmdb";
import { useBookmarkStore } from "@/stores/bookmarks";
import { useProgressStore } from "@/stores/progress";
import { NoUserAvatar, UserAvatar } from "@/components/Avatar";
import { useAuth } from "@/hooks/auth/useAuth";
import { Link } from "react-router-dom";

interface subGroups {
    icon: React.ReactNode;
    title: string;
    media: MediaItem[];
}

interface footerItem {
    icon: React.ReactNode;
    title: string;
    link: string;
    className?: string;
}

export function AppSidebar() {
    const { loggedIn } = useAuth();

    let subGroups: subGroups[] = [];

    const progressItems = useProgressStore((s) => s.items);
    subGroups.push({ title: "CONTINUE WATCHING", icon: <Play />, media: [] });
    const bookmarkItems = useBookmarkStore((s) => s.bookmarks);
    subGroups.push({ title: "BOOKMARKS", icon: <BookmarkCheck />, media: [] });

    let watchedMedia: MediaItem[] = [];
    Object.entries(progressItems)
        .filter((entry) => shouldShowProgress(entry[1]).show)
        .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
        .forEach((entry) => {
            subGroups[0].media.push({
                id: entry[0],
                ...entry[1],
            });
        });

    Object.entries(bookmarkItems)
        .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
        .forEach((entry) => {
            subGroups[1].media.push({
                id: entry[0],
                ...entry[1],
            });
        });

    const footerItems: footerItem[] = [
        {
            icon: <Sparkles />,
            title: "Discover",
            link: "/Discover",
        },
        {
            icon: <Github />,
            title: "Contribute ˶ᵔ ᵕ ᵔ˶",
            link: "https://github.com/FifthWit/smov-static",
        },
        {
            icon: <DiscordIcon />,
            title: "Discord",
            link: "https://docs.undi.rest/links/discord",
        },
        {
            icon: <Settings />,
            title: "Settings",
            link: "/settings",
        },
        {
            icon: <CircleHelp />,
            title: "About us",
            link: "/about",
        },
    ];

    return (
        <Sidebar className="border-sidebar-border">
            <SidebarHeader>
                <SidebarMenuButton
                    size="lg"
                    asChild
                    className="text-2xl font-bold"
                >
                    <Link to="/">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Play className="size-4" />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-semibold">Sudo-Fork</span>
                            <span className="text-xs text-muted-foreground">
                                Watch Anywhere
                            </span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                {subGroups.some((group) => group.media.length > 0) && (
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {/* Watched Media Collapsible sub-menu */}
                                {subGroups.map((group) => (
                                    <Collapsible
                                        defaultOpen
                                        className="group/collapsible"
                                        key={group.title}
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton className="font-semibold text-muted-foreground">
                                                    <span className="text-muted-foreground">
                                                        {group.icon}
                                                    </span>
                                                    {group.title}
                                                    <ChevronUp className="ml-auto group-data-[state=open]/collapsible:rotate-180 duration-200 transition-all" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                {group.media.length > 0 ? (
                                                    <SidebarMenuSub>
                                                        {group.media.map(
                                                            (media) => (
                                                                <SidebarMenuSubItem
                                                                    key={
                                                                        media.title
                                                                    }
                                                                    className=""
                                                                >
                                                                    <SidebarMenuSubButton
                                                                        asChild
                                                                        className="px-2 items-center min-h-7 h-fit py-2"
                                                                    >
                                                                        <Link
                                                                            to={`/media/${encodeURIComponent(mediaItemToId(media))}`}
                                                                            className="flex-row items-center"
                                                                        >
                                                                            <span className="text-muted-foreground">
                                                                                {media.type ===
                                                                                "movie" ? (
                                                                                    <Film />
                                                                                ) : (
                                                                                    <MonitorPlay />
                                                                                )}
                                                                            </span>
                                                                            <span className="truncate">
                                                                                {
                                                                                    media.title
                                                                                }
                                                                            </span>
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            ),
                                                        )}
                                                    </SidebarMenuSub>
                                                ) : (
                                                    <div className="p-4 text-center text-muted-foreground">
                                                        No items available
                                                    </div>
                                                )}
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu className="*:mt-1">
                    {footerItems.map((item) => (
                        <SidebarMenuButton
                            asChild
                            isActive={window.location.pathname === item.link}
                            className="transition-all duration-300 bg-accent/30 text-muted-foreground"
                        >
                            <Link to={item.link}>
                                {item.icon}{" "}
                                <span className="text-sidebar-foreground">
                                    {item.title}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    ))}
                    {loggedIn ? (
                        <UserAvatar
                            withName
                            className="bg-accent/30 rounded-lg p-2"
                        />
                    ) : (
                        <NoUserAvatar />
                    )}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

function DiscordIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 640 512"
        >
            <path
                fill="currentColor"
                d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
            />
        </svg>
    );
}
