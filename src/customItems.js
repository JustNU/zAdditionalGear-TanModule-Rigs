"use strict";

class CustomItems {
	static handleCustomItems(database, core, config, itemConfig, itemData)
	{
		if (itemConfig["Rigs"]["AddGearTan_AVS_MBAV"]) {
			core.addItemRetexture("AddGearTan_AVS_MBAV", itemData["AddGearTan_AVS_MBAV"].BaseItemID, itemData["AddGearTan_AVS_MBAV"].BundlePath, false, false, itemData["AddGearTan_AVS_MBAV"].LootWeigthMult);
			const dbItem = database.templates.items["AddGearTan_AVS_MBAV"];
			
			if (config.AddToBots)
				core.copyBotItemWeighting("AddGearTan_AVS_MBAV", "5b44cad286f77402a54ae7e5");
			
			// change stats
			dbItem._props.armorClass = dbItem._props.armorClass - 1; // 5
			
			// find handbook entry
			const dbItemHandbook = database.templates.handbook.Items.find((item) => {return item.Id === "AddGearTan_AVS_MBAV"});
			
			// change handbook price
			dbItemHandbook.Price = Math.round(dbItemHandbook.Price - (dbItemHandbook.Price * 0.60)); // 86000
			
			// change flea price (if it has one)
			if (database.templates.prices["AddGearTan_AVS_MBAV"])
				database.templates.prices["AddGearTan_AVS_MBAV"] = dbItemHandbook.Price;
			
			// add trade offer
			if (config.EnableTradeOffers)
				core.createTraderOffer("AddGearTan_AVS_MBAV", "5ac3b934156ae10c4430e83c", "5449016a4bdc2d6f028b456f", dbItemHandbook.Price, 4);
		}
	}
}

module.exports = CustomItems;