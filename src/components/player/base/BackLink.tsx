import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Icon, Icons } from "@/components/Icon";

export function BackLink(props: { url: string }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
    <SidebarTrigger className="mr-4" />
      <Link
        to={props.url}
        className="py-1 -my-1 px-2 -mx-2 tabbable rounded-lg flex items-center cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
      >
        <Icon className="transition-all duration-300 hover:text-foreground text-muted-foreground mr-2" icon={Icons.ARROW_LEFT} />
        <span className="transition-all duration-300 hover:text-foreground text-muted-foreground md:hidden">{t("player.back.short")}</span>
        <span className="transition-all duration-300 hover:text-foreground text-muted-foreground hidden md:block">{t("player.back.default")}</span>
      </Link>
    </div>
  );
}
