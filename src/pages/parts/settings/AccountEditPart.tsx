import { useTranslation } from "react-i18next";

import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Icon, Icons } from "@/components/Icon";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { useModal } from "@/components/overlays/Modal";
import { AuthInputBox } from "@/components/text-inputs/AuthInputBox";
import { UserIcons } from "@/components/UserIcon";
import { ColorPicker } from "@/components/form/ColorPicker";
import { useAuth } from "@/hooks/auth/useAuth";
import { IconPicker } from "@/components/form/IconPicker";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function AccountEditPart(props: {
    deviceName: string;
    setDeviceName: (s: string) => void;
    colorA: string;
    setColorA: (s: string) => void;
    colorB: string;
    setColorB: (s: string) => void;
    userIcon: UserIcons;
    setUserIcon: (s: UserIcons) => void;
}) {
    const { t } = useTranslation();
    const { logout } = useAuth();
    const profileEditModal = useModal("profile-edit");

    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle>{t("settings.account.title")}</CardTitle>
                <CardDescription className="flex flex-row justify-center">
                    <div className="p-4 justify-center">
                        <Avatar
                            profile={{
                                colorA: props.colorA,
                                colorB: props.colorB,
                                icon: props.userIcon,
                            }}
                            iconClass="text-5xl"
                            sizeClass="w-32 h-32"
                            bottom={
                                <Dialog>
                                    <DialogTrigger>
                                        <button
                                            type="button"
                                            className="tabbable text-xs flex gap-2 items-center bg-secondary text-foreground hover:bg-background py-1 px-3 rounded-full cursor-pointer"
                                            onClick={profileEditModal.show}
                                        >
                                            <Icon icon={Icons.EDIT} />
                                            {t(
                                                "settings.account.accountDetails.editProfile",
                                            )}
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="!mt-0 !mb-0">
                                                {t(
                                                    "settings.account.profile.title",
                                                )}
                                            </DialogTitle>
                                            <Avatar
                                                profile={{
                                                    colorA: props.colorA,
                                                    colorB: props.colorB,
                                                    icon: props.userIcon,
                                                }}
                                                iconClass="text-2xl"
                                                sizeClass="w-12 h-12"
                                            />
                                        </DialogHeader>
                                        <div className="space-y-6">
                                            <ColorPicker
                                                label={t(
                                                    "settings.account.profile.firstColor",
                                                )}
                                                value={props.colorA}
                                                onInput={props.setColorA}
                                            />
                                            <ColorPicker
                                                label={t(
                                                    "settings.account.profile.secondColor",
                                                )}
                                                value={props.colorB}
                                                onInput={props.setColorB}
                                            />
                                            <IconPicker
                                                label={t(
                                                    "settings.account.profile.userIcon",
                                                )}
                                                value={props.userIcon}
                                                onInput={props.setUserIcon}
                                            />
                                        </div>
                                        <div className="flex justify-center mt-8">
                                            <DialogClose asChild>
                                                <Button className="!px-20">
                                                    {t(
                                                        "settings.account.profile.finish",
                                                    )}
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            }
                        />
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AuthInputBox
                    label={
                        t("settings.account.accountDetails.deviceNameLabel") ??
                        undefined
                    }
                    placeholder={
                        t(
                            "settings.account.accountDetails.deviceNamePlaceholder",
                        ) ?? undefined
                    }
                    value={props.deviceName}
                    onChange={(value) => props.setDeviceName(value)}
                />
            </CardContent>
            <CardFooter>
                <Button
                    variant="destructive"
                    onClick={logout}
                    className="w-full"
                >
                    {t("settings.account.accountDetails.logoutButton")}
                </Button>
            </CardFooter>
        </Card>
    );
}
