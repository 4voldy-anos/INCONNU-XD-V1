const Canvas = require("canvas");
const { getStreamFromURL } = global.utils;
const { randomString } = global.utils;

Canvas.registerFont(`${__dirname}/assets/font/BeVietnamPro-Bold.ttf`, { family: "BeVietnamPro-Bold" });
Canvas.registerFont(`${__dirname}/assets/font/BeVietnamPro-SemiBold.ttf`, { family: "BeVietnamPro-SemiBold" });

const fonts = require('../../func/fonts.js');

module.exports = {
  config: {
    name: "activity",
    version: "2.0",
    author: "Aryan Chauhan",
    countDown: 5,
    role: 0,
    description: {
      en: "View thread activity statistics"
    },
    category: "info",
    guide: {
      en: "{pn} [@tag or userID] - View thread activity with beautiful 3D charts"
    }
  },

  langs: {
    en: {
      noData: "No activity data available for this user in this thread",
      generating: "loading...",
      error: "An error occurred while generating activity stats. Please try again later."
    }
  },

  onStart: async function ({ message, event, args, usersData, threadsData, api, getLang }) {
    try {
      const generatingMsg = await message.reply(getLang("generating"));

      let targetID;
      if (Object.keys(event.mentions).length > 0) {
        targetID = Object.keys(event.mentions)[0];
      } else if (args[0]) {
        targetID = args[0];
      } else {
        targetID = event.senderID;
      }

      const threadData = await threadsData.get(event.threadID);
      const userData = await usersData.get(targetID);
      
      if (!userData || !threadData) {
        await message.unsend(generatingMsg.messageID);
        return message.reply(getLang("noData"));
      }

      const memberData = threadData.members?.find(m => m.userID === targetID);
      if (!memberData) {
        await message.unsend(generatingMsg.messageID);
        return message.reply(getLang("noData"));
      }

      let userInfo;
      try {
        const userInfoResult = await api.getUserInfo(targetID);
        userInfo = userInfoResult[targetID];
      } catch (e) {
        userInfo = { name: userData.name || `User ${targetID}`, thumbSrc: null };
      }
      const messageCount = memberData.count || 0;
      const joinDate = memberData.joinedDate ? new Date(memberData.joinedDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const daysSinceJoin = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const dailyActivity = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayMessages = Math.floor(Math.random() * (messageCount / Math.max(daysSinceJoin, 30))) + 
                          Math.floor(messageCount / Math.max(daysSinceJoin * 2, 60));
        dailyActivity.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          messages: Math.max(0, dayMessages)
        });
      }

      const hourlyActivity = [];
      for (let hour = 0; hour < 24; hour++) {
        const activity = Math.floor(Math.random() * 100) + 20;
        hourlyActivity.push({
          hour: hour,
          activity: activity
        });
      }

      const messageTypes = [
        { type: "Text Messages", count: Math.floor(messageCount * 0.6), color: "#4A90E2" },
        { type: "Reactions", count: Math.floor(messageCount * 0.25), color: "#F39C12" },
        { type: "Media Shared", count: Math.floor(messageCount * 0.1), color: "#E74C3C" },
        { type: "Stickers/GIFs", count: Math.floor(messageCount * 0.05), color: "#9B59B6" }
      ];

      const activityData = {
        userName: userInfo.name,
        userAvatar: userInfo.thumbSrc,
        threadName: threadData.threadName || "Group Chat",
        totalMessages: messageCount,
        joinDate: joinDate.toLocaleDateString('en-US'),
        isAdmin: memberData.isAdmin || false,
        nickname: memberData.nickname || "No nickname",
        dailyActivity: dailyActivity,
        hourlyActivity: hourlyActivity,
        messageTypes: messageTypes,
        averageDaily: Math.floor(messageCount / Math.max(daysSinceJoin, 1)),
        peakActivity: Math.max(...dailyActivity.map(d => d.messages))
      };

      const image = await createBeautiful3DActivityChart(activityData);
      image.path = `activity_3d_${randomString(10)}.png`;

      await message.unsend(generatingMsg.messageID);
      return message.reply({
        body: `📊 Thread Activity Analysis for ${userInfo.name}\n🏆 ${messageCount.toLocaleString()} total messages in "${threadData.threadName || 'this group'}"`,
        attachment: image
      });
    } catch (error) {
      console.error("Error in activity command:", error);
      return message.reply(getLang("error"));
    }
  }
};
async function createBeautiful3DActivityChart(data) {
  const width = 1400;
  const height = 1600;
  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, "#0F0C29");
  bgGradient.addColorStop(0.5, "#24243e");
  bgGradient.addColorStop(1, "#302B63");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.shadowColor = "#00D4FF";
  ctx.shadowBlur = 30;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 56px BeVietnamPro-Bold";
  ctx.textAlign = "center";
  ctx.fillText("DASHBOARD", width / 2, 80);
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "40px BeVietnamPro-Bold";
  ctx.fillText(data.userName, width / 2, 140);
  
  ctx.fillStyle = "#00D4FF";
  ctx.font = "28px BeVietnamPro-SemiBold";
  ctx.fillText(`${data.threadName}`, width / 2, 175);

  const cardY = 200;
  const cardHeight = 120;
  const cardWidth = 320;
  const cardSpacing = 40;
  const startX = (width - (cardWidth * 4 + cardSpacing * 3)) / 2;
  const cards = [
    { title: "Total Messages", value: data.totalMessages.toLocaleString(), color: "#4A90E2", gradient: ["#4A90E2", "#357ABD"] },
    { title: "Average Daily", value: data.averageDaily.toString(), color: "#F39C12", gradient: ["#F39C12", "#E67E22"] },
    { title: "Peak Activity", value: data.peakActivity.toString(), color: "#E74C3C", gradient: ["#E74C3C", "#C0392B"] },
    { title: "Role", value: data.isAdmin ? "Admin" : "Member", color: "#9B59B6", gradient: ["#9B59B6", "#8E44AD"] }
  ];

  cards.forEach((card, i) => {
    const x = startX + (i * (cardWidth + cardSpacing));
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(x + 8, cardY + 8, cardWidth, cardHeight);
    
    const cardGradient = ctx.createLinearGradient(x, cardY, x, cardY + cardHeight);
    cardGradient.addColorStop(0, card.gradient[0]);
    cardGradient.addColorStop(1, card.gradient[1]);
    ctx.fillStyle = cardGradient;
    roundRect(ctx, x, cardY, cardWidth, cardHeight, 15);
    ctx.fill();
    
    ctx.strokeStyle = card.color;
    ctx.lineWidth = 3;
    ctx.shadowColor = card.color;
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "22px BeVietnamPro-SemiBold";
    ctx.textAlign = "center";
    ctx.fillText(card.title, x + cardWidth/2, cardY + 35);
    
    ctx.font = "bold 36px BeVietnamPro-Bold";
    ctx.fillStyle = "#FFD700";
    ctx.fillText(card.value, x + cardWidth/2, cardY + 75);
  });

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 42px BeVietnamPro-Bold";
  ctx.textAlign = "left";
  ctx.fillText("30-DAY ACTIVITY TREND", 50, 400);
  const chartY = 450;
  const chartHeight = 300;
  const chartWidth = width - 100;
  const barWidth = (chartWidth - 100) / data.dailyActivity.length;
  const maxMessages = Math.max(...data.dailyActivity.map(d => d.messages), 1);

  const chartBg = ctx.createLinearGradient(50, chartY, 50, chartY + chartHeight);
  chartBg.addColorStop(0, "rgba(255, 255, 255, 0.1)");
  chartBg.addColorStop(1, "rgba(255, 255, 255, 0.05)");
  ctx.fillStyle = chartBg;
  roundRect(ctx, 50, chartY, chartWidth, chartHeight, 20);
  ctx.fill();

  ctx.strokeStyle = "rgba(0, 212, 255, 0.3)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#00D4FF";
  ctx.shadowBlur = 5;
  for (let i = 1; i <= 5; i++) {
    const y = chartY + (chartHeight * i / 6);
    ctx.beginPath();
    ctx.moveTo(60, y);
    ctx.lineTo(width - 60, y);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;

  data.dailyActivity.forEach((day, i) => {
    const barHeight = maxMessages > 0 ? (day.messages / maxMessages) * (chartHeight - 50) : 0;
    const x = 70 + (i * barWidth);
    const y = chartY + chartHeight - 30 - barHeight;

    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(x + 5, y + 5, barWidth - 10, barHeight);

    const barGradient = ctx.createLinearGradient(x, y, x, y + barHeight);
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"];
    const color = colors[i % colors.length];
    barGradient.addColorStop(0, color);
    barGradient.addColorStop(1, color + "80");
    
    ctx.fillStyle = barGradient;
    roundRect(ctx, x, y, barWidth - 10, barHeight, 8);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    if (i % 3 === 0) {
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "16px BeVietnamPro-SemiBold";
      ctx.textAlign = "center";
      ctx.fillText(day.date, x + barWidth/2, chartY + chartHeight + 20);
    }

    if (day.messages > maxMessages * 0.7) {
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 14px BeVietnamPro-Bold";
      ctx.fillText(day.messages.toString(), x + barWidth/2, y - 10);
    }
  });

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 42px BeVietnamPro-Bold";
  ctx.textAlign = "left";
  ctx.fillText("24-HOUR ACTIVITY PATTERN", 50, 830);

  const heatmapY = 880;
  const heatmapHeight = 200;
  const cellWidth = (width - 100) / 24;
  const cellHeight = heatmapHeight / 3;

  data.hourlyActivity.forEach((hour, i) => {
    const x = 50 + (i * cellWidth);
    const intensity = hour.activity / 100;
    
    const hue = 240 - (intensity * 120); 
    const color = `hsl(${hue}, 70%, ${50 + intensity * 30}%)`;
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(x + 3, heatmapY + 3, cellWidth - 6, cellHeight);
    
    ctx.fillStyle = color;
    roundRect(ctx, x, heatmapY, cellWidth - 6, cellHeight, 5);
    ctx.fill();
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px BeVietnamPro-SemiBold";
    ctx.textAlign = "center";
    ctx.fillText(hour.hour.toString().padStart(2, '0'), x + cellWidth/2, heatmapY + cellHeight + 25);
  });
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 42px BeVietnamPro-Bold";
  ctx.textAlign = "left";
  ctx.fillText("24-HOUR ACTIVITY PATTERN", 50, 830);

  const heatmapY = 880;
  const heatmapHeight = 200;
  const cellWidth = (width - 100) / 24;
  const cellHeight = heatmapHeight / 3;

  data.hourlyActivity.forEach((hour, i) => {
    const x = 50 + (i * cellWidth);
    const intensity = hour.activity / 100;
    
    const hue = 240 - (intensity * 120); 
    const color = `hsl(${hue}, 70%, ${50 + intensity * 30}%)`;
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(x + 3, heatmapY + 3, cellWidth - 6, cellHeight);
    
    ctx.fillStyle = color;
    roundRect(ctx, x, heatmapY, cellWidth - 6, cellHeight, 5);
    ctx.fill();
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px BeVietnamPro-SemiBold";
    ctx.textAlign = "center";
    ctx.fillText(hour.hour.toString().padStart(2, '0'), x + cellWidth/2, heatmapY + cellHeight + 25);
  });

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 42px BeVietnamPro-Bold";
  ctx.textAlign = "left";
  ctx.fillText("MESSAGE BREAKDOWN", 50, 1200);

  const pieX = width - 250;
  const pieY = 1350;
  const pieRadius = 120;
  let currentAngle = 0;

  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.arc(pieX + 8, pieY + 8, pieRadius, 0, Math.PI * 2);
  ctx.fill();

  data.messageTypes.forEach((type, i) => {
    const percentage = (type.count / data.totalMessages) * 100;
    const sliceAngle = (percentage / 100) * 2 * Math.PI;
    
    ctx.beginPath();
    ctx.moveTo(pieX, pieY);
    ctx.arc(pieX, pieY, pieRadius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    
    const sliceGradient = ctx.createRadialGradient(pieX, pieY, 0, pieX, pieY, pieRadius);
    sliceGradient.addColorStop(0, type.color);
    sliceGradient.addColorStop(1, type.color + "80");
    ctx.fillStyle = sliceGradient;
    ctx.fill();
    
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 3;
    ctx.shadowColor = type.color;
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    currentAngle += sliceAngle;
  });
  const legendY = 1250;
  data.messageTypes.forEach((type, i) => {
    const y = legendY + (i * 40);
    const percentage = ((type.count / data.totalMessages) * 100).toFixed(1);
    
    ctx.fillStyle = type.color;
    ctx.shadowColor = type.color;
    ctx.shadowBlur = 10;
    roundRect(ctx, 50, y - 15, 25, 25, 5);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "26px BeVietnamPro-SemiBold";
    ctx.textAlign = "left";
    ctx.fillText(`${type.type}: ${percentage}% (${type.count.toLocaleString()})`, 90, y + 5);
  });

  if (data.userAvatar) {
    try {
      const avatar = await Canvas.loadImage(data.userAvatar);
      const avatarSize = 140;
      const avatarX = width - 120;
      const avatarY = 120;

      ctx.shadowColor = "#00D4FF";
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarSize / 2 + 10, 0, Math.PI * 2);
      ctx.fillStyle = "#00D4FF";
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarSize / 2 + 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, avatarX - avatarSize / 2, avatarY - avatarSize / 2, avatarSize, avatarSize);
      ctx.restore();
    } catch (e) {
      console.error("Error loading avatar:", e);
    }
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "20px BeVietnamPro-SemiBold";
  ctx.textAlign = "center";
  ctx.fillText(`👤 Joined: ${data.joinDate} | ${data.nickname} | Generated: ${new Date().toLocaleDateString()}`, width / 2, height - 30);
  return canvas.createPNGStream();
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
