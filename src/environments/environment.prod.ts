// ============================================
// ANVEXS - Production Environment
// ============================================
export const environment = {
  production: true,
  apiUrl: 'https://api.anvexs.com/api',
  apiUrl1: 'https://api.anvexs.com',
  aesKey: '${AES_SECRET_KEY}',  // Injected at build time via CI/CD
  aesIv: '${AES_IV}',
};