// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Octokit, App } from "octokit";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  // 1. text -> PR 번호가 숫자로 변환 가능한지 검수
  // 2. PR 번호로 kurlymall-nx 에서 조회
  // 3. 조회된 PR 정보에서 제목과 링크를 추출하여 메세지 구성
  // TODO: 한번 생성된 메세지에 인터렉티브하게 사용자 입력을 받거나 업데이트 하려면 어떻게 해야할지 ?

  // TODO: Github 인증에 실패한 경우
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });

  // TODO: text 숫자 변환에 실패한 경우 처리
  const pullRequest = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner: "thefarmersfront",
      repo: "kurlymall-nx",
      pull_number: Number(text),
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const {
    data: { title, html_url },
  } = pullRequest;

  // NOTE: 리뷰 상태에 따른 업데이트

  res.status(200).send({
    response_type: "in_channel",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `📢 동네사람덜 리뷰해주세유 📢 `,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `[${title}](${html_url})`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `🦮 왕 하면 왕 대답함 🐕‍🦺 : ${text}`,
        },
      },
    ],
  });
};

export default handler;
