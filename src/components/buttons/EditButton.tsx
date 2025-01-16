import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

import { Icon, Icons } from "@/components/Icon";

export interface EditButtonProps {
  editing: boolean;
  onEdit?: (editing: boolean) => void;
}

export function EditButton(props: EditButtonProps) {
  const { t } = useTranslation();
  const [parent] = useAutoAnimate<HTMLSpanElement>();

  const onClick = useCallback(() => {
    props.onEdit?.(!props.editing);
  }, [props]);

  return (
    <Button
      type="button"
      onClick={onClick}
      className="bg-secondary/30 hover:bg-secondary/50 flex h-12 items-center overflow-hidden rounded-full px-4 py-2 text-foreground transition-[background-color,transform] active:scale-105"
    >
      <span ref={parent}>
        {props.editing ? (
          <span className="mx-2 sm:mx-4 whitespace-nowrap">
            {t("home.mediaList.stopEditing")}
          </span>
        ) : (
          <Icon icon={Icons.EDIT} />
        )}
      </span>
    </Button>
  );
}
