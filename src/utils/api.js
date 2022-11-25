export const get = (urlPath, queryData) => {
  return fetch(urlPath + '?' + new URLSearchParams(queryData), {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer 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',
    },
  }).then((r) => {
    return r.json();
  });
};
