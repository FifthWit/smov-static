import { useState } from "react";
import { useAsyncFn } from "react-use";

import { getMediaDetails } from "@/backend/metadata/tmdb";
import { TMDBContentTypes } from "@/backend/metadata/types/tmdb";
import { Button } from "@/components/ui/button";
import { Icon, Icons } from "@/components/Icon";
import { Box } from "@/components/layout/Box";
import { Spinner } from "@/components/layout/Spinner";
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

export function TMDBTestPart() {
  const tmdbApiKey = conf().TMDB_READ_API_KEY;
  const [status, setStatus] = useState({
    hasTested: false,
    success: false,
    errorText: "",
  });

  const [testState, runTests] = useAsyncFn(async () => {
    setStatus({
      hasTested: false,
      success: false,
      errorText: "",
    });

    if (!tmdbApiKey || tmdbApiKey.length === 0) {
      return setStatus({
        hasTested: true,
        success: false,
        errorText: "TMDB API key is not set",
      });
    }
    const isJWT = tmdbApiKey.split(".").length > 2;
    if (!isJWT) {
      return setStatus({
        hasTested: true,
        success: false,
        errorText: "TMDB API key is not a read only key",
      });
    }

    try {
      await getMediaDetails("556574", TMDBContentTypes.MOVIE);
    } catch (err) {
      return setStatus({
        hasTested: true,
        success: false,
        errorText:
          "Failed to call TMDB, double check API key and your internet connection",
      });
    }

    return setStatus({
      hasTested: true,
      success: true,
      errorText: "",
    });
  }, [tmdbApiKey, setStatus]);

  return (
      <Card>
          <CardHeader className="flex-1">
                <CardTitle>TMDB Test</CardTitle>
                {!status.hasTested ? (
                  <CardDescription>Run the test to validate TMDB</CardDescription>
                ) : status.success ? (
                  <CardDescription className="flex items-center">
                    <Icon
                      icon={Icons.CIRCLE_CHECK}
                      className="text-video-scraping-success mr-2"
                    />
                    TMDB is working as expected
                  </CardDescription>
                ) : (
                  <>
                    <CardDescription className="text-foreground font-bold w-full mb-3 flex items-center gap-1">
                      <Icon
                        icon={Icons.CIRCLE_EXCLAMATION}
                        className="text-video-scraping-error mr-2"
                      />
                      TMDB is not working
                    </CardDescription>
                    <CardDescription className="text-destructive">ERROR: {status.errorText}</CardDescription>
                  </>
                )}
          </CardHeader>
          <CardFooter className="flex justify-end items-center">
              <Button onClick={runTests}>
                {testState.loading ? <Spinner className="text-base mr-2" /> : null}
                Test TMDB
              </Button>
          </CardFooter>
      </Card>
  );
}
