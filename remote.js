// discord-bot.js
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const express = require('express');
const puppeteer = require('puppeteer');
const os = require('os');

// Konfigurasi yang dapat diubah
const CONFIG = {
  PORT: process.env.PORT || 3001, // Menggunakan port 3001 sebagai default
  DISCORD_TOKEN: 'TOKEN', // Ganti dengan token Discord Anda
  WEBSITE_URL: 'https://nindtz.github.io',
  PREFIX: '!tv'
};

// Inisialisasi Express Server
const app = express();
app.use(express.json());
app.use(require('cors')());

// Inisialisasi Discord Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Channel list dengan detail dan gambar
const TV_CHANNELS = [
  {
    name: 'RCTI',
    description: 'Rajawali Citra Televisi Indonesia',
    image: 'https://i.imgur.com/BW02rIs.jpg',
    switchCommand: 'switchTo1()',
    isLive: true
  },
  {
    name: 'TRANSTV',
    description: 'Trans TV',
    image: 'https://i.imgur.com/3t7r5E7.jpg',
    switchCommand: 'switchTo1()',
    isLive: true
  },
  {
    name: 'ANTV',
    description: 'Andalas Televisi',
    image: 'https://i.imgur.com/SUc7sih.jpg',
    switchCommand: 'switchTo2()',
    isLive: true
  },
  {
    name: 'KOMPASTV',
    description: 'Kompas TV',
    image: 'https://i.imgur.com/lzmoYCG.jpg',
    switchCommand: 'switchTo3()',
    isLive: true
  },
  {
    name: 'GTV',
    description: 'Global TV',
    image: 'https://i.imgur.com/hZ1YU3K.jpg',
    switchCommand: 'switchTo4()',
    isLive: true
  },
  {
    name: 'CNN',
    description: 'CNN Indonesia',
    image: 'https://i.imgur.com/UvGfSE0.jpg',
    switchCommand: 'switchTo5()',
    isLive: true
  },
  {
    name: 'MNCTV',
    description: 'MNCTV',
    image: 'https://www.mncvision.id/userfiles/image/channel/channel_82.png',
    switchCommand: 'switchTo6()',
    isLive: true
  },
  {
    name: 'PRIME',
    description: 'Amazon Prime',
    image: 'https://i.imgur.com/xdXZbW8.jpg',
    switchCommand: 'switchToExtra1()',
    isLive: true
  },
  {
    name: 'LIVE',
    description: 'Live Streaming',
    image: 'https://i.imgur.com/EIKDkEm.jpg',
    switchCommand: 'switchToExtra2()',
    isLive: true
  }
];

// Program acara saat ini (contoh data)
const CURRENT_PROGRAMS = {
  'RCTI': 'Sinetron Ikatan Cinta',
  'TRANSTV': 'CNN Indonesia Tonight',
  'ANTV': 'Kumpulan Emak-Emak Gaul',
  'KOMPASTV': 'Berita Kompas Siang',
  'GTV': 'Indonesian Idol 2025',
  'CNN': 'CNN Update',
  'PRIME': 'The Boys Season 5',
  'LIVE': 'Live Streaming Event'
};

// Puppeteer Variables
let browser;
let page;
let browserStarted = false;

// Function untuk mendapatkan path Chrome berdasarkan OS
function getChromeExecutablePath() {
  const platform = os.platform();
  if (platform === 'win32') {
    // Windows path
    return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  } else if (platform === 'darwin') {
    // macOS path
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  } else {
    // Linux path
    return '/usr/bin/chromium';
  }
}

