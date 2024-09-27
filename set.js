const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || ' eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUpRRTRMTUhEY0tqQkJvNEhaSkNjSXFDdWlXdzdEV0lxdG0xMmN3VGlITT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2lZMCtSbVNOTE9pWnNxZlU1YlY4T2VPcldyekhsMWlieU9qN1FJL0dWcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTXNSSlAzb09udmF2MUJHVXJXWDVvZkNVTFFIdC9sdm1OKzQwRlpscjFNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6V3VwZFRUK0lJdlIvSTBGelFhdEQwZDFPaWsxZWhWbWZxNFROYXluUVI4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhBNXNJSEV6clRtck1LTlpFNThLVlpPNE5VT1ZPVUlWUHphL3RPUWwwVzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlA4dlM0OFE3TlVUUThNSlo4eEd2OEtJaDlEbS91ODVoUDBuOGpjdjdCSHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUFvWStQWURmUXJvTEtnVXlWNVVwbnUzMHhMNE5LcjlHUFR2S2ZmdzRIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUml3ZXc2TkhWQndCS2tGNFVTektDYWVKQ2hTSTVpem01OUFGcU95by8yND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRBZWEzT202bGc1TGErZGFWN2RZR0NNMTBTbmJnRS8vOG9tS2hrRVpldVhBZTZVNk1tV2M2eG5sQmZPMGNxRkxEcDhSa1J3NkIwS2p0eEhTck1JcENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJDVmh2UWVzZE9jbThBNEh2cm5adkxXSzd5WGdNQjVnRE1zZnNjcVQ4UjFnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxNFlFMkR1M1RXYUFnLU5DaTZEcXVnIiwicGhvbmVJZCI6IjBiNmZiN2E2LTA3ODMtNDY1ZC1hOGJhLTI0OWY4NzUyZDhmZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQV3ZZL1NCbUR0UUkrY3p3ZlQvRTFGQ1pVTGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3BXcDVUT2hRZ0RjR3UrTWhhV3FQK1JrTDdFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRYTjZEWFZHIiwibWUiOnsiaWQiOiIyNjM3ODk2NjEwMTM6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJUZWVtYW4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09tdW14VVFwdGZZdHdZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InF2cEtPMXZNbWdVb0d4Zk5RNk5Pem94cklPalYwT0VPU0FnWmpTbmxwRms9IiwiYWNjb3VudFNpZ25hdHVyZSI6InpqQkkyMXc3UDBwY1pMTEExZHlTWmRvQUM2QmF4dFpyZWJ6RnF2YytlMmhlT1FnT05CL0cvSG15RTlPN1FRWGZDUURWQlY0YXZFWWh2OHNZS2VKeENBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtZ1RxeUNia3lZUUw1L2NVYzdOZ0NQM1B4MFJGRUk5WUdiVThNUXZuTUEralpDTzRmT2xxRUJTeVhtSWI2NlNNaDYrNlZSazBpZnZobEJZWWs5OTdBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4OTY2MTAxMzoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFyNlNqdGJ6Sm9GS0JzWHpVT2pUczZNYXlEbzFkRGhEa2dJR1kwcDVhUloifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc0MDkwNzZ9  ',
    PREFIXE: process.env.PREFIX || "#",
    OWNER_NAME: process.env.OWNER_NAME || "TEEMAN",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "SOCIAL .tm. TODAY",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Social Today Technologies',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/926c7a8ad7ff624c144b7.jpg,https://telegra.ph/file/187cfa2365d88ffe98fec.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
