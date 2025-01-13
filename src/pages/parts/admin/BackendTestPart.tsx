import { useState } from "react";
import { useAsyncFn } from "react-use";

import { MetaResponse, getBackendMeta } from "@/backend/accounts/meta";
import { Button } from "@/components/ui/button";
import { Icon, Icons } from "@/components/Icon";
import { Box } from "@/components/layout/Box";
import { Divider } from "@/components/utils/Divider";
import { Heading2 } from "@/components/utils/Text";
import { conf } from "@/setup/config";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function BackendTestPart() {
  const backendUrl = conf().BACKEND_URL;

  const [status, setStatus] = useState<{
    hasTested: boolean;
    success: boolean;
    errorText: string;
    value: MetaResponse | null;
  }>({
    hasTested: false,
    success: false,
    errorText: "",
    value: null,
  });

  const [testState, runTests] = useAsyncFn(async () => {
    setStatus({
      hasTested: false,
      success: false,
      errorText: "",
      value: null,
    });

    if (!backendUrl) {
      return setStatus({
        hasTested: true,
        success: false,
        errorText: "Backend URL is not set",
        value: null,
      });
    }

    try {
      const backendData = await getBackendMeta(backendUrl);
      return setStatus({
        hasTested: true,
        success: true,
        errorText: "",
        value: backendData,
      });
    } catch (err) {
      return setStatus({
        hasTested: true,
        success: false,
        errorText:
          "Failed to call backend, double check the URL, your internet connection, and ensure CORS is properly configured on your backend.",
        value: null,
      });
    }
  }, [setStatus]);

  return (
      <Card>
        <CardHeader>
            <CardTitle>Backend API test</CardTitle>
            <CardDescription>Validate your backend is properly working</CardDescription>
        </CardHeader>
        <CardContent>
            {status.hasTested && status.success ? (
              <>
                <p>
                  <span className="inline-block w-36 text-foreground font-medium">
                    Version:
                  </span>
                  {status.value?.version}
                </p>
                <p>
                  <span className="inline-block w-36 text-foreground font-medium">
                    Backend name:
                  </span>
                  {status.value?.name}
                </p>
                <p>
                  <span className="inline-block w-36 text-foreground font-medium">
                    Description:
                  </span>
                  {status.value?.description ?? "Not set"}
                </p>
                <p>
                  <span className="inline-block w-36 text-foreground font-medium">
                    Captcha enabled:
                  </span>
                  {status.value?.hasCaptcha ? "Yes" : "No"}
                </p>
                <Divider />
              </>
            ) : null}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {!status.hasTested ? (
            <p>Run the test to validate backend</p>
          ) : status.success ? (
            <p className="flex items-center text-md">
              <Icon
                icon={Icons.CIRCLE_CHECK}
                className="text-video-scraping-success mr-2"
              />
              Backend is working as expected
            </p>
          ) : (
            <div>
              <p className="text-foreground font-bold underline w-full mb-3 flex items-center gap-1">
                <Icon
                  icon={Icons.CIRCLE_EXCLAMATION}
                  className="text-destructive mr-2"
                />
                Backend is not working
              </p>
              <p className="text-destructive">ERROR: {status.errorText}</p>
            </div>
          )}
          <Button
            className="whitespace-nowrap"
            onClick={runTests}
          >
            Test backend
          </Button>
        </CardFooter>
      </Card>
  );
}