// Function untuk memulai browser
async function startBrowser(url) {
  try {
    console.log(`Attempting to start browser with URL: ${url}`);
    const chromePath = getChromeExecutablePath();
    
    browser = await puppeteer.launch({
      headless: false,
      executablePath: chromePath,
      args: [
        '--disable-web-security',
        '--enable-widevine',
        '--disable-gpu',
        '--autoplay-policy=no-user-gesture-required',
        '--disable-blink-features=AutomationControlled',
        '--kiosk'
      ],
      defaultViewport: null
    });

    const pages = await browser.pages();
    page = pages.length > 0 ? pages[0] : await browser.newPage();
    
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });
    
    console.log(`Loading ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    console.log('Page loaded successfully. Browser is ready.');
    browserStarted = true;
    return true;
  } catch (error) {
    console.error(`Error starting browser: ${error.message}`);
    return false;
  }
}

// Function untuk mendapatkan info jadwal acara saat ini
const getCurrentPrograms = () => {
  // Di implementasi sebenarnya, Anda mungkin ingin mengambil data ini dari API
  return CURRENT_PROGRAMS;
};

// Function untuk mendapatkan channel berdasarkan nama
const getChannelByName = (name) => {
  return TV_CHANNELS.find(channel => 
    channel.name.toLowerCase() === name.toLowerCase());
};

// Function untuk eksekusi perintah JavaScript di browser
async function executeInBrowser(command) {
  if (!browserStarted || !page) {
    console.error('Browser not started yet!');
    return false;
  }
  
  try {
    console.log(`Executing command: ${command}`);
    await page.evaluate(command);
    return true;
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    return false;
  }
}

// Event when bot is ready
client.once('ready', () => {
  console.log(`Bot is online! Logged in as ${client.user.tag}`);
  client.user.setActivity('TV Indonesia', { type: 'WATCHING' });
});

// Handle message events
client.on('messageCreate', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Check if message mentions the bot
  if (message.mentions.has(client.user)) {
    const content = message.content.trim();
    const args = content.split(' ');
    
    // If just mentioned with no command, show TV guide
    if (args.length === 1) {
      return showTVGuide(message);
    }
    
    // Check for browser restart command
    if (args[1].toLowerCase() === 'start' || args[1].toLowerCase() === 'restart') {
      return handleBrowserStart(message);
    }
    
    // Get channel name from command
    const channelName = args[1].toUpperCase();
    const channel = getChannelByName(channelName);
    
    if (channel) {
      await switchChannel(message, channel);
    } else {
      message.reply(`Channel TV '${channelName}' tidak ditemukan. Ketik !tv untuk melihat daftar channel.`);
    }
    return;
  }
  
  // Check for prefix command
  if (!message.content.startsWith(CONFIG.PREFIX)) return;
  
  const args = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (command === '') {
    // Show TV guide if just prefix
    await showTVGuide(message);
  } else if (command === 'start' || command === 'restart') {
    await handleBrowserStart(message);
  } else {
    // Get channel
    const channel = getChannelByName(command);
    
    if (channel) {
      await switchChannel(message, channel);
    } else {
      message.reply(`Channel TV '${command}' tidak ditemukan. Ketik !tv untuk melihat daftar channel.`);
    }
  }
});

// Handle browser start/restart
async function handleBrowserStart(message) {
  const statusMsg = await message.channel.send('⏳ Memulai browser TV...');
  
  // Close existing browser if it's open
  if (browser) {
    try {
      await browser.close();
      browserStarted = false;
    } catch (error) {
      console.error('Error closing browser:', error);
    }
  }
  
  // Start browser
  const success = await startBrowser(CONFIG.WEBSITE_URL);
  
  if (success) {
    await statusMsg.edit('✅ Browser TV berhasil dimulai! Anda dapat menggunakan bot sekarang.');
  } else {
    await statusMsg.edit('❌ Gagal memulai browser TV. Cek log server untuk detail.');
  }
}

// Function to show TV guide
async function showTVGuide(message) {
  const currentPrograms = getCurrentPrograms();
  
  const embed = new EmbedBuilder()
    .setTitle('📺 JADWAL TV INDONESIA')
    .setDescription('Berikut adalah daftar channel TV yang tersedia. Mention bot dengan nama channel untuk menonton.\nContoh: `@TVRemoteBot GTV`')
    .setColor('#3498db')
    .setTimestamp();
  
  TV_CHANNELS.forEach(channel => {
    const programInfo = currentPrograms[channel.name] || 'Tidak ada info program';
    const statusEmoji = channel.isLive ? '🟢 LIVE' : '⚫ OFF';
    
    embed.addFields({
      name: `${channel.name} - ${statusEmoji}`,
      value: `**Program Saat Ini:** ${programInfo}\n**Deskripsi:** ${channel.description}\n**Command:** @TVRemoteBot ${channel.name}`,
      inline: false
    });
  });
  
  embed.setFooter({ 
    text: 'Terakhir diperbarui', 
    iconURL: 'https://i.imgur.com/AfFp7pu.png' 
  });
  
  await message.channel.send({ embeds: [embed] });
}

// Function to switch channel
async function switchChannel(message, channel) {
  if (!browserStarted) {
    return message.reply('❌ Browser TV belum dimulai. Gunakan `!tv start` untuk memulai browser.');
  }
  
  const currentPrograms = getCurrentPrograms();
  const programInfo = currentPrograms[channel.name] || 'Tidak ada info program';
  
  // Status pesan awal
  const statusMsg = await message.channel.send(`⏳ Sedang beralih ke channel ${channel.name}...`);
  
  // Eksekusi perintah di browser melalui Puppeteer
  const success = await executeInBrowser(channel.switchCommand);
  
  if (success) {
    const embed = new EmbedBuilder()
      .setTitle(`📺 Berhasil beralih ke ${channel.name}`)
      .setDescription(`**Sedang menonton:** ${programInfo}\n**Deskripsi Channel:** ${channel.description}`)
      .setColor('#2ecc71')
      .setImage(channel.image)
      .setTimestamp()
      .setFooter({ 
        text: `Dijalankan: ${channel.switchCommand}`, 
        iconURL: 'https://i.imgur.com/AfFp7pu.png' 
      });
    
    await statusMsg.edit({ 
      content: `✅ <@${message.author.id}> sekarang menonton ${channel.name}`,
      embeds: [embed] 
    });
  } else {
    await statusMsg.edit(`❌ Gagal beralih ke channel ${channel.name}. Browser mungkin telah ditutup atau error.`);
  }
}

// Express API Endpoints
app.post('/press', async (req, res) => {
  if (!browserStarted || !page) return res.status(500).send({ error: 'Browser not started yet!' });
  const { word } = req.body;
  if (!word) return res.status(400).send({ error: 'Missing word parameter' });
  console.log(`Simulating typing: ${word}`);
  await page.keyboard.type(word);
  await page.keyboard.press('Enter');
  res.send({ success: true, message: `Typed word: ${word}` });
});

app.post('/execute', async (req, res) => {
  if (!browserStarted || !page) return res.status(500).send({ error: 'Browser not started yet!' });
  const { command } = req.body;
  if (!command) return res.status(400).send({ error: 'Missing command parameter' });
  
  try {
    console.log(`Executing command: ${command}`);
    await page.evaluate(command);
    res.send({ success: true, message: `Executed: ${command}` });
  } catch (error) {
    res.status(500).send({ error: `Execution failed: ${error.message}` });
  }
});

app.post('/switch', async (req, res) => {
  if (!browserStarted || !page) return res.status(500).send({ error: 'Browser not started yet!' });
  const { channel } = req.body;
  if (!channel) return res.status(400).send({ error: 'Missing channel parameter' });
  
  const tvChannel = getChannelByName(channel);
  if (!tvChannel) {
    return res.status(404).send({ error: `Channel not found: ${channel}` });
  }
  
  try {
    console.log(`Switching to channel: ${tvChannel.name}`);
    await page.evaluate(tvChannel.switchCommand);
    res.send({ 
      success: true, 
      message: `Switched to ${tvChannel.name}`,
      currentProgram: getCurrentPrograms()[tvChannel.name] || 'Unknown program'
    });
  } catch (error) {
    res.status(500).send({ error: `Switch failed: ${error.message}` });
  }
});

// Check if port is in use
const checkPort = (port) => {
  return new Promise((resolve) => {
    const server = require('net').createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    
    server.listen(port);
  });
};

// Find available port starting from the configured port
const findAvailablePort = async (startPort) => {
  let port = startPort;
  while (!(await checkPort(port)) && port < startPort + 100) {
    port++;
  }
  return port;
};

// Start server & log in to Discord
async function startApp() {
  try {
    // Find available port
    const port = await findAvailablePort(CONFIG.PORT);
    
    if (port !== CONFIG.PORT) {
      console.log(`Port ${CONFIG.PORT} is in use, using port ${port} instead.`);
      CONFIG.PORT = port;
    }
    
    // Start Express server
    app.listen(port, async () => {
      console.log(`🚀 API listening on http://localhost:${port}`);
      
      // Log in to Discord
      try {
        await client.login(CONFIG.DISCORD_TOKEN);
        console.log('Discord bot logged in successfully');
      } catch (error) {
        console.error('Failed to log in to Discord:', error);
      }
    });
  } catch (error) {
    console.error('Error starting application:', error);
  }
}

// Add a status endpoint
app.get('/status', (req, res) => {
  res.json({
    botOnline: client.isReady() || false,
    browserStarted,
    port: CONFIG.PORT,
    channels: TV_CHANNELS.map(c => c.name)
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  
  if (browser) {
    await browser.close();
  }
  
  process.exit(0);
});

// Start the application
startApp();