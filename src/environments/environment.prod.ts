export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATA_BASE_URL",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID"
  }
};

export const apiAdresses = {
  // server adress
  root: 'https://us-central1-lel-enxoctrl.cloudfunctions.net',
  firebase: '/api/firebase',
  gerencianet: '/api/gerencianet',
  
  // main routes 
  clientes: '/clientes',
  registros: '/registros',
  faturas: '/faturas',
  tabelasDePreco: '/tabelas-de-preco',
  pecas: '/pecas',
  pi: '/pi',
  faturamento: '/faturamento'
}
