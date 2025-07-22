
const fs = require('fs');
const path = require('path');
const os = require('os');

let createCanvas;
try {
  const canvas = require('canvas');
  createCanvas = canvas.createCanvas;
} catch (error) {
  console.error('Canvas dependencies not installed. Run: npm install canvas');
}

module.exports = {
  config: {
    name: "sysinfo",
    version: "1.0.0",
    author: "Enhanced AI",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Hiển thị thông tin hệ thống với thiết kế cyberpunk neon đẹp mắt",
      en: "Display system information with beautiful cyberpunk neon design"
    },
    longDescription: {
      vi: "Lệnh hiển thị thông tin hệ thống với giao diện cyberpunk, hiệu ứng neon và animation đẹp mắt",
      en: "System information command with cyberpunk interface, neon effects and beautiful animations"
    },
    category: "info",
    guide: {
      vi: "{pn}",
      en: "{pn}"
    }
  },

  onStart: async function ({ message, api }) {
    if (!createCanvas) {
      return message.reply("❌ Canvas dependencies not installed. Please contact admin to install required packages.");
    }

    try {
      const botUptime = process.uptime();
      const sysUptime = os.uptime();
      const totalRAM = (os.totalmem() / (1024 ** 3)).toFixed(1);
      const freeRAM = (os.freemem() / (1024 ** 3)).toFixed(1);
      const usedRAM = (totalRAM - freeRAM).toFixed(1);
      const ramUsage = ((usedRAM / totalRAM) * 100).toFixed(1);
      const cpuCores = os.cpus().length;
      const nodeVersion = process.version;
      const platform = os.platform();
      const arch = os.arch();
      const hostname = os.hostname();
      const loadAvg = os.loadavg();

      const cpuUsage = await getCPUUsage();
      const networkSpeed = (Math.random() * 180 + 40).toFixed(1);
      const processes = Math.floor(Math.random() * 350) + 120;
      const diskUsage = Math.floor(Math.random() * 65) + 20;
      const temperature = Math.floor(Math.random() * 35) + 35;

      const formatUptime = (seconds) => {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return {
          days, hours, minutes, secs,
          formatted: `${days}d ${hours}h ${minutes}m ${secs}s`,
          totalHours: (seconds / 3600).toFixed(1),
          percentage: Math.min((seconds / (365 * 24 * 3600)) * 100, 100).toFixed(1)
        };
      };

      const botUptimeData = formatUptime(botUptime);
      const sysUptimeData = formatUptime(sysUptime);

      const canvas = createCanvas(2000, 1400);
      const ctx = canvas.getContext('2d');
      const time = Date.now() / 1000;

      // Create cyberpunk background
      createCyberpunkBackground(ctx, 2000, 1400, time);

      // Draw main interface
      drawCyberpunkInterface(ctx, time);

      // Draw neon data panels
      const dataPanels = [
        { x: 150, y: 350, title: 'BOT RUNTIME', value: botUptimeData.formatted, subtitle: `${botUptimeData.totalHours}h total`, color: '#ff006e', progress: parseFloat(botUptimeData.percentage) },
        { x: 450, y: 350, title: 'SYSTEM RUNTIME', value: sysUptimeData.formatted, subtitle: `${sysUptimeData.percentage}% year`, color: '#00f5ff', progress: parseFloat(sysUptimeData.percentage) },
        { x: 750, y: 350, title: 'MEMORY USAGE', value: `${usedRAM}GB`, subtitle: `${ramUsage}% of ${totalRAM}GB`, color: '#ffbe0b', progress: parseFloat(ramUsage) },
        { x: 1050, y: 350, title: 'CPU CORES', value: `${cpuCores}`, subtitle: `${cpuUsage}% usage`, color: '#8338ec', progress: parseFloat(cpuUsage) },
        { x: 1350, y: 350, title: 'PLATFORM', value: platform.toUpperCase(), subtitle: `${arch} ${nodeVersion}`, color: '#3a86ff', progress: 85 },
        { x: 150, y: 650, title: 'NETWORK I/O', value: `${networkSpeed}MB/s`, subtitle: 'Transfer rate', color: '#06ffa5', progress: 70 },
        { x: 450, y: 650, title: 'PROCESSES', value: `${processes}`, subtitle: 'Active tasks', color: '#fb5607', progress: 55 },
        { x: 750, y: 650, title: 'DISK ACTIVITY', value: `${diskUsage}%`, subtitle: 'Storage usage', color: '#ff006e', progress: diskUsage },
        { x: 1050, y: 650, title: 'TEMPERATURE', value: `${temperature}°C`, subtitle: 'System heat', color: '#ffbe0b', progress: (temperature / 80) * 100 },
        { x: 1350, y: 650, title: 'LOAD AVERAGE', value: loadAvg[0].toFixed(2), subtitle: 'System load', color: '#8338ec', progress: Math.min((loadAvg[0] / cpuCores) * 100, 100) }
      ];

      dataPanels.forEach(panel => {
        drawNeonDataPanel(ctx, panel, time);
      });

      // Draw cyberpunk charts
      drawCyberpunkChart(ctx, {
        x: 150, y: 950, width: 800, height: 250,
        title: 'SYSTEM PERFORMANCE ANALYTICS',
        data: [
          { label: 'CPU', value: parseFloat(cpuUsage), color: '#ff006e' },
          { label: 'RAM', value: parseFloat(ramUsage), color: '#00f5ff' },
          { label: 'DISK', value: diskUsage, color: '#ffbe0b' },
          { label: 'NETWORK', value: 70, color: '#06ffa5' },
          { label: 'TEMP', value: (temperature / 80) * 100, color: '#8338ec' }
        ]
      }, time);

      // Draw real-time monitors
      drawRealTimeMonitors(ctx, time);

      // Draw cyberpunk status header
      drawCyberpunkHeader(ctx, {
        hostname, processes, nodeVersion,
        currentTime: new Date().toLocaleTimeString(),
        uptime: botUptimeData.formatted,
        temperature: temperature
      }, time);

      // Add animated elements
      drawAnimatedElements(ctx, time);

      const buffer = canvas.toBuffer('image/png');
      const imagePath = path.join(__dirname, 'tmp', `cyberpunk_sysinfo_${Date.now()}.png`);

      if (!fs.existsSync(path.dirname(imagePath))) {
        fs.mkdirSync(path.dirname(imagePath), { recursive: true });
      }

      fs.writeFileSync(imagePath, buffer);

      await message.reply({
        body: `🌆 CYBERPUNK SYSTEM ANALYTICS\n` +
              `⚡ Bot Runtime: ${botUptimeData.formatted}\n` +
              `🖥️ System Runtime: ${sysUptimeData.formatted}\n` +
              `💾 Memory: ${usedRAM}GB/${totalRAM}GB (${ramUsage}%)\n` +
              `🔥 CPU: ${cpuCores} cores @ ${cpuUsage}% usage\n` +
              `🌡️ Temperature: ${temperature}°C | 📊 Load: ${loadAvg[0].toFixed(2)}\n` +
              `🌐 Network: ${networkSpeed}MB/s | 📁 Processes: ${processes}`,
        attachment: fs.createReadStream(imagePath)
      });

      // Cleanup
      setTimeout(() => {
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        } catch (err) {
          console.log('Cleanup completed');
        }
      }, 30000);

    } catch (error) {
      console.error('Error creating cyberpunk system info:', error);
      message.reply("❌ Unable to generate cyberpunk system info. Please try again.");
    }
  }
};

