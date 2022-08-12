module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*/",
        destination: "http://exex.suniyidrok.uz/api/:path*/",
      },
    ];
  };

  return {
    trailingSlash: true,
    rewrites,
  };
};
