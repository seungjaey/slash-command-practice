// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers, body } = req;
  if (method !== "POST") {
    return res.status(404);
  }
  console.log("debug : body");
  console.log(headers);
  console.log(body);
  res.status(200).send("ok");
}
