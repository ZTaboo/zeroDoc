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
