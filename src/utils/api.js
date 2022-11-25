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
