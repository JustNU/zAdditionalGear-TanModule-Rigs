"use strict";

class Mod
{
	
	postDBLoad(container) 
	{
		// Constants
		const logger = container.resolve("WinstonLogger");
		const database = container.resolve("DatabaseServer").getTables();
		const jsonUtil = container.resolve("JsonUtil");
		const core = container.resolve("JustNUCore");
		const modDb = `user/mods/zAdditionalGear-TanModule-Rigs/db/`;
		const config = require("../config/config.json");
		const itemConfig = require("../config/itemConfig.json");
		const itemData = require("../db/items/itemData.json");
		
		// edge cases
		const edgeCases = ["AddGearTan_AVS_MBAV"];
		
		//add retextures
		for (const categoryId in itemConfig) {
			for (const itemId in itemConfig[categoryId]) {
				// skip edge cases, handle them later
				if (edgeCases.includes(itemId)) {
					continue;
				}
				
				if (itemConfig[categoryId][itemId]) {
					core.addItemRetexture(modDb, itemId, itemData[itemId].BaseItemID, itemData[itemId].BundlePath, config.EnableTradeOffers, config.AddToBots, itemData[itemId].LootWeigthMult);
				}
			}
		}
		
		// deal with edge cases
		// AVS MBAV
		if (itemConfig["Rigs"]["AddGearTan_AVS_MBAV"]) {
			core.addItemRetexture(modDb, "AddGearTan_AVS_MBAV", "609e860ebd219504d8507525", "AddGearTan/Rigs/avs_mbav.bundle", false, false, itemData["AddGearTan_AVS_MBAV"].LootWeigthMult);
			core.copyBotItemWeighting("AddGearTan_AVS_MBAV", "5aa2a7e8e5b5b00016327c16");
			
			// change price
			database.templates.prices["AddGearTan_AVS_MBAV"] = 118933;
			
			for (const handbookItemIndex in database.templates.handbook.Items) {
				if (database.templates.handbook.Items[handbookItemIndex].Id === "AddGearTan_AVS_MBAV") {
					database.templates.handbook.Items[handbookItemIndex].Price = 90465;
					break;
				}
			}
			
			// change stats
			database.templates.items["AddGearTan_AVS_MBAV"]._props.armorClass = database.templates.items["AddGearTan_AVS_MBAV"]._props.armorClass - 1;
			
			// add trade offer
			core.createTraderOffer("AddGearTan_AVS_MBAV", "5ac3b934156ae10c4430e83c", "5449016a4bdc2d6f028b456f", 118933, 3)
		}
		
		// Modify quests
		if (config.EnableQuestChanges) {
			const armoredVests = [
				["AddGearTan_TacTec_Carrier"],
				["AddGearTan_ANA_M1"],
				["AddGearTan_ANA_M2"],
				["AddGearTan_ARS_CPC"],
				["AddGearTan_Crye_AVS"],
				["AddGearTan_AVS_MBAV"]
			];
			
			// The survivalist path. Unprotected, but dangerous
			if (database.templates.quests["5d25aed386f77442734d25d2"]) {
				const unprotectedButDangerousGear = database.templates.quests["5d25aed386f77442734d25d2"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive;
				
				database.templates.quests["5d25aed386f77442734d25d2"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive = [
					...jsonUtil.clone(unprotectedButDangerousGear),
					...armoredVests
				];
			}
			
			// Swift one
			if (database.templates.quests["60e729cf5698ee7b05057439"]) {
				const swiftOneGear = database.templates.quests["60e729cf5698ee7b05057439"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive;
				
				database.templates.quests["60e729cf5698ee7b05057439"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive = [
					...jsonUtil.clone(swiftOneGear),
					...armoredVests
				];
			}
		}
	}
}

module.exports = { mod: new Mod() }