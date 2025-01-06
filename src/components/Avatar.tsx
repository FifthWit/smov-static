import classNames from "classnames";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { base64ToBuffer, decryptData } from "@/backend/accounts/crypto";
import { Icon, Icons } from "@/components/Icon";
import { UserIcon } from "@/components/UserIcon";
import { AccountProfile } from "@/pages/parts/auth/AccountCreatePart";
import { useAuthStore } from "@/stores/auth";

export interface AvatarProps {
  profile: AccountProfile["profile"];
  sizeClass?: string;
  iconClass?: string;
  bottom?: React.ReactNode;
  className?: string;
}

export function Avatar({className, profile, sizeClass, iconClass, bottom}: AvatarProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={classNames(
          sizeClass,
          "rounded-full overflow-hidden flex items-center justify-center text-white",
        )}
        style={{
          background: `linear-gradient(to bottom right, ${profile.colorA}, ${profile.colorB})`,
        }}
      >
        <UserIcon
          className={iconClass}
          icon={profile.icon as any}
        />
      </div>
      {bottom ? (
        <div className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2">
          {bottom}
        </div>
      ) : null}
    </div>
  );
}

interface UserAvatarProps {
    sizeClass?: string;
    iconClass?: string;
    bottom?: React.ReactNode;
    withName?: boolean;
    className?: string;
}

export function UserAvatar({ sizeClass, iconClass, bottom, withName, className}: UserAvatarProps) {
  const auth = useAuthStore();

  const bufferSeed = useMemo(
    () =>
      auth.account && auth.account.seed
        ? base64ToBuffer(auth.account.seed)
        : null,
    [auth],
  );

  if (!auth.account || auth.account === null) return null;

  const deviceName = bufferSeed
    ? decryptData(auth.account.deviceName, bufferSeed)
    : "...";

  return (
    <div className={cn("flex items-center *:m-1", className)}>
      <Avatar
        profile={auth.account.profile}
        sizeClass={
          sizeClass ?? "w-[1.5rem] h-[1.5rem] ssm:w-[2rem] ssm:h-[2rem]"
        }
        iconClass={iconClass}
        bottom={bottom}
      />
      {withName && bufferSeed ? (
        <span className="hidden md:inline-block font-semibold text-lg">
          {deviceName.length >= 20
            ? `${deviceName.slice(0, 20 - 1)}…`
            : deviceName}
        </span>
      ) : null}
    </div>
  );
}

export function NoUserAvatar(props: { iconClass?: string }) {
  return (
    <div className="relative inline-block p-1 text-type-dimmed">
      <Icon
        className={props.iconClass ?? "text-base ssm:text-xl"}
        icon={Icons.MENU}
      />
    </div>
  );
}
