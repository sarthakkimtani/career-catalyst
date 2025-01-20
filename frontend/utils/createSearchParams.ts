export const createSearchParams = (
  params: { [key: string]: string | string[] | undefined } | undefined
): URLSearchParams => {
  const urlSearchParams = new URLSearchParams();

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((item) => urlSearchParams.append(key, item));
      } else if (value !== undefined) {
        urlSearchParams.set(key, value);
      }
    }
  }

  return urlSearchParams;
};
