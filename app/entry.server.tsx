import { PassThrough } from "stream";
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { renderToPipeableStream } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve) => {
    const { pipe } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          const body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html");
          resolve(new Response(body, { status: responseStatusCode, headers: responseHeaders }));
          pipe(body);
        },
      }
    );
  });
}