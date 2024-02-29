// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers, body } = req;
  if (method !== "POST") {
    return res.status(404);
  }
  const contentType = headers["content-type"];
  if (contentType !== "application/x-www-form-urlencoded") {
    return res.status(404);
  }
  /** /테스트_상품프론트_nx_pr 123 인 경우
  token: 'vkN26UCMzi0drNVBw87R9auf',
  team_id: 'T3ZPFBBPV',
  team_domain: 'marketkurly',
  channel_id: 'C053AUA54RE',
  channel_name: 'team_web2_main',
  user_id: 'U03KVL0P5V5',
  user_name: 'seungjae.yuk',
  command: '/테스트_상품프론트_nx_pr',
  text: '123',
  api_app_id: 'A06M4SUACQ5',
  is_enterprise_install: 'false',
  response_url: 'https://hooks.slack.com/commands/T3ZPFBBPV/6745235981312/CYUSYadzyJ5gC5Er1w5pTRnK',
  trigger_id: '6724902147332.135797385811.d3ac7b93fb6b823b5f805c1b055a01f6' */
  const { text } = body;
  res.status(200).send({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `요청 - ${text}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "왕 하면 왕 짖는 멍뭉이",
        },
      },
    ],
  });
}