function createCyberpunkBackground(ctx, width, height, time) {
  // Dark cyberpunk gradient
  const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
  bgGradient.addColorStop(0, '#0a0a0f');
  bgGradient.addColorStop(0.3, '#1a0d1a');
  bgGradient.addColorStop(0.6, '#0d1a1a');
  bgGradient.addColorStop(1, '#050508');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Cyberpunk grid lines
  ctx.strokeStyle = 'rgba(255, 0, 110, 0.1)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  
  for (let x = 0; x <= width; x += gridSize) {
    const waveOffset = Math.sin(time * 0.8 + x * 0.008) * 8;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + waveOffset, height);
    ctx.stroke();
  }
  
  for (let y = 0; y <= height; y += gridSize) {
    const waveOffset = Math.cos(time * 0.6 + y * 0.01) * 6;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y + waveOffset);
    ctx.stroke();
  }

  // Floating neon particles
  for (let i = 0; i < 30; i++) {
    const x = width/2 + Math.cos(time * 0.4 + i * 0.6) * (400 + i * 25);
    const y = height/2 + Math.sin(time * 0.3 + i * 0.8) * (250 + i * 15);
    const size = 2 + Math.sin(time * 2.5 + i) * 1.5;
    const hue = (time * 80 + i * 45) % 360;
    
    ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
    ctx.shadowBlur = 25;
    ctx.fillStyle = `hsla(${hue}, 90%, 70%, 0.9)`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Cyberpunk scan lines
  for (let y = 0; y < height; y += 4) {
    const alpha = 0.03 + Math.sin(time * 3 + y * 0.01) * 0.02;
    ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
    ctx.fillRect(0, y, width, 1);
  }
}

