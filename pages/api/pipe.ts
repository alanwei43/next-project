import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<string>>
) {
  let body: RequestBody;
  if (req.method?.toUpperCase() === "GET") {
    body = {
      method: (req.query.method || "GET") + "",
      url: req.query.url + "",
      headers: JSON.parse((req.query.headers || "{}") + "")
    };
  } else {
    body = req.body;
  }
  console.log("body: ", body);
  const response = await fetch(body.url, {
    method: body.method,
    headers: body.headers,
    redirect: "manual"
  });
  const data = await response.arrayBuffer();
  const headers: Record<string, string> = {
    "access-control-allow-credentials": "true",
    "access-control-allow-headers": "*",
    "access-control-allow-methods": req.method || "*",
    "access-control-allow-origin": (req.query.corsOrigin || "*") + "",
  };
  const whiteHeaders = [
    "age",
    "cache-control",
    "content-type",
    "date",
    "expires",
  ];
  for (let [key, value] of Array.from(response.headers.entries())) {
    console.log(key, value);
    if (typeof value !== "string") {
      continue;
    }
    if (!whiteHeaders.includes(key.toLowerCase())) {
      continue;
    }
    headers[key] = value;
  }

  res.writeHead(response.status, response.statusText, headers)
    .end(Buffer.from(data));
}

type RequestBody = {
  method: string
  url: string
  headers: Record<string, string>
}