// SPDX-FileCopyrightText: 2023 Awayume <dev@awayume.jp>
// SPDX-License-Identifier: MIT

'use strict';

const { getOctokit, maybeForbidden } = require('./utils');

const send = async (context, message) => {
  const octokit = getOctokit(context);
  const {owner, repo} = context.repo;

  const output = Boolean(message.length) ? {
    title: 'Checklist not complete!',
    summary: message,
  } : {
    title: 'Checklist looks good!',
    summary: 'https://genius.com/images/extreme.jpg',
  };

  const { data: commits } = await maybeForbidden(
    octokit.pulls.listCommits,
    {
      owner,
      repo,
      pull_number
    },
  );

  await maybeForbidden(
    octokit.rest.checks.create,
    {
      owner,
      repo,
      name: 'PR Validation',
      head_sha: commits.at(-1).sha,
      output,
    },
  );
};

module.exports = Object.freeze({
  send,
});
