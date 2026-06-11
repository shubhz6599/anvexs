// ============================================
// ANVEXS - Production Environment
// ============================================
export const environment = {
  production: true,
  apiUrl: 'https://api.anvexs.com/api',
  apiUrl1: 'https://api.anvexs.com',
  aesKey: '${AES_SECRET_KEY}',  // Injected at build time via CI/CD
  aesIv: '${AES_IV}',
  googleClientId:'99767736709-t6jh642moqu6ae6bacd92t8rmhjh2qf4.apps.googleusercontent.com'
};
