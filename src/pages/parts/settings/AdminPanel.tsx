import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function AdminPanelPart() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("settings.account.admin.title")}</CardTitle>
        <CardDescription>{t("settings.account.admin.text")}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end items-center">
        <Button variant="default" onClick={() => navigate("/admin")}>
          {t("settings.account.admin.button")}
        </Button>
      </CardFooter>
    </Card>
  );
}
