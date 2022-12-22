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
		const modDb = `user/mods/zAdditionalGear-TanModule/db/`;
		const config = require("../config/config.json");
		const itemConfig = require("../config/itemConfig.json");
		const itemData = require("../db/items/itemData.json");
		
		// edge cases
		const edgeCases = [];
		
		//add retextures
		for (const categoryId in itemConfig) {
			for (const itemId in itemConfig[categoryId]) {
				// skip edge cases, handle them later
				if (edgeCases.includes(itemId)) {
					continue;
				}
				
				if (itemConfig[categoryId][itemId]) {
					core.addItemRetexture(modDb, itemId, itemData[itemId].BaseItemID, itemData[itemId].BundlePath, config.EnableTradeOffers, config.AddToBots);
				}
			}
		}
		
		// deal with edge cases
		
		// debug
		const debug = true;
		
		if (debug) {
			for (const item in database.templates.items) {
				database.templates.items[item]._props.ExaminedByDefault = true;
			}
		}
		
		// Modify quests
		if (config.EnableQuestChanges) {
			const armoredVests = [
				["AddGearTan_GEN4_Full"],
				["AddGearTan_GEN4_Assault"],
				["AddGearTan_GEN4_Mobility"],
				["AddGearTan_6B13"],
				["AddGearTan_Hexgrid"],
				["AddGearTan_UntarVest"],
				["AddGearTan_Trooper"],
				["AddGearTan_Trooper_Clean"],
				["AddGearTan_PACA"],
				["AddGearTan_6B2"],
				["AddGearTan_tacteccarrier"],
				["AddGearTan_anam1"],
				["AddGearTan_anam2"],
				["AddGearTan_arscpc"],
				["AddGearTan_cryeavs"]
			];
			
			const armoredGear = [
				["AddGearTan_GEN4_Full"],
				["AddGearTan_GEN4_Assault"],
				["AddGearTan_GEN4_Mobility"],
				["AddGearTan_6B13"],
				["AddGearTan_Hexgrid"],
				["AddGearTan_UntarVest"],
				["AddGearTan_Trooper"],
				["AddGearTan_Trooper_Clean"],
				["AddGearTan_PACA"],
				["AddGearTan_6B2"]
			];
				
			const punisher5Gear = [
				["AddGearTan_PACA", "5aa7cfc0e5b5b00015693143"],
				["AddGearTan_PACA", "5a7c4850e899ef00150be885"],
				["AddGearTan_PACA", "AddGearBlack_6b47covered_black"],
				["AddGearTan_PACA", "AddGearTan_6B47"]
			];
			
			// The survivalist path. Unprotected, but dangerous
			if (database.templates.quests["5d25aed386f77442734d25d2"]) {
				const unprotectedButDangerousGear = database.templates.quests["5d25aed386f77442734d25d2"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive;
				
				database.templates.quests["5d25aed386f77442734d25d2"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive = [
					...jsonUtil.clone(unprotectedButDangerousGear),
					...armoredVests
				];
			}
			
			// The Punisher - Part 5
			if (database.templates.quests["59ca29fb86f77445ab465c87"]) {
				const thePunisher5Gear = database.templates.quests["59ca29fb86f77445ab465c87"].conditions.AvailableForFinish[6]._props.counter.conditions[1]._props.equipmentInclusive;
				
				database.templates.quests["59ca29fb86f77445ab465c87"].conditions.AvailableForFinish[6]._props.counter.conditions[1]._props.equipmentInclusive = [
					...jsonUtil.clone(thePunisher5Gear),
					...punisher5Gear
				];
			}
			
			// Swift one
			if (database.templates.quests["60e729cf5698ee7b05057439"]) {
				const swiftOneGear = database.templates.quests["60e729cf5698ee7b05057439"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive;
				
				database.templates.quests["60e729cf5698ee7b05057439"].conditions.AvailableForFinish[0]._props.counter.conditions[1]._props.equipmentExclusive = [
					...jsonUtil.clone(swiftOneGear),
					...armoredGear
				];
			}
		}
		
		/*
		// Tactical/Armored Rigs //
		core.AddItemRetexture(db, 	"5b44cad286f77402a54ae7e5", "AddGearTan_tacteccarrier",			"AddGearTan/Rigs/tacteccarrier.bundle");
		core.AddItemRetexture(db, 	"592c2d1a86f7746dbe2af32a", "AddGearTan_anaalpha", 				"AddGearTan/Rigs/anaalpha.bundle");
		core.AddItemRetexture(db, 	"5c0e722886f7740458316a57", "AddGearTan_anam1", 				"AddGearTan/Rigs/anam1.bundle");
		core.AddItemRetexture(db, 	"5ab8dced86f774646209ec87", "AddGearTan_anam2", 				"AddGearTan/Rigs/anam2.bundle");
		core.AddItemRetexture(db, 	"5e4ac41886f77406a511c9a8", "AddGearTan_arscpc", 				"AddGearTan/Rigs/arscpc.bundle");
		core.AddItemRetexture(db, 	"5df8a42886f77412640e2e75", "AddGearTan_mppv", 					"AddGearTan/Rigs/mppv.bundle");
		core.AddItemRetexture(db, 	"544a5caa4bdc2d1a388b4568", "AddGearTan_cryeavs", 				"AddGearTan/Rigs/cryeavs.bundle");
		core.AddItemRetexture(db, 	"5648a69d4bdc2ded0b8b457b", "AddGearTan_blackrock", 			"AddGearTan/Rigs/blackrock.bundle");
		core.AddItemRetexture(db, 	"5d5d85c586f774279a21cbdb", "AddGearTan_d3crx", 				"AddGearTan/Rigs/d3crx.bundle");
		core.AddItemRetexture(db, 	"5e9db13186f7742f845ee9d3", "AddGearTan_lbt1961a", 				"AddGearTan/Rigs/lbt1961a.bundle");
		core.AddItemRetexture(db, 	"5f5f41f56760b4138443b352", "AddGearTan_thunderbolt", 			"AddGearTan/Rigs/thunderbolt.bundle");
		core.AddItemRetexture(db, 	"59e7643b86f7742cbf2c109a", "AddGearTan_tv109", 				"AddGearTan/Rigs/tv109.bundle");
		core.AddItemRetexture(db, 	"59e7643b86f7742cbf2c109a", "AddGearTan_AZIMUT", 				"AddGearTan/Rigs/AZIMUT.bundle");
		core.AddItemRetexture(db, 	"609e860ebd219504d8507525", "AddGearTan_AVS_MBAV", 				"AddGearTan/Rigs/avs_mbav.bundle");
		*/
	}
}

module.exports = { mod: new Mod() }