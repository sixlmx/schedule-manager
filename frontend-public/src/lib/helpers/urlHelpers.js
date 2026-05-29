export const parseUrl = (url) => {
  const { pathname } = new URL(url);
  const [, base, category, id] = pathname.split('/');
  return { base, category, id };
};
