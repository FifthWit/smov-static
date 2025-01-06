import * as React from "react"
import clsx from "clsx"
import { Sidebar,
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
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Play,
    Film,
    MonitorPlay,
    ChevronUp,
    BookmarkCheck,
    Settings,
    CircleHelp,
    Sparkles,
} from "lucide-react"
import { shouldShowProgress } from "@/stores/progress/utils";
import { MediaItem } from "@/utils/mediaTypes";
import { mediaItemToId } from "@/backend/metadata/tmdb";
import { useBookmarkStore, BookmarkMediaItem } from "@/stores/bookmarks";
import { useProgressStore, ProgressItem } from "@/stores/progress";
import { LinksDropdown } from "@/components/LinksDropdown";
import { NoUserAvatar, UserAvatar } from "@/components/Avatar";
import { useAuth } from "@/hooks/auth/useAuth"
import { Link } from "react-router-dom"

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
    
    let subGroups: subGroups[] = []
    
    const progressItems = useProgressStore((s) => s.items);
    subGroups.push({title: "Continue Watching", icon: <Play />, media: []});
    const bookmarkItems = useBookmarkStore((s) => s.bookmarks);
    subGroups.push({title: "Bookmarks", icon: <BookmarkCheck />, media: []});


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
            icon: <Settings />,
            title: "Settings",
            link: "/settings",
        },
        {
            icon: <CircleHelp />,
            title: "About us",
            link: "/about",
        },
        {
            icon: <Sparkles />,
            title: "Discover",
            link: "/Discover",
        },
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenuButton size="lg" asChild className="text-2xl font-bold">
                    <Link to="/">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <Play className="size-4" />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                          <span className="font-semibold">Sudo-Fork</span>
                          <span className="text-xs text-muted-foreground">Watch Anywhere</span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {/* Watched Media Collapsible sub-menu */}
                                {subGroups.map((group) =>  (
                                <Collapsible defaultOpen className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                {group.icon}
                                                {group.title}
                                                <ChevronUp className="ml-auto group-data-[state=open]/collapsible:rotate-180 duration-200 transition-all" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {group.media.map((media) => (
                                                    <SidebarMenuSubItem key={media.title} className="">
                                                        <SidebarMenuSubButton asChild className="py-4">
                                                            <Link to={`/media/${encodeURIComponent(mediaItemToId(media))}`} className="flex items-center justify-between">
                                                                {media.title}
                                                                {media.type === "movie" ? <Film />  : <MonitorPlay />}
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu className="*:mt-1">
                    {footerItems.map((item) => (
                        <SidebarMenuButton asChild isActive={window.location.pathname === item.link} className="transition-all duration-300">
                            <Link to={item.link}>{item.icon} {item.title}</Link>
                        </SidebarMenuButton>
                    ))}
                    {loggedIn ? <UserAvatar withName className="bg-secondary rounded-lg p-2" /> : <NoUserAvatar />}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

function useMemo(arg0: () => import("@/stores/progress").ProgressMediaItem, arg1: any[]) {
    throw new Error("Function not implemented.")
}
