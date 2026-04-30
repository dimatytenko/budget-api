const servers = {
  servers: [
    {
      url: process.env.CLIENT_URL || 'http://localhost:8080',
      description: 'Primary API server from CLIENT_URL',
    },
  ],
};

export default servers;
