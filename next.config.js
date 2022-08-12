module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*/",
        destination: "http://xrxrxrxr.suniyidrok.uz/api/:path*/",
      },
    ];
  };

  return {
    trailingSlash: true,
    rewrites,
  };
};
