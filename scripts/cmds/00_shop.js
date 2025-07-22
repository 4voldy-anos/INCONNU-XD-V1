const { getTime } = global.utils;
const fonts = require('../../func/fonts.js');

module.exports = {
	config: {
		name: "shop",
		version: "4.0",
		author: "Aryan Chauhan",
		countDown: 3,
		role: 0,
		description: {
			vi: "Hệ thống cửa hàng siêu đẹp với nhiều tính năng",
			en: "Ultra-beautiful shop system with amazing features"
		},
		category: "game",
		guide: {
			vi: "Sử dụng {pn} help để xem tất cả lệnh",
			en: "Use {pn} help to see all commands"
		}
	},

	langs: {
		vi: {
			help: "Danh sách lệnh cửa hàng",
			success: "Thành công",
			error: "Lỗi",
			insufficientFunds: "Không đủ tiền",
			invalidAmount: "Số tiền không hợp lệ"
		},
		en: {
			help: "Shop commands list",
			success: "Success",
			error: "Error",
			insufficientFunds: "Insufficient funds",
			invalidAmount: "Invalid amount"
		}
	},

	shopData: {
		weapons: {
			"SWORD": { price: 1000, sellPrice: 700, name: "🗡️ Iron Sword", description: "A sharp iron blade forged by master smiths", durability: 100, attack: 25, rarity: "Common", element: "Physical" },
			"BOW": { price: 800, sellPrice: 550, name: "🏹 Elven Bow", description: "An elegant bow blessed by forest spirits", durability: 80, attack: 20, rarity: "Common", element: "Wind" },
			"STAFF": { price: 1200, sellPrice: 850, name: "🔮 Arcane Staff", description: "A mystical staff crackling with magical energy", durability: 90, attack: 30, rarity: "Rare", element: "Magic" },			"DAGGER": { price: 600, sellPrice: 400, name: "🗡️ Shadow Dagger", description: "A quick blade that strikes from the shadows", durability: 70, attack: 18, rarity: "Common", element: "Dark" },
			"HAMMER": { price: 1500, sellPrice: 1000, name: "🔨 Thunder Hammer", description: "A mighty hammer that calls down lightning", durability: 120, attack: 35, rarity: "Rare", element: "Lightning" },
			"KATANA": { price: 2000, sellPrice: 1400, name: "⚔️ Dragon Katana", description: "A legendary blade infused with dragon essence", durability: 150, attack: 40, rarity: "Epic", element: "Fire" },
			"SCYTHE": { price: 2500, sellPrice: 1750, name: "💀 Soul Reaper", description: "A cursed scythe that harvests souls", durability: 130, attack: 45, rarity: "Epic", element: "Death" },
			"TRIDENT": { price: 3000, sellPrice: 2100, name: "🔱 Ocean's Fury", description: "Poseidon's trident that commands the seas", durability: 160, attack: 50, rarity: "Legendary", element: "Water" }
		},
		armor: {
			"HELMET": { price: 500, sellPrice: 350, name: "⛑️ Knight's Helm", description: "Protects your head with royal elegance", durability: 80, defense: 15, rarity: "Common" },
			"CHESTPLATE": { price: 1000, sellPrice: 700, name: "🛡️ Steel Chestplate", description: "Heavy armor forged in dragon fire", durability: 120, defense: 30, rarity: "Rare" },
			"BOOTS": { price: 300, sellPrice: 200, name: "🥾 Swift Boots", description: "Comfortable boots that increase your speed", durability: 60, defense: 8, speed: 5, rarity: "Common" },
			"GLOVES": { price: 250, sellPrice: 175, name: "🧤 Iron Gauntlets", description: "Protective gloves that enhance grip strength", durability: 50, defense: 10, rarity: "Common" },
			"SHIELD": { price: 700, sellPrice: 490, name: "🛡️ Guardian Shield", description: "A shield blessed by protective spirits", durability: 100, defense: 20, rarity: "Rare" },
			"CLOAK": { price: 400, sellPrice: 280, name: "🧙‍♂️ Mystic Cloak", description: "A cloak woven with protective enchantments", durability: 70, defense: 12, magic: 5, rarity: "Rare" },
			"CROWN": { price: 5000, sellPrice: 3500, name: "👑 Royal Crown", description: "A crown that commands respect and fear", durability: 200, defense: 25, charisma: 20, rarity: "Legendary" }
		},
		potions: {
			"HEALTH_POTION": { price: 50, sellPrice: 30, name: "🧪 Health Elixir", description: "Restores 50 HP with herbal magic", effect: "heal", power: 50, rarity: "Common" },
			"MANA_POTION": { price: 40, sellPrice: 25, name: "💙 Mana Draught", description: "Restores 30 MP with arcane essence", effect: "mana", power: 30, rarity: "Common" },
			"STRENGTH_POTION": { price: 100, sellPrice: 60, name: "💪 Titan's Might", description: "Increases attack by 10 for 1 hour", effect: "strength", power: 10, duration: "1h", rarity: "Rare" },
			"DEFENSE_POTION": { price: 100, sellPrice: 60, name: "🛡️ Iron Skin", description: "Increases defense by 8 for 1 hour", effect: "defense", power: 8, duration: "1h", rarity: "Rare" },
			"SPEED_POTION": { price: 80, sellPrice: 50, name: "💨 Wind Walker", description: "Increases speed by 15 for 30 minutes", effect: "speed", power: 15, duration: "30m", rarity: "Rare" },
			"LUCK_POTION": { price: 150, sellPrice: 90, name: "🍀 Fortune's Favor", description: "Increases luck by 20 for 2 hours", effect: "luck", power: 20, duration: "2h", rarity: "Epic" },
			"INVISIBILITY": { price: 300, sellPrice: 180, name: "👻 Shadow Veil", description: "Grants temporary invisibility for stealth", effect: "invisibility", duration: "10m", rarity: "Epic" },
			"PHOENIX_TEAR": { price: 1000, sellPrice: 700, name: "🔥 Phoenix Resurrection", description: "Revives from death once", effect: "resurrection", rarity: "Legendary" }
		},
		materials: {
			"IRON_ORE": { price: 20, sellPrice: 15, name: "⛏️ Iron Ore", description: "Raw iron ore with metallic shine", stackable: true, maxStack: 100, rarity: "Common" },
			"GOLD_ORE": { price: 100, sellPrice: 80, name: "✨ Gold Ore", description: "Precious gold ore that gleams brightly", stackable: true, maxStack: 50, rarity: "Rare" },
			"DIAMOND": { price: 500, sellPrice: 400, name: "💎 Diamond Crystal", description: "A perfect diamond of incredible value", stackable: true, maxStack: 20, rarity: "Epic" },
			"WOOD": { price: 5, sellPrice: 3, name: "🪵 Enchanted Wood", description: "Wood infused with natural magic", stackable: true, maxStack: 200, rarity: "Common" },
			"STONE": { price: 3, sellPrice: 2, name: "🪨 Marble Stone", description: "High-quality marble for construction", stackable: true, maxStack: 200, rarity: "Common" },
			"LEATHER": { price: 15, sellPrice: 10, name: "🦴 Dragon Leather", description: "Tough leather from ancient dragons", stackable: true, maxStack: 100, rarity: "Rare" },
			"CRYSTAL": { price: 800, sellPrice: 600, name: "🔮 Mana Crystal", description: "A crystal pulsing with magical energy", stackable: true, maxStack: 25, rarity: "Epic" },
			"METEOR": { price: 2000, sellPrice: 1500, name: "☄️ Meteorite Shard", description: "A fragment from the stars above", stackable: true, maxStack: 10, rarity: "Legendary" }
		},
		food: {
			"BREAD": { price: 10, sellPrice: 6, name: "🍞 Artisan Bread", description: "Freshly baked bread with golden crust", hunger: 20, stackable: true, maxStack: 50, rarity: "Common" },
			"APPLE": { price: 5, sellPrice: 3, name: "🍎 Enchanted Apple", description: "A magical apple that glows softly", hunger: 10, health: 5, stackable: true, maxStack: 100, rarity: "Common" },
			"MEAT": { price: 25, sellPrice: 18, name: "🥩 Dragon Steak", description: "Tender meat from legendary beasts", hunger: 40, strength: 2, stackable: true, maxStack: 30, rarity: "Rare" },
			"FISH": { price: 20, sellPrice: 14, name: "🐟 Golden Fish", description: "A fish that shimmers like gold", hunger: 35, luck: 1, stackable: true, maxStack: 40, rarity: "Rare" },
			"CAKE": { price: 100, sellPrice: 70, name: "🍰 Celebration Cake", description: "A magical cake that brings joy", hunger: 100, happiness: 10, stackable: false, rarity: "Epic" },
			"SOUP": { price: 30, sellPrice: 20, name: "🍲 Healing Soup", description: "Warm soup that mends body and soul", hunger: 50, health: 10, stackable: true, maxStack: 20, rarity: "Rare" },
			"HONEY": { price: 40, sellPrice: 28, name: "🍯 Fairy Honey", description: "Sweet honey with magical properties", hunger: 25, mana: 15, stackable: true, maxStack: 30, rarity: "Rare" },
			"WINE": { price: 80, sellPrice: 56, name: "🍷 Elvish Wine", description: "Fine wine aged in magical barrels", hunger: 15, charisma: 5, stackable: true, maxStack: 15, rarity: "Epic" }
		},
		tools: {			"PICKAXE": { price: 200, sellPrice: 140, name: "⛏️ Mithril Pickaxe", description: "A pickaxe forged from precious mithril", durability: 100, efficiency: 1.5, rarity: "Rare" },
			"AXE": { price: 180, sellPrice: 125, name: "🪓 Lumberjack's Axe", description: "A sharp axe that never dulls", durability: 90, efficiency: 1.3, rarity: "Rare" },
			"FISHING_ROD": { price: 150, sellPrice: 100, name: "🎣 Neptune's Rod", description: "A rod blessed by the sea god", durability: 80, efficiency: 1.2, luck: 3, rarity: "Rare" },
			"SHOVEL": { price: 120, sellPrice: 85, name: "🕳️ Grave Digger", description: "A shovel that digs through any material", durability: 70, efficiency: 1.4, rarity: "Rare" },
			"HOE": { price: 100, sellPrice: 70, name: "🌾 Harvest Master", description: "A hoe that makes crops grow faster", durability: 60, efficiency: 1.1, growth: 0.2, rarity: "Common" },
			"HAMMER_TOOL": { price: 250, sellPrice: 175, name: "🔨 Master's Hammer", description: "The ultimate crafting tool", durability: 120, efficiency: 1.6, crafting: 0.3, rarity: "Epic" },
			"COMPASS": { price: 300, sellPrice: 210, name: "🧭 Explorer's Compass", description: "Never lose your way again", durability: 200, navigation: 1.0, rarity: "Epic" }
		},
		pets: {
			"DOG": { price: 2000, sellPrice: 1400, name: "🐕 Loyal Guardian", description: "A faithful companion that protects you", loyalty: 100, strength: 20, rarity: "Rare" },
			"CAT": { price: 1500, sellPrice: 1000, name: "🐱 Lucky Cat", description: "A mystical cat that brings fortune", loyalty: 80, luck: 15, stealth: 10, rarity: "Rare" },
			"BIRD": { price: 1200, sellPrice: 850, name: "🦅 Messenger Eagle", description: "A majestic eagle that soars the skies", loyalty: 60, speed: 25, scouting: 15, rarity: "Rare" },
			"HORSE": { price: 5000, sellPrice: 3500, name: "🐎 War Stallion", description: "A powerful horse bred for battle", loyalty: 90, speed: 40, stamina: 30, rarity: "Epic" },
			"DRAGON": { price: 50000, sellPrice: 35000, name: "🐲 Ancient Dragon", description: "A legendary dragon of immense power", loyalty: 150, strength: 100, magic: 50, rarity: "Legendary" },
			"WOLF": { price: 3000, sellPrice: 2100, name: "🐺 Alpha Wolf", description: "A fierce pack leader with primal instincts", loyalty: 70, strength: 35, hunting: 20, rarity: "Epic" },
			"PHOENIX": { price: 40000, sellPrice: 28000, name: "🔥 Immortal Phoenix", description: "A phoenix that grants eternal life", loyalty: 120, magic: 80, resurrection: 1, rarity: "Legendary" },
			"UNICORN": { price: 35000, sellPrice: 24500, name: "🦄 Pure Unicorn", description: "A unicorn of absolute purity and grace", loyalty: 110, magic: 70, healing: 30, rarity: "Legendary" }
		},
		vehicles: {
			"CART": { price: 800, sellPrice: 560, name: "🛒 Merchant Cart", description: "A sturdy cart for carrying goods", capacity: 100, speed: 1.1, rarity: "Common" },
			"BOAT": { price: 2000, sellPrice: 1400, name: "⛵ Sailing Vessel", description: "A boat for ocean adventures", capacity: 50, water_travel: true, rarity: "Rare" },
			"AIRSHIP": { price: 15000, sellPrice: 10500, name: "🚁 Sky Cruiser", description: "An airship that conquers the skies", capacity: 75, air_travel: true, speed: 2.0, rarity: "Epic" },
			"TELEPORTER": { price: 50000, sellPrice: 35000, name: "🌀 Portal Device", description: "Instant travel anywhere in the world", instant_travel: true, rarity: "Legendary" }
		}
	},

	onStart: async function ({ message, args, event, usersData, threadsData, globalData, getLang, api }) {
		const { senderID, threadID } = event;
		const command = args[0]?.toLowerCase();

		const userData = await usersData.get(senderID);
		const walletBalance = userData.money || 0;

		// Initialize user inventory if it doesn't exist
		if (!userData.inventory) {
			userData.inventory = {
				weapons: {},
				armor: {},
				potions: {},
				materials: {},
				food: {},
				tools: {},
				pets: {},
				vehicles: {}
			};
		}
		// Ensure all categories exist in inventory
		const categories = ['weapons', 'armor', 'potions', 'materials', 'food', 'tools', 'pets', 'vehicles'];
		categories.forEach(cat => {
			if (!userData.inventory[cat]) {
				userData.inventory[cat] = {};
			}
		});

		// Initialize user shop data
		if (!userData.shopData) {
			userData.shopData = {
				favoriteItems: [],
				purchaseHistory: [],
				membershipLevel: "Bronze",
				totalSpent: 0,
				achievements: [],
				loyaltyPoints: 0
			};
			await usersData.set(senderID, userData);
		}

		switch (command) {
			case "help":
			case undefined:
				return this.showHelp(message, fonts);

			case "list":
			case "browse":
				return this.browseShop(message, args, fonts);

			case "buy":
				return this.buyItem(message, args, userData, usersData, senderID, globalData, fonts);

			case "sell":
				return this.sellItem(message, args, userData, usersData, senderID, fonts);

			case "inventory":
			case "inv":
				return this.showInventory(message, userData, fonts);

			case "info":
				return this.showItemInfo(message, args, fonts);

			case "search":
				return this.searchItems(message, args, fonts);

			case "market":
				return this.showMarket(message, fonts);
			case "compare":
				return this.compareItems(message, args, fonts);

			case "bundle":
				return this.showBundles(message, fonts);

			case "daily":
				return this.dailyDeals(message, userData, usersData, senderID, fonts);

			case "wishlist":
			case "favorites":
				return this.manageWishlist(message, args, userData, usersData, senderID, fonts);

			case "trade":
				return this.tradeItems(message, args, event, usersData, fonts);

			case "profile":
			case "stats":
				return this.showProfile(message, userData, fonts);

			case "achievements":
				return this.showAchievements(message, userData, fonts);

			case "rarity":
				return this.showRarityGuide(message, fonts);

			case "upgrade":
				return this.upgradeItem(message, args, userData, usersData, senderID, fonts);

			case "craft":
				return this.craftItem(message, args, userData, usersData, senderID, fonts);
			case "auction":
				return this.showAuction(message, fonts);

			default:
				return message.reply(fonts.bold("❌ Unknown command. Use 'shop help' to see all commands."));
		}
	},

	showHelp: function (message, fonts) {
		const helpText = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("        🛒 ULTIMATE SHOP SYSTEM v4.0        ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

✨ ${fonts.bold("Welcome to the most magical shopping experience!")} ✨

${fonts.bold("🎯 ═══ QUICK COMMANDS ═══")}
🛒 ${fonts.bold("shop list")} - Browse magical categories
💰 ${fonts.bold("shop buy <item>")} - Purchase amazing items
💸 ${fonts.bold("shop sell <item>")} - Trade your treasures
🎒 ${fonts.bold("shop inventory")} - View your collection
📊 ${fonts.bold("shop profile")} - Your shopping statistics

${fonts.bold("🏪 ═══ SHOP CATEGORIES ═══")}
⚔️ ${fonts.bold("WEAPONS")} - Legendary blades & mystical arms
🛡️ ${fonts.bold("ARMOR")} - Protective gear & royal attire
🧪 ${fonts.bold("POTIONS")} - Magical elixirs & power-ups
⛏️ ${fonts.bold("MATERIALS")} - Rare ores & crafting supplies
🍖 ${fonts.bold("FOOD")} - Enchanted meals & healing foods
🔨 ${fonts.bold("TOOLS")} - Master craftsman equipment
🐕 ${fonts.bold("PETS")} - Loyal companions & mythical beasts
🚗 ${fonts.bold("VEHICLES")} - Transportation & travel gear
${fonts.bold("🔍 ═══ ADVANCED FEATURES ═══")}
🔍 ${fonts.bold("shop search <keyword>")} - Find specific items
ℹ️ ${fonts.bold("shop info <item>")} - Detailed item analysis
⚖️ ${fonts.bold("shop compare <item1> <item2>")} - Side by side
📈 ${fonts.bold("shop market")} - Price trends & analysis
🎁 ${fonts.bold("shop daily")} - Limited time offers
❤️ ${fonts.bold("shop favorites")} - Manage your wishlist

${fonts.bold("💎 ═══ SPECIAL SYSTEMS ═══")}
📦 ${fonts.bold("shop bundle")} - Exclusive package deals
🏆 ${fonts.bold("shop achievements")} - Unlock rewards
⭐ ${fonts.bold("shop rarity")} - Rarity system guide
🔧 ${fonts.bold("shop upgrade <item>")} - Enhance your gear
⚗️ ${fonts.bold("shop craft")} - Create powerful items
🏛️ ${fonts.bold("shop auction")} - Bid on rare items

${fonts.bold("💫 ═══ MEMBERSHIP TIERS ═══")}
🥉 ${fonts.bold("Bronze")} - 0% discount, basic access
🥈 ${fonts.bold("Silver")} - 5% discount, daily bonus
🥇 ${fonts.bold("Gold")} - 10% discount, exclusive items
💎 ${fonts.bold("Diamond")} - 15% discount, premium perks
👑 ${fonts.bold("Royal")} - 20% discount, legendary access

${fonts.bold("🎯 ═══ QUICK START GUIDE ═══")}
1️⃣ Browse: ${fonts.bold("shop list weapons")}
2️⃣ Search: ${fonts.bold("shop search dragon")}
3️⃣ Buy: ${fonts.bold("shop buy SWORD 1")}
4️⃣ Check: ${fonts.bold("shop inventory")}
5️⃣ Upgrade: ${fonts.bold("shop upgrade SWORD")}

${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("        🎮 Happy Shopping, Hero! 🎮         ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
`;
		return message.reply(helpText);
	},

	browseShop: function (message, args, fonts) {
		const category = args[1]?.toLowerCase();

		if (!category) {
			let allCategories = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("           🏪 MAGICAL SHOP CATEGORIES           ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

`;

			const categories = Object.keys(this.shopData);
			categories.forEach(cat => {
				const categoryName = cat.toUpperCase();
				const itemCount = Object.keys(this.shopData[cat]).length;
				const emoji = this.getCategoryEmoji(cat);
				const rarity = this.getCategoryRarity(cat);

				allCategories += `${emoji} ${fonts.bold(categoryName)} ${rarity}\n`;
				allCategories += `   📦 ${itemCount} unique items available\n`;
				allCategories += `   🛒 ${fonts.bold(`shop list ${cat}`)}\n\n`;
			});

			allCategories += `${fonts.bold("💡 PRO TIP:")} Use ${fonts.bold("'shop list <category>'")} to explore!\n`;
			allCategories += `${fonts.bold("🔍 SEARCH:")} Try ${fonts.bold("'shop search <keyword>'")} to find specific items!`;

			return message.reply(allCategories);
		}

		if (!this.shopData[category]) {
			return message.reply(fonts.bold("❌ Invalid category. Use 'shop list' to see all categories."));
		}
		let itemList = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold(`        ${this.getCategoryEmoji(category)} ${category.toUpperCase()} COLLECTION ${this.getCategoryEmoji(category)}        `)}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

`;

		Object.entries(this.shopData[category]).forEach(([id, item]) => {
			const rarityEmoji = this.getRarityEmoji(item.rarity);
			const priceColor = item.price > 10000 ? "💎" : item.price > 1000 ? "💰" : "💵";

			itemList += `${rarityEmoji} ${fonts.bold(item.name)} ${rarityEmoji}\n`;
			itemList += `   🏷️ ID: ${fonts.bold(id)}\n`;
			itemList += `   ${priceColor} Price: ${fonts.bold(`$${item.price.toLocaleString()}`)}\n`;
			itemList += `   💸 Sell: ${fonts.bold(`$${item.sellPrice.toLocaleString()}`)}\n`;
			itemList += `   📝 ${item.description}\n`;

			if (item.attack) itemList += `   ⚔️ Attack: ${fonts.bold(item.attack)}\n`;
			if (item.defense) itemList += `   🛡️ Defense: ${fonts.bold(item.defense)}\n`;
			if (item.durability) itemList += `   🔧 Durability: ${fonts.bold(item.durability)}\n`;
			if (item.efficiency) itemList += `   ⚡ Efficiency: ${fonts.bold(item.efficiency + "x")}\n`;
			if (item.stackable) itemList += `   📦 Stackable (Max: ${fonts.bold(item.maxStack)})\n`;

			itemList += `   🛒 ${fonts.bold(`shop buy ${id} [quantity]`)}\n`;
			itemList += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
		});
		itemList += `${fonts.bold("💡 QUICK ACTIONS:")}\n`;
		itemList += `• ${fonts.bold("shop info <ITEM_ID>")} - Detailed information\n`;
		itemList += `• ${fonts.bold("shop compare <ID1> <ID2>")} - Compare items\n`;
		itemList += `• ${fonts.bold("shop favorites add <ITEM_ID>")} - Add to wishlist`;

		return message.reply(itemList);
	},

	buyItem: async function (message, args, userData, usersData, senderID, globalData, fonts) {
		const itemId = args[1]?.toUpperCase();
		const quantity = parseInt(args[2]) || 1;

		if (!itemId) {
			return message.reply(fonts.bold("❌ Please specify an item ID. Use 'shop list' to browse items."));
		}

		if (quantity <= 0) {
			return message.reply(fonts.bold("❌ Quantity must be greater than 0."));
		}

		// Find item in all categories
		let item = null;
		let category = null;

		for (const [cat, items] of Object.entries(this.shopData)) {
			if (items[itemId]) {
				item = items[itemId];
				category = cat;
				break;
			}
		}

		if (!item) {
			return message.reply(fonts.bold("❌ Item not found. Use 'shop search <keyword>' to find items."));
		}

		// Check if item is stackable and validate quantity
		if (!item.stackable && quantity > 1) {
			return message.reply(fonts.bold(`❌ ${item.name} is not stackable. You can only buy 1 at a time.`));
		}
		// Calculate price with membership discount
		const membershipDiscount = this.getMembershipDiscount(userData.shopData?.membershipLevel || "Bronze");
		const discountedPrice = Math.floor(item.price * (1 - membershipDiscount));
		const totalCost = discountedPrice * quantity;
		const totalSavings = (item.price - discountedPrice) * quantity;

		if (userData.money < totalCost) {
			return message.reply(fonts.bold(`
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("              ❌ INSUFFICIENT FUNDS              ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

${this.getRarityEmoji(item.rarity)} ${fonts.bold(item.name)}
🏷️ Price per item: ${fonts.bold(`$${item.price.toLocaleString()}`)}
💎 Member price: ${fonts.bold(`$${discountedPrice.toLocaleString()}`)}
📦 Quantity: ${fonts.bold(quantity)}
💰 Total cost: ${fonts.bold(`$${totalCost.toLocaleString()}`)}
💳 Your balance: ${fonts.bold(`$${userData.money.toLocaleString()}`)}
❌ Still needed: ${fonts.bold(`$${(totalCost - userData.money).toLocaleString()}`)}

${fonts.bold("💡 EARN MONEY TIPS:")}
• Use daily commands for free money
• Complete work commands
• Sell items you don't need
• Participate in games and events

${fonts.bold(`🎯 Membership: ${userData.shopData?.membershipLevel || "Bronze"} (${Math.round(membershipDiscount * 100)}% discount)`)}
			`));
		}

		// Process purchase
		userData.money -= totalCost;

		// Ensure category exists in inventory
		if (!userData.inventory[category]) {
			userData.inventory[category] = {};
		}
		// Add to inventory
		if (!userData.inventory[category][itemId]) {
			userData.inventory[category][itemId] = {
				name: item.name,
				quantity: 0,
				durability: item.durability || null,
				purchaseDate: Date.now(),
				level: 1
			};
		}

		userData.inventory[category][itemId].quantity += quantity;

		// Update shop statistics
		userData.shopData.totalSpent += totalCost;
		userData.shopData.loyaltyPoints += Math.floor(totalCost / 100);
		userData.shopData.purchaseHistory.push({
			item: item.name,
			id: itemId,
			quantity,
			cost: totalCost,
			date: Date.now()
		});

		// Check for membership upgrade
		const newMembership = this.calculateMembership(userData.shopData.totalSpent);
		const membershipUpgraded = newMembership !== userData.shopData.membershipLevel;
		userData.shopData.membershipLevel = newMembership;

		// Update global shop statistics
		await this.updateGlobalStats(itemId, item, totalCost, 1, userData, globalData);

		// Save all changes to database
		await usersData.set(senderID, userData);

		let successMessage = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("            ✅ PURCHASE SUCCESSFUL!            ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${this.getRarityEmoji(item.rarity)} ${fonts.bold(item.name)} ${fonts.bold(`x${quantity}`)}
💰 Total paid: ${fonts.bold(`$${totalCost.toLocaleString()}`)}
${totalSavings > 0 ? `💎 You saved: ${fonts.bold(`$${totalSavings.toLocaleString()}`)} (Member discount!)\n` : ""}
💳 New balance: ${fonts.bold(`$${userData.money.toLocaleString()}`)}
📦 Added to ${fonts.bold(category)} inventory
🎯 Loyalty points earned: ${fonts.bold(`+${Math.floor(totalCost / 100)}`)}

${item.durability ? `🔧 Durability: ${fonts.bold(item.durability)}\n` : ""}
${item.stackable ? `📦 This item is stackable\n` : "🎯 This item is unique\n"}

${fonts.bold("🛒 QUICK ACTIONS:")}
• ${fonts.bold("shop inventory")} - View your items
• ${fonts.bold("shop upgrade " + itemId)} - Enhance this item
`;

		if (membershipUpgraded) {
			successMessage += `\n🎉 ${fonts.bold("MEMBERSHIP UPGRADED!")} You are now ${fonts.bold(newMembership)} tier!\n`;
		}

		return message.reply(successMessage);
	},

	showInventory: function (message, userData, fonts) {
		const inventory = userData.inventory || {};
		let totalValue = 0;
		let totalItems = 0;

		let inventoryText = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("              🎒 YOUR INVENTORY              ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

👤 ${fonts.bold("Owner:")} ${userData.name || "Unknown Hero"}
💎 ${fonts.bold("Membership:")} ${userData.shopData?.membershipLevel || "Bronze"}
🎯 ${fonts.bold("Loyalty Points:")} ${userData.shopData?.loyaltyPoints || 0}

`;
		let hasItems = false;

		for (const [category, items] of Object.entries(inventory)) {
			if (!items || typeof items !== 'object') continue;
			
			const categoryItems = Object.entries(items).filter(([id, item]) => item && item.quantity > 0);

			if (categoryItems.length > 0) {
				hasItems = true;
				inventoryText += `${fonts.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")}\n`;
				inventoryText += `${this.getCategoryEmoji(category)} ${fonts.bold(category.toUpperCase())} COLLECTION\n`;
				inventoryText += `${fonts.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")}\n\n`;

				categoryItems.forEach(([id, userItem]) => {
					const shopItem = this.shopData[category] && this.shopData[category][id];
					if (!shopItem) return;

					const itemValue = shopItem.sellPrice * userItem.quantity;
					totalValue += itemValue;
					totalItems += userItem.quantity;

					inventoryText += `${this.getRarityEmoji(shopItem.rarity)} ${fonts.bold(userItem.name)}\n`;
					inventoryText += `   📦 Quantity: ${fonts.bold(userItem.quantity)}\n`;
					inventoryText += `   💰 Value: ${fonts.bold(`$${itemValue.toLocaleString()}`)}\n`;
					if (userItem.durability) {
						inventoryText += `   🔧 Durability: ${fonts.bold(userItem.durability)}\n`;
					}
					if (userItem.level && userItem.level > 1) {					inventoryText += `   🛒 ${fonts.bold(`shop sell ${id} [quantity]`)}\n\n`;
				});
			}
		}

		if (!hasItems) {
			inventoryText += `${fonts.bold("📦 Your inventory is empty!")}\n\n`;
			inventoryText += `${fonts.bold("🛒 SHOPPING SUGGESTIONS:")}\n`;
			inventoryText += `• ${fonts.bold("shop list")} - Browse all categories\n`;
			inventoryText += `• ${fonts.bold("shop daily")} - Check today's deals\n`;
			inventoryText += `• ${fonts.bold("shop search <keyword>")} - Find specific items\n`;
			inventoryText += `• ${fonts.bold("shop bundle")} - View package deals`;
		} else {
			inventoryText += `${fonts.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")}\n`;
			inventoryText += `${fonts.bold("📊 INVENTORY SUMMARY")}\n`;
			inventoryText += `${fonts.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")}\n`;
			inventoryText += `📦 Total Items: ${fonts.bold(totalItems)}\n`;
			inventoryText += `💰 Total Value: ${fonts.bold(`$${totalValue.toLocaleString()}`)}\n`;
			inventoryText += `🏪 Categories: ${fonts.bold(Object.keys(inventory).filter(cat => Object.keys(inventory[cat]).length > 0).length)}\n\n`;
			inventoryText += `${fonts.bold("💡 QUICK ACTIONS:")}\n`;
			inventoryText += `• ${fonts.bold("shop upgrade <item>")} - Enhance your gear\n`;
			inventoryText += `• ${fonts.bold("shop craft")} - Create new items\n`;
			inventoryText += `• ${fonts.bold("shop sell <item>")} - Convert to money`;
		}

		return message.reply(inventoryText);
	},

	showProfile: function (message, userData, fonts) {
		const shopData = userData.shopData || {};
		const membership = shopData.membershipLevel || "Bronze";
		const totalSpent = shopData.totalSpent || 0;
		const loyaltyPoints = shopData.loyaltyPoints || 0;
		const purchaseCount = shopData.purchaseHistory?.length || 0;

		const profileText = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("            👤 SHOPPER PROFILE            ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("🏷️ PERSONAL INFO")}
👤 Name: ${fonts.bold(userData.name || "Unknown Hero")}
💰 Current Balance: ${fonts.bold(`$${userData.money?.toLocaleString() || "0"}`)}
🎯 User ID: ${fonts.bold(userData.userID || "Unknown")}

${fonts.bold("💎 MEMBERSHIP DETAILS")}
🏆 Current Tier: ${this.getMembershipEmoji(membership)} ${fonts.bold(membership)}
💵 Total Spent: ${fonts.bold(`$${totalSpent.toLocaleString()}`)}
🎯 Loyalty Points: ${fonts.bold(loyaltyPoints.toLocaleString())}
📊 Discount Rate: ${fonts.bold(`${Math.round(this.getMembershipDiscount(membership) * 100)}%`)}

${fonts.bold("📈 SHOPPING STATISTICS")}
🛒 Total Purchases: ${fonts.bold(purchaseCount)}
💸 Average Purchase: ${fonts.bold(`$${purchaseCount > 0 ? Math.round(totalSpent / purchaseCount).toLocaleString() : "0"}`)}
❤️ Favorite Items: ${fonts.bold(shopData.favoriteItems?.length || 0)}
🏆 Achievements: ${fonts.bold(shopData.achievements?.length || 0)}

${fonts.bold("🎯 NEXT TIER PROGRESS")}
${this.getMembershipProgress(totalSpent, membership)}

${fonts.bold("💡 MEMBERSHIP BENEFITS")}
${this.getMembershipBenefits(membership)}

${fonts.bold("🎮 QUICK ACTIONS")}
• ${fonts.bold("shop achievements")} - View your achievements
• ${fonts.bold("shop favorites")} - Manage wishlist
• ${fonts.bold("shop daily")} - Check today's deals
`;

		return message.reply(profileText);
	},

	showRarityGuide: function (message, fonts) {
		const rarityGuide = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("            ⭐ RARITY SYSTEM GUIDE            ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

${fonts.bold("📊 RARITY TIERS & DROP RATES")}

⚪ ${fonts.bold("COMMON")} - 60% chance
   • Basic items for everyday use
   • Affordable prices for beginners
   • Reliable quality and durability
   • Examples: Iron Sword, Health Potion
🟢 ${fonts.bold("RARE")} - 25% chance  
   • Enhanced stats and abilities
   • Moderate pricing for mid-tier players
   • Special effects and bonuses
   • Examples: Dragon Leather, Magic Staff

🔵 ${fonts.bold("EPIC")} - 10% chance
   • Powerful items with unique abilities
   • High-end pricing for serious players
   • Significant stat improvements
   • Examples: Soul Reaper, Phoenix Tear

🟡 ${fonts.bold("LEGENDARY")} - 4% chance
   • Extremely rare and powerful items
   • Premium pricing for elite players
   • Game-changing abilities
   • Examples: Ancient Dragon, Meteorite

🟣 ${fonts.bold("MYTHICAL")} - 1% chance
   • Ultra-rare items of immense power
   • Astronomical prices for collectors
   • Unique one-of-a-kind effects
   • Examples: Portal Device, Royal Crown

${fonts.bold("💎 RARITY BENEFITS")}

⚪ Common: Standard performance
🟢 Rare: +25% base stats
🔵 Epic: +50% base stats, special effects
🟡 Legendary: +100% base stats, unique abilities
🟣 Mythical: +200% base stats, reality-bending powers

${fonts.bold("🎯 ACQUISITION METHODS")}
• 🛒 Direct purchase from shop
• 📦 Daily deals and bundles
• 🎁 Achievement rewards
• ⚗️ Crafting and upgrading
• 🏛️ Auction house bidding
• 🎰 Special events and contests

${fonts.bold("💡 COLLECTOR TIPS")}
• Higher rarity = better investment value
• Legendary+ items rarely depreciate
• Check daily deals for rare discounts
• Upgrade common items to increase rarity
• Trade with other players for rare finds
`;

		return message.reply(rarityGuide);
	},

	// Helper functions
	getRarityEmoji: function (rarity) {
		const rarityEmojis = {
			"Common": "⚪",
			"Rare": "🟢",
			"Epic": "🔵",
			"Legendary": "🟡",
			"Mythical": "🟣"
		};
		return rarityEmojis[rarity] || "⚪";
	},
	getCategoryEmoji: function (category) {
		const emojis = {
			weapons: "⚔️",
			armor: "🛡️",
			potions: "🧪",
			materials: "⛏️",
			food: "🍖",
			tools: "🔨",
			pets: "🐕",
			vehicles: "🚗"
		};
		return emojis[category] || "📦";
	},

	getCategoryRarity: function (category) {
		const rarities = {
			weapons: "⚔️ Combat Collection",
			armor: "🛡️ Protection Series",
			potions: "🧪 Magical Brews",
			materials: "⛏️ Crafting Supplies",
			food: "🍖 Gourmet Delights",
			tools: "🔨 Master Equipment",
			pets: "🐕 Loyal Companions",
			vehicles: "🚗 Transportation Hub"
		};
		return rarities[category] || "📦 Mystery Items";
	},

	getMembershipEmoji: function (tier) {
		const emojis = {
			"Bronze": "🥉",
			"Silver": "🥈",
			"Gold": "🥇",
			"Diamond": "💎",
			"Royal": "👑"
		};
		return emojis[tier] || "🥉";
	},

	getMembershipDiscount: function (tier) {
		const discounts = {
			"Bronze": 0,
			"Silver": 0.05,
			"Gold": 0.10,
			"Diamond": 0.15,
			"Royal": 0.20
		};
		return discounts[tier] || 0;
	},

	calculateMembership: function (totalSpent) {
		if (totalSpent >= 1000000) return "Royal";
		if (totalSpent >= 500000) return "Diamond";
		if (totalSpent >= 100000) return "Gold";
		if (totalSpent >= 25000) return "Silver";
		return "Bronze";
	},

	getMembershipProgress: function (totalSpent, currentTier) {
		const thresholds = {
			"Bronze": 25000,
			"Silver": 100000,
			"Gold": 500000,
			"Diamond": 1000000,
			"Royal": Infinity
		};
		const nextTier = {
			"Bronze": "Silver",
			"Silver": "Gold",
			"Gold": "Diamond",
			"Diamond": "Royal",
			"Royal": "MAX"
		};

		if (currentTier === "Royal") {
			return "🎉 You've reached the maximum tier!";
		}

		const needed = thresholds[currentTier] - totalSpent;
		const progress = Math.min(100, (totalSpent / thresholds[currentTier]) * 100);

		return `🎯 Progress to ${nextTier[currentTier]}: ${Math.round(progress)}%\n💰 Spend $${needed.toLocaleString()} more to upgrade!`;
	},

	getMembershipBenefits: function (tier) {
		const benefits = {
			"Bronze": "• Standard shop access\n• Basic customer support",
			"Silver": "• 5% discount on all items\n• Daily bonus rewards\n• Priority support",
			"Gold": "• 10% discount on all items\n• Exclusive item access\n• Early sale notifications\n• VIP support channel",
			"Diamond": "• 15% discount on all items\n• Legendary item access\n• Private trading room\n• Personal shopper service",
			"Royal": "• 20% discount on all items\n• Mythical item access\n• Unlimited storage\n• Custom item requests\n• Royal treatment everywhere"
		};
		return benefits[tier] || benefits["Bronze"];
	},

	// Additional methods would continue here...
	// (showItemInfo, searchItems, showMarket, compareItems, etc.)
	// For brevity, I'll end here but the pattern continues with enhanced formatting

	showItemInfo: function (message, args, fonts) {
		const itemId = args[1]?.toUpperCase();

		if (!itemId) {
			return message.reply(fonts.bold("❌ Please specify an item ID. Example: shop info SWORD"));
		}

		// Find item in all categories
		let item = null;
		let category = null;

		for (const [cat, items] of Object.entries(this.shopData)) {
			if (items[itemId]) {
				item = items[itemId];
				category = cat;
				break;
			}
		}
		if (!item) {
			return message.reply(fonts.bold("❌ Item not found. Use 'shop search <keyword>' to find items."));
		}

		let itemInfo = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("             ℹ️ ITEM ANALYSIS             ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

${this.getRarityEmoji(item.rarity)} ${fonts.bold(item.name)} ${this.getRarityEmoji(item.rarity)}
🏷️ ${fonts.bold("ID:")} ${itemId}
📂 ${fonts.bold("Category:")} ${category.charAt(0).toUpperCase() + category.slice(1)}
⭐ ${fonts.bold("Rarity:")} ${item.rarity}

${fonts.bold("📝 DESCRIPTION")}
${item.description}

${fonts.bold("💰 MARKET INFORMATION")}
💵 Buy Price: ${fonts.bold(`$${item.price.toLocaleString()}`)}
💸 Sell Price: ${fonts.bold(`$${item.sellPrice.toLocaleString()}`)}
📊 Value Retention: ${fonts.bold(`${Math.round((item.sellPrice / item.price) * 100)}%`)}
💎 Investment Grade: ${this.getInvestmentGrade(item)}

${fonts.bold("📊 ITEM STATISTICS")}`;

		if (item.attack) itemInfo += `\n⚔️ Attack Power: ${fonts.bold(item.attack)}`;
		if (item.defense) itemInfo += `\n🛡️ Defense Rating: ${fonts.bold(item.defense)}`;
		if (item.durability) itemInfo += `\n🔧 Durability: ${fonts.bold(item.durability)}`;
		if (item.efficiency) itemInfo += `\n⚡ Efficiency: ${fonts.bold(item.efficiency + "x")}`;
		if (item.hunger) itemInfo += `\n🍖 Hunger Restore: ${fonts.bold(item.hunger)}`;
		if (item.effect) itemInfo += `\n✨ Special Effect: ${fonts.bold(item.effect)} (+${item.power})`;
		if (item.loyalty) itemInfo += `\n❤️ Loyalty: ${fonts.bold(item.loyalty)}`;
		if (item.strength) itemInfo += `\n💪 Strength: ${fonts.bold(item.strength)}`;
		if (item.luck) itemInfo += `\n🍀 Luck: ${fonts.bold(item.luck)}`;
		if (item.speed) itemInfo += `\n💨 Speed: ${fonts.bold(item.speed)}`;
		if (item.magic) itemInfo += `\n🔮 Magic Power: ${fonts.bold(item.magic)}`;

		itemInfo += `\n\n${fonts.bold("📦 INVENTORY DETAILS")}`;
		itemInfo += `\n📋 Stackable: ${item.stackable ? `Yes (Max: ${item.maxStack})` : "No (Unique item)"}`;
		if (item.element) itemInfo += `\n🌟 Element: ${fonts.bold(item.element)}`;

		itemInfo += `\n\n${fonts.bold("🛒 PURCHASE INFORMATION")}`;
		itemInfo += `\n💳 Command: ${fonts.bold(`shop buy ${itemId} [quantity]`)}`;
		itemInfo += `\n📋 Example: ${fonts.bold(`shop buy ${itemId} 1`)}`;
		itemInfo += `\n❤️ Add to favorites: ${fonts.bold(`shop favorites add ${itemId}`)}`;

		return message.reply(itemInfo);
	},
	getInvestmentGrade: function (item) {
		const retention = (item.sellPrice / item.price) * 100;
		if (retention >= 80) return "🟢 Excellent";
		if (retention >= 70) return "🟡 Good";
		if (retention >= 60) return "🟠 Fair";
		return "🔴 Poor";
	},

	searchItems: function (message, args, fonts) {
		const keyword = args.slice(1).join(" ").toLowerCase();

		if (!keyword) {
			return message.reply(fonts.bold("❌ Please provide a search keyword. Example: shop search sword"));
		}

		let results = [];

		for (const [category, items] of Object.entries(this.shopData)) {
			for (const [id, item] of Object.entries(items)) {
				if (item.name.toLowerCase().includes(keyword) ||
					item.description.toLowerCase().includes(keyword) ||
					id.toLowerCase().includes(keyword) ||
					category.toLowerCase().includes(keyword)) {
					results.push({
						id,
						item,
						category
					});
				}
			}
		}

		if (results.length === 0) {
			return message.reply(fonts.bold(`❌ No items found matching "${keyword}". Try different keywords.`));
		}

		let searchResults = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold(`           🔍 SEARCH RESULTS: "${keyword}"           `)}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

Found ${fonts.bold(results.length)} matching items:

`;
		results.slice(0, 10).forEach(({ id, item, category }, index) => {
			searchResults += `${index + 1}. ${this.getRarityEmoji(item.rarity)} ${fonts.bold(item.name)}\n`;
			searchResults += `   🏷️ ID: ${fonts.bold(id)} | 📂 ${category}\n`;
			searchResults += `   💰 Price: ${fonts.bold(`$${item.price.toLocaleString()}`)}\n`;
			searchResults += `   📝 ${item.description}\n`;
			searchResults += `   🛒 ${fonts.bold(`shop buy ${id}`)}\n\n`;
		});

		if (results.length > 10) {
			searchResults += `${fonts.bold(`... and ${results.length - 10} more items. Try more specific keywords.`)}`;
		}

		return message.reply(searchResults);
	},

	showMarket: function (message, fonts) {
		const marketInfo = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("              📈 MARKET ANALYSIS              ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

${fonts.bold("💹 MARKET TRENDS")}
📊 Today's hot categories:
🥇 Weapons (+15% demand)
🥈 Potions (+12% demand)
🥉 Pets (+8% demand)

${fonts.bold("💰 PRICE RANGES")}
⚪ Common: $5 - $1,000
🟢 Rare: $400 - $5,000
🔵 Epic: $1,000 - $15,000
🟡 Legendary: $10,000 - $50,000
🟣 Mythical: $25,000+

${fonts.bold("📊 INVESTMENT RECOMMENDATIONS")}
🔥 Hot picks: Dragon items, Mythical pets
💎 Stable investments: Armor sets, Tools
📈 Rising value: Vehicles, Properties

${fonts.bold("⏰ MARKET HOURS")}
🕐 Peak activity: 6 PM - 10 PM
🛒 Best deals: Early morning
💸 Auction times: Weekends

${fonts.bold("💡 TRADING TIPS")}
• Buy rare items during low demand
• Hold legendary items for long-term value
• Monitor daily deals for discounts
• Check market before major purchases
`;

		return message.reply(marketInfo);
	},

	compareItems: function (message, args, fonts) {
		const item1Id = args[1]?.toUpperCase();
		const item2Id = args[2]?.toUpperCase();

		if (!item1Id || !item2Id) {
			return message.reply(fonts.bold("❌ Please provide two item IDs to compare. Example: shop compare SWORD BOW"));
		}

		let item1 = null, item2 = null;
		let cat1 = null, cat2 = null;

		// Find both items
		for (const [category, items] of Object.entries(this.shopData)) {
			if (items[item1Id]) {
				item1 = items[item1Id];
				cat1 = category;
			}
			if (items[item2Id]) {
				item2 = items[item2Id];
				cat2 = category;
			}
		}

		if (!item1 || !item2) {
			return message.reply(fonts.bold("❌ One or both items not found. Use 'shop search' to find item IDs."));
		}

		const comparison = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("              ⚖️ ITEM COMPARISON              ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

${fonts.bold("ITEM 1:")} ${this.getRarityEmoji(item1.rarity)} ${fonts.bold(item1.name)}
${fonts.bold("ITEM 2:")} ${this.getRarityEmoji(item2.rarity)} ${fonts.bold(item2.name)}

${fonts.bold("📊 BASIC STATS")}
Category: ${cat1} vs ${cat2}
Rarity: ${item1.rarity} vs ${item2.rarity}
Price: $${item1.price.toLocaleString()} vs $${item2.price.toLocaleString()}
Sell Price: $${item1.sellPrice.toLocaleString()} vs $${item2.sellPrice.toLocaleString()}
${fonts.bold("⚔️ COMBAT STATS")}
Attack: ${item1.attack || "N/A"} vs ${item2.attack || "N/A"}
Defense: ${item1.defense || "N/A"} vs ${item2.defense || "N/A"}
Durability: ${item1.durability || "N/A"} vs ${item2.durability || "N/A"}

${fonts.bold("💰 VALUE ANALYSIS")}
Investment Grade: ${this.getInvestmentGrade(item1)} vs ${this.getInvestmentGrade(item2)}
Value Retention: ${Math.round((item1.sellPrice / item1.price) * 100)}% vs ${Math.round((item2.sellPrice / item2.price) * 100)}%

${fonts.bold("🏆 RECOMMENDATION")}
${this.getComparisonWinner(item1, item2, item1Id, item2Id)}
`;

		return message.reply(comparison);
	},

	getComparisonWinner: function (item1, item2, id1, id2) {
		const score1 = (item1.attack || 0) + (item1.defense || 0) + (item1.price / 100);
		const score2 = (item2.attack || 0) + (item2.defense || 0) + (item2.price / 100);

		if (score1 > score2) {
			return `🥇 ${item1.name} (${id1}) has better overall value!`;
		} else if (score2 > score1) {
			return `🥇 ${item2.name} (${id2}) has better overall value!`;
		} else {
			return `🤝 Both items have similar value - choose based on your needs!`;
		}
	},

	showBundles: function (message, fonts) {
		const bundles = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("             📦 EXCLUSIVE BUNDLES             ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

${fonts.bold("⚔️ WARRIOR STARTER PACK")} - $2,500
• Iron Sword + Knight's Helm + Health Potions (x5)
• 💰 Save 15% vs individual purchase
• Perfect for new adventurers

${fonts.bold("🏹 RANGER ELITE SET")} - $4,200
• Elven Bow + Swift Boots + Healing Soup (x3)
• 💰 Save 20% vs individual purchase
• Ideal for stealth gameplay
${fonts.bold("🔮 MAGE SUPREME COLLECTION")} - $6,800
• Arcane Staff + Mystic Cloak + Mana Potions (x10)
• 💰 Save 25% vs individual purchase
• Master the arcane arts

${fonts.bold("🐉 DRAGON SLAYER BUNDLE")} - $15,000
• Dragon Katana + Steel Chestplate + Phoenix Tear
• 💰 Save 30% vs individual purchase
• Face the ultimate challenge

${fonts.bold("👑 ROYAL COLLECTION")} - $75,000
• Royal Crown + Ancient Dragon + Portal Device
• 💰 Save 35% vs individual purchase
• For true legends only

${fonts.bold("🎯 HOW TO PURCHASE")}
Contact admins for bundle deals or use:
💬 Comment your desired bundle
🏪 Bundles refresh monthly
⭐ VIP members get extra 10% off

${fonts.bold("⏰ LIMITED TIME OFFERS")}
🔥 Flash sales every Friday
🎁 Holiday special bundles
💎 Member-exclusive packages
`;

		return message.reply(bundles);
	},

	dailyDeals: async function (message, userData, usersData, senderID, fonts) {
		const today = new Date().toDateString();
		const lastDailyCheck = userData.shopData?.lastDailyCheck;

		// Check if user already claimed today's deals
		if (lastDailyCheck === today) {
			return message.reply(fonts.bold(`
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("            ⏰ DAILY DEALS STATUS            ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

❌ You've already checked today's deals!
🕐 Come back tomorrow for new offers
💎 Current membership: ${userData.shopData?.membershipLevel || "Bronze"}
🎯 Loyalty points: ${userData.shopData?.loyaltyPoints || 0}

${fonts.bold("💡 MEANWHILE, YOU CAN:")}
• Check regular shop: ${fonts.bold("shop list")}
• View your profile: ${fonts.bold("shop profile")}
• Browse bundles: ${fonts.bold("shop bundle")}
			`));		}

		// Generate daily rewards
		const membershipLevel = userData.shopData?.membershipLevel || "Bronze";
		const bonusMultiplier = this.getMembershipDiscount(membershipLevel) + 1;

		const dailyMoney = Math.floor(Math.random() * 1000 * bonusMultiplier) + 500;
		const loyaltyBonus = Math.floor(dailyMoney / 10);

		// Daily featured items (random selection)
		const allItems = [];
		for (const [category, items] of Object.entries(this.shopData)) {
			for (const [id, item] of Object.entries(items)) {
				allItems.push({ id, item, category });
			}
		}

		const featuredItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 3);

		// Apply daily rewards
		userData.money = (userData.money || 0) + dailyMoney;
		userData.shopData.loyaltyPoints = (userData.shopData.loyaltyPoints || 0) + loyaltyBonus;
		userData.shopData.lastDailyCheck = today;

		await usersData.set(senderID, userData);

		let dailyMessage = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("              🎁 DAILY REWARDS              ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

🎉 Welcome back, ${userData.name || "Hero"}!
💰 Daily bonus: ${fonts.bold(`+$${dailyMoney.toLocaleString()}`)}
🎯 Loyalty points: ${fonts.bold(`+${loyaltyBonus}`)}
💎 Membership bonus: ${fonts.bold(`${Math.round((bonusMultiplier - 1) * 100)}%`)}

${fonts.bold("🔥 TODAY'S FEATURED ITEMS")}
`;
		featuredItems.forEach((featured, index) => {
			const discount = Math.floor(Math.random() * 30) + 10; // 10-40% discount
			const discountedPrice = Math.floor(featured.item.price * (1 - discount / 100));

			dailyMessage += `
${index + 1}. ${this.getRarityEmoji(featured.item.rarity)} ${fonts.bold(featured.item.name)}
   💰 Original: $${featured.item.price.toLocaleString()}
   🔥 Today only: ${fonts.bold(`$${discountedPrice.toLocaleString()}`)} (${discount}% off!)
   🛒 ${fonts.bold(`shop buy ${featured.id}`)}
`;
		});

		dailyMessage += `
${fonts.bold("💡 QUICK ACTIONS")}
• Browse all items: ${fonts.bold("shop list")}
• Check your stats: ${fonts.bold("shop profile")}
• View your items: ${fonts.bold("shop inventory")}

🕐 ${fonts.bold("Come back tomorrow for new deals!")}
`;

		return message.reply(dailyMessage);
	},

	manageWishlist: async function (message, args, userData, usersData, senderID, fonts) {
		const action = args[1]?.toLowerCase();
		const itemId = args[2]?.toUpperCase();

		if (!userData.shopData.favoriteItems) {
			userData.shopData.favoriteItems = [];
		}

		switch (action) {
			case "add":
				if (!itemId) {
					return message.reply(fonts.bold("❌ Please specify an item ID. Example: shop favorites add SWORD"));
				}
				// Check if item exists
				let itemExists = false;
				for (const [category, items] of Object.entries(this.shopData)) {
					if (items[itemId]) {
						itemExists = true;
						break;
					}
				}

				if (!itemExists) {
					return message.reply(fonts.bold("❌ Item not found. Use 'shop search' to find items."));
				}

				if (userData.shopData.favoriteItems.includes(itemId)) {
					return message.reply(fonts.bold("❌ Item already in your favorites!"));
				}

				userData.shopData.favoriteItems.push(itemId);
				await usersData.set(senderID, userData);
				return message.reply(fonts.bold(`✅ Added ${itemId} to your favorites!`));

			case "remove":
				if (!itemId) {
					return message.reply(fonts.bold("❌ Please specify an item ID to remove."));
				}

				const index = userData.shopData.favoriteItems.indexOf(itemId);
				if (index === -1) {
					return message.reply(fonts.bold("❌ Item not in your favorites."));
				}

				userData.shopData.favoriteItems.splice(index, 1);
				await usersData.set(senderID, userData);
				return message.reply(fonts.bold(`✅ Removed ${itemId} from your favorites!`));

			case "clear":
				userData.shopData.favoriteItems = [];
				await usersData.set(senderID, userData);
				return message.reply(fonts.bold("✅ Cleared all favorites!"));
			default:
				// Show favorites list
				if (userData.shopData.favoriteItems.length === 0) {
					return message.reply(fonts.bold(`
❤️ Your wishlist is empty!
Use ${fonts.bold("shop favorites add <ITEM_ID>")} to add items.
					`));
				}

				let favoritesList = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("              ❤️ YOUR WISHLIST              ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

`;

				userData.shopData.favoriteItems.forEach((favId, index) => {
					// Find item details
					for (const [category, items] of Object.entries(this.shopData)) {
						if (items[favId]) {
							const item = items[favId];
							favoritesList += `${index + 1}. ${this.getRarityEmoji(item.rarity)} ${fonts.bold(item.name)}\n`;
							favoritesList += `   💰 Price: $${item.price.toLocaleString()}\n`;
							favoritesList += `   🛒 ${fonts.bold(`shop buy ${favId}`)}\n\n`;
							break;
						}
					}
				});

				favoritesList += `${fonts.bold("💡 MANAGE FAVORITES:")}\n`;
				favoritesList += `• Remove: ${fonts.bold("shop favorites remove <ID>")}\n`;
				favoritesList += `• Clear all: ${fonts.bold("shop favorites clear")}`;

				return message.reply(favoritesList);
		}
	},

	sellItem: async function (message, args, userData, usersData, senderID, fonts) {
		const itemId = args[1]?.toUpperCase();
		const quantity = parseInt(args[2]) || 1;

		if (!itemId) {
			return message.reply(fonts.bold("❌ Please specify an item ID. Use 'shop inventory' to see your items."));
		}
		// Find item in user's inventory
		let userItem = null;
		let category = null;
		let shopItem = null;

		for (const [cat, items] of Object.entries(userData.inventory || {})) {
			if (items[itemId] && items[itemId].quantity > 0) {
				userItem = items[itemId];
				category = cat;
				shopItem = this.shopData[cat][itemId];
				break;
			}
		}

		if (!userItem || !shopItem) {
			return message.reply(fonts.bold("❌ You don't own this item or it's not in your inventory."));
		}

		if (quantity > userItem.quantity) {
			return message.reply(fonts.bold(`❌ You only have ${userItem.quantity} of this item.`));
		}

		const sellPrice = shopItem.sellPrice * quantity;

		// Process sale
		userData.money = (userData.money || 0) + sellPrice;
		userItem.quantity -= quantity;

		if (userItem.quantity === 0) {
			delete userData.inventory[category][itemId];
		}

		await usersData.set(senderID, userData);

		return message.reply(fonts.bold(`
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("             ✅ SALE SUCCESSFUL!             ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

${this.getRarityEmoji(shopItem.rarity)} ${fonts.bold(shopItem.name)} ${fonts.bold(`x${quantity}`)}
💰 Received: ${fonts.bold(`$${sellPrice.toLocaleString()}`)}
💳 New balance: ${fonts.bold(`$${userData.money.toLocaleString()}`)}
📦 Remaining: ${fonts.bold(userItem.quantity || 0)}
		`));
	},

	tradeItems: function (message, args, event, usersData, fonts) {
		return message.reply(fonts.bold(`
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("              🔄 TRADING SYSTEM              ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
🚧 Trading system is currently under development!

${fonts.bold("📋 PLANNED FEATURES:")}
• Player-to-player item trading
• Secure trade confirmations
• Trade history tracking
• Anti-scam protection systems
• Market-based trade values

${fonts.bold("💡 CURRENT ALTERNATIVES:")}
• Use ${fonts.bold("shop sell")} to convert items to money
• Use ${fonts.bold("shop buy")} to purchase desired items
• Check ${fonts.bold("shop market")} for current prices

🔔 Stay tuned for updates!
		`));
	},

	showAchievements: function (message, userData, fonts) {
		const achievements = [
			{ name: "First Purchase", desc: "Make your first shop purchase", unlocked: (userData.shopData?.purchaseHistory?.length || 0) > 0 },
			{ name: "Big Spender", desc: "Spend over $10,000", unlocked: (userData.shopData?.totalSpent || 0) >= 10000 },
			{ name: "Collector", desc: "Own 20+ different items", unlocked: this.countInventoryItems(userData) >= 20 },
			{ name: "Loyal Customer", desc: "Reach Silver membership", unlocked: (userData.shopData?.membershipLevel || "Bronze") !== "Bronze" },
			{ name: "Millionaire", desc: "Spend over $1,000,000", unlocked: (userData.shopData?.totalSpent || 0) >= 1000000 },
			{ name: "Dragon Slayer", desc: "Own a legendary weapon", unlocked: this.hasLegendaryWeapon(userData) },
			{ name: "Daily Visitor", desc: "Check daily deals 7 days", unlocked: false }, // Simplified for now
			{ name: "Wishlist Curator", desc: "Add 10+ items to favorites", unlocked: (userData.shopData?.favoriteItems?.length || 0) >= 10 }
		];
		let achievementText = `
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("             🏆 ACHIEVEMENTS             ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

`;

		const unlockedCount = achievements.filter(a => a.unlocked).length;
		achievementText += `Progress: ${fonts.bold(`${unlockedCount}/${achievements.length}`)} unlocked\n\n`;

		achievements.forEach(achievement => {
			const status = achievement.unlocked ? "✅" : "🔒";
			achievementText += `${status} ${fonts.bold(achievement.name)}\n`;
			achievementText += `   📝 ${achievement.desc}\n\n`;
		});

		achievementText += `${fonts.bold("🎁 ACHIEVEMENT REWARDS:")}\n`;
		achievementText += `• Unlock exclusive titles\n`;
		achievementText += `• Earn loyalty point bonuses\n`;
		achievementText += `• Access to special items\n`;
		achievementText += `• Priority customer support`;

		return message.reply(achievementText);
	},

	countInventoryItems: function (userData) {
		let count = 0;
		for (const category of Object.values(userData.inventory || {})) {
			count += Object.keys(category).length;
		}
		return count;
	},

	hasLegendaryWeapon: function (userData) {
		const weapons = userData.inventory?.weapons || {};
		for (const [id, userItem] of Object.entries(weapons)) {
			const shopItem = this.shopData.weapons[id];
			if (shopItem && shopItem.rarity === "Legendary" && userItem.quantity > 0) {
				return true;
			}
		}
		return false;
	},

	upgradeItem: function (message, args, userData, usersData, senderID, fonts) {
		return message.reply(fonts.bold(`
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("              ⭐ UPGRADE SYSTEM              ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

🚧 Item upgrade system is coming soon!

${fonts.bold("📋 PLANNED FEATURES:")}
• Enhance item stats and rarity
• Use materials for upgrades
• Increase durability and power
• Unlock special abilities
• Custom upgrade paths

${fonts.bold("💡 PREPARATION TIPS:")}
• Collect rare materials
• Save up upgrade costs
• Choose items worth upgrading
• Plan your upgrade strategy

🔔 Updates coming in next version!
		`));
	},
	craftItem: function (message, args, userData, usersData, senderID, fonts) {
		return message.reply(fonts.bold(`
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("              ⚗️ CRAFTING SYSTEM              ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

🚧 Crafting system is under development!

${fonts.bold("📋 PLANNED FEATURES:")}
• Combine materials to create items
• Unique crafting recipes
• Rare crafted items exclusive to crafting
• Crafting skill progression
• Master craftsman achievements

${fonts.bold("💡 START COLLECTING:")}
• Gather ${fonts.bold("materials")} from shop
• Stock up on common ingredients
• Save rare components for epic crafts
• Learn recipes from other players

🔔 Crafting workshop opening soon!
		`));
	},

	showAuction: function (message, fonts) {
		return message.reply(fonts.bold(`
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}
${fonts.bold("             🏛️ AUCTION HOUSE             ")}
${fonts.bold("🌟 ═══════════════════════════════════════ 🌟")}

🚧 Auction system is in development!

${fonts.bold("📋 PLANNED FEATURES:")}
• Bid on rare and unique items
• List your items for auction
• Competitive bidding system
• Auction history and analytics
• Exclusive auction-only items

${fonts.bold("💡 AUCTION CATEGORIES:")}
• Legendary weapons and armor
• Mythical pets and mounts
• Rare collectibles and artifacts
• Limited edition items
• Player-owned treasures

${fonts.bold("🕐 COMING FEATURES:")}
• Weekly themed auctions
• VIP member early access
• Auction house leaderboards
• Professional appraisal service

🔔 Grand opening announcement soon!
		`));
	},
	updateGlobalStats: async function (itemId, item, totalCost, quantity, userData, globalData) {
		try {
			// Get current shop stats or initialize if not exists
			let shopStats = await globalData.get("shopStats", "data", {
				totalSales: 0,
				totalRevenue: 0,
				popularItems: {},
				activeShoppers: {}
			});

			// Update total sales and revenue
			shopStats.totalSales += quantity;
			shopStats.totalRevenue += totalCost;

			// Update popular items
			if (!shopStats.popularItems[itemId]) {
				shopStats.popularItems[itemId] = {
					name: item.name,
					sales: 0,
					revenue: 0
				};
			}
			shopStats.popularItems[itemId].sales += quantity;
			shopStats.popularItems[itemId].revenue += totalCost;

			// Update active shoppers
			shopStats.activeShoppers[userData.userID] = {
				name: userData.name,
				lastPurchase: Date.now()
			};

			// Save updated shop stats
			await globalData.set("shopStats", shopStats, "data");
		} catch (error) {
			console.error("Error updating global shop stats:", error);
		}
	}
};

		