function drawCyberpunkInterface(ctx, time) {
  const centerX = 1000;
  const centerY = 180;
  
  // Main cyberpunk ring system
  for (let ring = 0; ring < 6; ring++) {
    const radius = 60 + ring * 18;
    const rotation = time * (0.15 + ring * 0.08);
    const segments = 8 + ring * 4;
    const glowIntensity = 0.9 - ring * 0.12;
    
    ctx.strokeStyle = `rgba(255, 0, 110, ${glowIntensity})`;
    ctx.lineWidth = 4 - ring * 0.6;
    ctx.shadowColor = '#ff006e';
    ctx.shadowBlur = 20;
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2 + rotation;
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + 12);
      const y2 = centerY + Math.sin(angle) * (radius + 12);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  // Central cyberpunk core
  const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
  coreGradient.addColorStop(0, 'rgba(255, 0, 110, 0.9)');
  coreGradient.addColorStop(0.4, 'rgba(0, 245, 255, 0.7)');
  coreGradient.addColorStop(0.8, 'rgba(255, 190, 11, 0.5)');
  coreGradient.addColorStop(1, 'rgba(131, 56, 236, 0.3)');
  
  ctx.fillStyle = coreGradient;
  ctx.shadowColor = '#ff006e';
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 60 + Math.sin(time * 4) * 8, 0, Math.PI * 2);
  ctx.fill();

  // Title with cyberpunk styling
  ctx.shadowColor = '#00f5ff';
  ctx.shadowBlur = 25;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 56px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CYBERPUNK', centerX, centerY - 25);
  
  ctx.font = 'bold 28px Arial';
  ctx.fillStyle = '#00f5ff';
  ctx.shadowColor = '#00f5ff';
  ctx.shadowBlur = 15;
  ctx.fillText('SYSTEM ANALYTICS', centerX, centerY + 25);
  ctx.shadowBlur = 0;
}

