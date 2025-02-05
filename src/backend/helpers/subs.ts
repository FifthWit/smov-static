import { list } from "subsrt-ts";

import { proxiedFetch } from "@/backend/helpers/fetch";
import { convertSubtitlesToSrt } from "@/components/player/utils/captions";
import { CaptionListItem } from "@/stores/player/slices/source";
import { SimpleCache } from "@/utils/cache";

import {
    isExtensionActiveCached,
    sendExtensionRequest,
} from "../extension/messaging";

export const subtitleTypeList = list().map((type) => `.${type}`);
const downloadCache = new SimpleCache<string, string>();
downloadCache.setCompare((a, b) => a === b);
const expirySeconds = 24 * 60 * 60;

/**
 * Always returns SRT
 */
export async function downloadCaption(
    caption: CaptionListItem,
): Promise<string> {
    const cached = downloadCache.get(caption.url);
    if (cached) return cached;

    let data: string | undefined;
    if (caption.needsProxy) {
        if (isExtensionActiveCached()) {
            const extensionResponse = await sendExtensionRequest({
                url: caption.url,
                method: "GET",
            });
            if (
                !extensionResponse?.success ||
                typeof extensionResponse.response.body !== "string"
            ) {
                throw new Error("failed to get caption data from extension");
            }

            data = extensionResponse.response.body;
        } else {
            data = await proxiedFetch<string>(caption.url, {
                responseType: "text",
            });
        }
    } else {
        data = await fetch(caption.url).then((v) => v.text());
    }
    if (!data) throw new Error("failed to get caption data");

    const output = convertSubtitlesToSrt(data);
    downloadCache.set(caption.url, output, expirySeconds);
    return output;
}

/**
 * Downloads the WebVTT content. No different than a simple
 * get request with a cache.
 */
export async function downloadWebVTT(url: string): Promise<string> {
    const cached = downloadCache.get(url);
    if (cached) return cached;

    const data = await fetch(url).then((v) => v.text());
    return data;
}
