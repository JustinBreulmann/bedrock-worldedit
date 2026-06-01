import { world, system, ItemStack } from "@minecraft/server";

export function saveHotbar(player) {
    let hotbar = []
    const invCon = player.getComponent('minecraft:inventory').container
        for (let i = 0; i < 9; i++) {
                if(invCon.getItem(i) === undefined) {hotbar.push("minecraft:air-1")}
                else {
            hotbar.push(invCon.getItem(i).typeId + "-" + invCon.getItem(i).amount)
                }
        }
    player.setDynamicProperty("hotbarData", JSON.stringify(hotbar))
    console.warn(player.getDynamicProperty("hotbarData"))
}
