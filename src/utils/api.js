import { Base64 } from 'js-base64';
let token =
  'Z2l0aHViX3BhdF8xMUFRM1pRQkEwN2ZFbjFRT045S3JPXzdhNnc2aDRRRUJMUmdyMUZxaEVURGFmb1hlcWd4eGxoRG01REZjelNYNnBIUkNZT0JKMnhITmNXaVBZ';

let decStr = Base64.decode(token);
export const get = (urlPath, queryData) => {
  return fetch(urlPath + '?' + new URLSearchParams(queryData), {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer ' + decStr,
    },
  }).then((r) => {
    return r.json();
  });
};
