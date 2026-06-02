// ============================================
// ANVEXS - Production Environment
// ============================================
export const environment = {
  production: true,
  apiUrl: 'https://api.anvexs.com/api',
  aesKey: '${AES_SECRET_KEY}',  // Injected at build time via CI/CD
  aesIv: '${AES_IV}',
};