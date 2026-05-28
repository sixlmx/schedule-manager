export const parseUrl = (url) => {
  const { pathname } = new URL(url);
  const parts = pathname.split('/').filter(Boolean);

  if (parts[1] === 'publications') {
    const publicId = parts[2] ?? null;
    return {
      base: parts[0],
      publicId,
      publicBase: publicId ? `/public/publications/${publicId}` : '/public',
      category: parts[3] ?? null,
      id: parts[4] ?? null,
    };
  }

  return {
    base: parts[0],
    publicId: null,
    publicBase: '/public',
    category: parts[1] ?? null,
    id: parts[2] ?? null,
  };
};
