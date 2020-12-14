export const jwtConstants = {
  secret: 'secretKey',
  expiresIn: '1h',
  expiresRefreshTokenIn: '12h',
};

export const jwtRegister = {
  secret: jwtConstants.secret,
  signOptions: { expiresIn: jwtConstants.expiresIn },
};