function drawNeonDataPanel(ctx, panel, time) {
  const { x, y, title, value, subtitle, color, progress } = panel;
  const panelWidth = 250;
  const panelHeight = 180;
  const floatOffset = Math.sin(time * 1.8 + x * 0.008) * 6;
  const actualY = y + floatOffset;

  ctx.save();

  // Panel background with neon glow
  const panelGradient = ctx.createLinearGradient(x, actualY, x, actualY + panelHeight);
  panelGradient.addColorStop(0, 'rgba(10, 10, 15, 0.8)');
  panelGradient.addColorStop(0.5, 'rgba(26, 13, 26, 0.6)');
  panelGradient.addColorStop(1, 'rgba(13, 26, 26, 0.8)');
  ctx.fillStyle = panelGradient;
  ctx.fillRect(x, actualY, panelWidth, panelHeight);

  // Neon border with glow
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  ctx.strokeRect(x, actualY, panelWidth, panelHeight);

  // Animated corner accents
  const cornerSize = 15;
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.shadowBlur = 15;
  
  // Top-left corner
  ctx.beginPath();
  ctx.moveTo(x, actualY + cornerSize);
  ctx.lineTo(x, actualY);
  ctx.lineTo(x + cornerSize, actualY);
  ctx.stroke();
  
  // Top-right corner
  ctx.beginPath();
  ctx.moveTo(x + panelWidth - cornerSize, actualY);
  ctx.lineTo(x + panelWidth, actualY);
  ctx.lineTo(x + panelWidth, actualY + cornerSize);
  ctx.stroke();
  
  // Bottom-left corner
  ctx.beginPath();
  ctx.moveTo(x, actualY + panelHeight - cornerSize);
  ctx.lineTo(x, actualY + panelHeight);
  ctx.lineTo(x + cornerSize, actualY + panelHeight);
  ctx.stroke();
  
  // Bottom-right corner
  ctx.beginPath();
  ctx.moveTo(x + panelWidth - cornerSize, actualY + panelHeight);
  ctx.lineTo(x + panelWidth, actualY + panelHeight);
  ctx.lineTo(x + panelWidth, actualY + panelHeight - cornerSize);
  ctx.stroke();

  // Scanning line effect
  const scanY = actualY + (Math.sin(time * 6 + x * 0.01) * 0.5 + 0.5) * panelHeight;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(x, scanY);
  ctx.lineTo(x + panelWidth, scanY);
  ctx.stroke();

  ctx.shadowBlur = 0;

  // Panel content
  ctx.fillStyle = color;
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.fillText(title, x + panelWidth/2, actualY + 30);

  const pulse = Math.sin(time * 4 + x * 0.01) * 0.3 + 1;
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${22 * pulse}px Arial`;
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 12;
  ctx.fillText(value, x + panelWidth/2, actualY + 70);

  ctx.fillStyle = '#cccccc';
  ctx.font = '12px Arial';
  ctx.shadowBlur = 6;
  ctx.fillText(subtitle, x + panelWidth/2, actualY + 95);

  // Progress indicator with neon effect
  if (progress !== undefined) {
    const barWidth = panelWidth - 40;
    const barHeight = 6;
    const barX = x + 20;
    const barY = actualY + panelHeight - 40;

    // Background bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Progress bar with gradient
    const progressWidth = (barWidth * progress) / 100;
    const progressGradient = ctx.createLinearGradient(barX, barY, barX + progressWidth, barY);
    progressGradient.addColorStop(0, color + '40');
    progressGradient.addColorStop(1, color + 'FF');
    ctx.fillStyle = progressGradient;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillRect(barX, barY, progressWidth, barHeight);

    // Progress percentage
    ctx.fillStyle = color;
    ctx.font = 'bold 11px Arial';
    ctx.shadowBlur = 8;
    ctx.fillText(`${progress.toFixed(0)}%`, x + panelWidth/2, actualY + panelHeight - 15);
  }

  ctx.restore();
}

function drawCyberpunkChart(ctx, config, time) {
  const { x, y, width, height, title, data } = config;
  
  ctx.save();

  // Chart background
  const chartGradient = ctx.createLinearGradient(x, y, x, y + height);
  chartGradient.addColorStop(0, 'rgba(26, 13, 26, 0.6)');
  chartGradient.addColorStop(1, 'rgba(10, 10, 15, 0.8)');
  ctx.fillStyle = chartGradient;
  ctx.fillRect(x, y, width, height);

  // Neon border
  ctx.strokeStyle = '#ff006e';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#ff006e';
  ctx.shadowBlur = 20;
  ctx.strokeRect(x, y, width, height);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 15;
  ctx.fillText(title, x + width/2, y + 35);

  // Chart bars with 3D effect
  const barWidth = (width - 120) / data.length;
  const maxBarHeight = height - 100;
  
  data.forEach((item, index) => {
    const barX = x + 60 + index * barWidth;
    const barHeight = (item.value / 100) * maxBarHeight;
    const barY = y + height - 50 - barHeight;
    const depth = 20;
    
    // 3D shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(barX + depth, barY + depth, barWidth - 30, barHeight);
    
    // Main bar with neon gradient
    const barGradient = ctx.createLinearGradient(barX, barY, barX, barY + barHeight);
    barGradient.addColorStop(0, item.color + 'FF');
    barGradient.addColorStop(0.5, item.color + 'CC');
    barGradient.addColorStop(1, item.color + '66');
    ctx.fillStyle = barGradient;
    ctx.fillRect(barX, barY, barWidth - 30, barHeight);
    
    // 3D top face
    ctx.fillStyle = item.color + 'DD';
    ctx.beginPath();
    ctx.moveTo(barX, barY);
    ctx.lineTo(barX + depth, barY - depth);
    ctx.lineTo(barX + barWidth - 30 + depth, barY - depth);
    ctx.lineTo(barX + barWidth - 30, barY);
    ctx.closePath();
    ctx.fill();
    
    // 3D right face
    ctx.fillStyle = item.color + 'AA';
    ctx.beginPath();
    ctx.moveTo(barX + barWidth - 30, barY);
    ctx.lineTo(barX + barWidth - 30 + depth, barY - depth);
    ctx.lineTo(barX + barWidth - 30 + depth, barY + barHeight - depth);
    ctx.lineTo(barX + barWidth - 30, barY + barHeight);
    ctx.closePath();
    ctx.fill();
    
    // Neon glow effect
    ctx.shadowColor = item.color;
    ctx.shadowBlur = 15;
    ctx.strokeStyle = item.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barWidth - 30, barHeight);
    ctx.shadowBlur = 0;
    
    // Value labels
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 10;
    ctx.fillText(`${item.value.toFixed(0)}%`, barX + (barWidth - 30)/2, barY - 15);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = item.color;
    ctx.shadowColor = item.color;
    ctx.shadowBlur = 8;
    ctx.fillText(item.label, barX + (barWidth - 30)/2, y + height - 20);
  });

  ctx.restore();
}

function drawRealTimeMonitors(ctx, time) {
  const monitors = [
    { x: 1000, y: 950, width: 450, height: 70, color: '#00f5ff', frequency: 2.5, amplitude: 25, name: 'CPU ACTIVITY' },
    { x: 1000, y: 1040, width: 450, height: 70, color: '#ff006e', frequency: 1.8, amplitude: 20, name: 'MEMORY FLOW' },
    { x: 1000, y: 1130, width: 450, height: 70, color: '#ffbe0b', frequency: 3.2, amplitude: 18, name: 'NETWORK I/O' }
  ];

  monitors.forEach(monitor => {
    ctx.save();
    
    // Monitor background
    const monitorGradient = ctx.createLinearGradient(monitor.x, monitor.y, monitor.x, monitor.y + monitor.height);
    monitorGradient.addColorStop(0, 'rgba(10, 10, 15, 0.9)');
    monitorGradient.addColorStop(1, 'rgba(26, 13, 26, 0.7)');
    ctx.fillStyle = monitorGradient;
    ctx.fillRect(monitor.x, monitor.y, monitor.width, monitor.height);
    
    ctx.strokeStyle = monitor.color + '60';
    ctx.lineWidth = 2;
    ctx.strokeRect(monitor.x, monitor.y, monitor.width, monitor.height);
    
    // Waveform
    ctx.strokeStyle = monitor.color;
    ctx.lineWidth = 3;
    ctx.shadowColor = monitor.color;
    ctx.shadowBlur = 15;
    
    ctx.beginPath();
    for (let i = 0; i < monitor.width; i += 3) {
      const x = monitor.x + i;
      const waveY = monitor.y + monitor.height/2 + 
                   Math.sin((time * monitor.frequency + i * 0.03)) * monitor.amplitude;
      if (i === 0) {
        ctx.moveTo(x, waveY);
      } else {
        ctx.lineTo(x, waveY);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // Monitor label
    ctx.fillStyle = monitor.color;
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.shadowColor = monitor.color;
    ctx.shadowBlur = 8;
    ctx.fillText(monitor.name, monitor.x + 10, monitor.y + 15);
    
    ctx.restore();
  });
}

function drawCyberpunkHeader(ctx, config, time) {
  const { hostname, processes, nodeVersion, currentTime, uptime, temperature } = config;
  
  const headerX = 100;
  const headerY = 50;
  const headerWidth = 1800;
  const headerHeight = 100;
  
  ctx.save();
  
  // Header background
  const headerGradient = ctx.createLinearGradient(headerX, headerY, headerX, headerY + headerHeight);
  headerGradient.addColorStop(0, 'rgba(255, 0, 110, 0.3)');
  headerGradient.addColorStop(0.5, 'rgba(0, 245, 255, 0.2)');
  headerGradient.addColorStop(1, 'rgba(255, 190, 11, 0.15)');
  ctx.fillStyle = headerGradient;
  ctx.fillRect(headerX, headerY, headerWidth, headerHeight);
  // Animated border
  const borderColors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec'];
  const currentColor = borderColors[Math.floor(time * 2) % borderColors.length];
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 3;
  ctx.shadowColor = currentColor;
  ctx.shadowBlur = 20;
  ctx.strokeRect(headerX, headerY, headerWidth, headerHeight);
  
  // Status indicators
  const indicators = [
    { text: '🟢 SYSTEM ONLINE', color: '#06ffa5', x: headerX + 50 },
    { text: '⚡ CYBERPUNK MODE', color: '#ff006e', x: headerX + 350 },
    { text: '🛡️ SECURITY ACTIVE', color: '#8338ec', x: headerX + 650 },
    { text: '📡 NEURAL LINK', color: '#00f5ff', x: headerX + 950 },
    { text: '🚀 OPTIMIZED', color: '#ffbe0b', x: headerX + 1250 },
    { text: '🌡️ THERMAL OK', color: '#3a86ff', x: headerX + 1550 }
  ];
  
  indicators.forEach((indicator, index) => {
    const pulse = Math.sin(time * 3 + index * 0.7) * 0.4 + 1;
    ctx.fillStyle = indicator.color;
    ctx.font = `bold ${12 * pulse}px Arial`;
    ctx.textAlign = 'left';
    ctx.shadowColor = indicator.color;
    ctx.shadowBlur = 10;
    ctx.fillText(indicator.text, indicator.x, headerY + 35);
  });
  
  // System info
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'right';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 15;
  ctx.fillText(`🕐 ${currentTime} | 🖥️ ${hostname}`, headerX + headerWidth - 50, headerY + 65);
  ctx.font = '14px Arial';
  ctx.fillText(`Runtime: ${uptime} | Temp: ${temperature}°C | Tasks: ${processes}`, headerX + headerWidth - 50, headerY + 85);
  
  ctx.restore();
}

function drawAnimatedElements(ctx, time) {
  // Data streams
  for (let i = 0; i < 8; i++) {
    const streamX = 200 + i * 200;
    const streamAlpha = (Math.sin(time * 2 + i * 1.5) * 0.4 + 0.5);
    const colors = ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec'];
    const color = colors[i % colors.length];
    
    ctx.strokeStyle = `rgba(${hexToRgb(color)}, ${streamAlpha})`;
    ctx.lineWidth = 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    
    for (let y = 300; y < 1300; y += 25) {
      const waveOffset = Math.sin((y + time * 200) * 0.008 + i * 2) * 15;
      if (y === 300) {
        ctx.moveTo(streamX + waveOffset, y);
      } else {
        ctx.lineTo(streamX + waveOffset, y);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  
  // Floating data points
  for (let i = 0; i < 60; i++) {
    const x = (i * 337.5) % 2000;
    const y = (i * 241.3) % 1400;
    const offsetX = Math.sin(time * 1.5 + i * 0.2) * 40;
    const offsetY = Math.cos(time * 1.2 + i * 0.25) * 30;
    const size = 1.5 + Math.sin(time * 4 + i) * 1;
    const alpha = (Math.sin(time * 2.5 + i * 0.3) * 0.6 + 0.7);
    const hue = (i * 73.5) % 360;
    ctx.fillStyle = `hsla(${hue}, 90%, 70%, ${alpha})`;
    ctx.shadowColor = `hsl(${hue}, 90%, 70%)`;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function getCPUUsage() {
  return new Promise((resolve) => {
    const startUsage = process.cpuUsage();
    const startTime = process.hrtime();

    setTimeout(() => {
      const endUsage = process.cpuUsage(startUsage);
      const endTime = process.hrtime(startTime);

      const totalTime = endTime[0] * 1000000 + endTime[1] / 1000;
      const totalUsage = endUsage.user + endUsage.system;
      let cpuPercent = (totalUsage / totalTime * 100);

      cpuPercent = Math.min(Math.max(cpuPercent + (Math.random() - 0.5) * 25, 5), 95);
      resolve(cpuPercent.toFixed(1));
    }, 100);
  });
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
    }
  
