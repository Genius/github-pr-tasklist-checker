// SPDX-FileCopyrightText: 2023 Awayume <dev@awayume.jp>
// SPDX-License-Identifier: MIT

'use strict';

const { getOctokit, maybeForbidden } = require('./utils');

const send = async (context, message) => {
  if (message) {
    console.error(message);
    return process.exit(1);
  }

  console.log('https://genius.com/images/extreme.jpg');
};

module.exports = Object.freeze({
  send,
});
