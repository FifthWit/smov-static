import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAsyncFn } from "react-use";

import { SessionResponse } from "@/backend/accounts/auth";
import { base64ToBuffer, decryptData } from "@/backend/accounts/crypto";
import { removeSession } from "@/backend/accounts/sessions";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/layout/Loading";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { SecondaryLabel } from "@/components/text/SecondaryLabel";
import { Heading2 } from "@/components/utils/Text";
import { useBackendUrl } from "@/hooks/auth/useBackendUrl";
import { useAuthStore } from "@/stores/auth";

export function Device(props: {
    name: string;
    id: string;
    isCurrent?: boolean;
    onRemove?: () => void;
}) {
    const { t } = useTranslation();
    const url = useBackendUrl();
    const token = useAuthStore((s) => s.account?.token);
    const [result, exec] = useAsyncFn(async () => {
        if (!token) throw new Error("No token present");
        if (!url) throw new Error("No backend set");
        await removeSession(url, token, props.id);
        props.onRemove?.();
    }, [url, token, props.id]);

    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle>
                    <p className="text-muted-foreground">
                        {t("settings.account.devices.deviceNameLabel")}:
                    </p>
                    {props.name}
                </CardTitle>
            </CardHeader>
            {!props.isCurrent ? (
                <CardFooter>
                    <Button variant="destructive" onClick={exec}>
                        {t("settings.account.devices.removeDevice")}
                    </Button>
                </CardFooter>
            ) : null}
        </Card>
    );
}

export function DeviceListPart(props: {
    loading?: boolean;
    error?: boolean;
    sessions: SessionResponse[];
    onChange?: () => void;
}) {
    const { t } = useTranslation();
    const seed = useAuthStore((s) => s.account?.seed);
    const sessions = props.sessions;
    const currentSessionId = useAuthStore((s) => s.account?.sessionId);
    const deviceListSorted = useMemo(() => {
        if (!seed) return [];
        let list = sessions.map((session) => {
            const decryptedName = decryptData(
                session.device,
                base64ToBuffer(seed),
            );
            return {
                current: session.id === currentSessionId,
                id: session.id,
                name: decryptedName,
            };
        });
        list = list.sort((a, b) => {
            if (a.current) return -1;
            if (b.current) return 1;
            return a.name.localeCompare(b.name);
        });
        return list;
    }, [seed, sessions, currentSessionId]);
    if (!seed) return null;

    return (
        <div>
            <Heading2 border className="mt-0 mb-9">
                {t("settings.account.devices.title")}
            </Heading2>
            {props.error ? (
                <p>{t("settings.account.devices.failed")}</p>
            ) : props.loading ? (
                <Loading />
            ) : (
                <div className="flex flex-wrap flex-grow gap-4">
                    {deviceListSorted.map((session) => (
                        <Device
                            name={session.name}
                            id={session.id}
                            key={session.id}
                            isCurrent={session.current}
                            onRemove={props.onChange}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
