import { world, system, ItemStack } from "@minecraft/server";

export function clearHotbar(player) {
    const inventory = player.getComponent('minecraft:inventory').container
    for (let i = 0; i < 9; i++) {
            inventory.setItem(i, new ItemStack('minecraft:air'));
    }
};
