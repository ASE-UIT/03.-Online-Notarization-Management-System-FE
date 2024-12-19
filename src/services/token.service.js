import { jwtDecode } from 'jwt-decode';

const getAccessTokenFromURL = (url) => {
  const urlParams = new URLSearchParams(url);
  const token = urlParams.get('token');
  const refreshToken = urlParams.get('refreshToken');

  return { token, refreshToken };
};

const getResetPasswordTokenFromURL = (url) => {
  const urlParams = new URLSearchParams(url);
  const resetPasswordToken = urlParams.get('resetPassword');

  return resetPasswordToken;
};

const decodeToken = (token) => {
  if (token) {
    return jwtDecode(token);
  }
};

const TokenService = {
  getAccessTokenFromURL,
  decodeToken,
  getResetPasswordTokenFromURL,
};

export default TokenService;
