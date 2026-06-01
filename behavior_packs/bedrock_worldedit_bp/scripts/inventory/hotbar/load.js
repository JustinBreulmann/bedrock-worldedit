import { world, system, ItemStack } from "@minecraft/server";

export function loadHotbar(player) {
    const hotbarArrayString = player.getDynamicProperty("hotbarData");

    if (typeof hotbarArrayString !== 'string') {
        console.error("Invalid hotbarData: expected a string");
        return;
    }

    let hotbarArray;
    try {
        hotbarArray = JSON.parse(hotbarArrayString);
    } catch (error) {
        console.error("Error parsing hotbarData:", error);
        return;
    }

    const inventory = player.getComponent('minecraft:inventory').container;

    for (let i = 0; i < 9; i++) {
        const hotbarData = hotbarArray[i];

        if (hotbarData) {
            const [item, amount] = hotbarData.split('-');

            if (item && !isNaN(amount)) {
                inventory.setItem(i, new ItemStack(item, parseInt(amount)));
            } else {
                console.error(`Invalid hotbar item data at index ${i}: ${hotbarData}`);
            }
        } 
    }

    player.setDynamicProperty("hotbarData", "");
}