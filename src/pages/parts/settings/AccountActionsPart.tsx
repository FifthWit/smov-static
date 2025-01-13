import { useTranslation } from "react-i18next";
import { useAsyncFn } from "react-use";

import { deleteUser } from "@/backend/accounts/user";
import { Button } from "@/components/ui/button";
import { SolidSettingsCard } from "@/components/layout/SettingsCard";
import { useModal } from "@/components/overlays/Modal";
import { Heading2, Heading3, Paragraph } from "@/components/utils/Text";
import { useAuthData } from "@/hooks/auth/useAuthData";
import { useBackendUrl } from "@/hooks/auth/useBackendUrl";
import { useAuthStore } from "@/stores/auth";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function AccountActionsPart() {
  const { t } = useTranslation();
  const url = useBackendUrl();
  const account = useAuthStore((s) => s.account);
  const { logout } = useAuthData();
  const deleteModal = useModal("account-delete");

  const [deleteResult, deleteExec] = useAsyncFn(async () => {
    if (!account || !url) return;
    await deleteUser(url, account);
    await logout();
    deleteModal.hide();
  }, [logout, account, url, deleteModal.hide]);

  if (!account) return null;

  return (
    <div>
      <Heading2 border>{t("settings.account.actions.title")}</Heading2>
      <Card>
        <CardHeader>
            <CardTitle>{t("settings.account.actions.delete.title")}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t("settings.account.actions.delete.text")}
              </CardDescription>
        </CardHeader>
        <CardFooter>
            <Dialog>
                <DialogTrigger>
                    <Button variant="destructive">
                        {t("settings.account.actions.delete.button")}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="!mt-0">
                    {t("settings.account.actions.delete.confirmTitle")}
                  </DialogHeader>
                  <DialogDescription>
                    {t("settings.account.actions.delete.confirmDescription")}
                  </DialogDescription>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      onClick={deleteExec}
                      type="submit"
                    >
                      {t("settings.account.actions.delete.confirmButton")}
                    </Button>
                  </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
