import { world, system, ItemStack, BlockPermutation,ItemLockMode } from "@minecraft/server";

import {loadHotbar} from "../../../inventory/hotbar/load"
import {saveHotbar} from "../../../inventory/hotbar/save"
import {clearHotbar} from "../../../inventory/hotbar/clear"

export function builderMode(player) {
	saveHotbar(player)
	world.sendMessage("[§bi§f] Baumodus §aaktiv")
    clearHotbar(player)
	customMode(player)
}

function customMode(player) {
    const inventory = player.getComponent('minecraft:inventory').container;

    const kitchen = new ItemStack("block:oven")
    kitchen.setLore([
        "§r§7-Oven",
        "§r§7-Lade",
        "§r§7-Schrank",
        "§r§7-Waschbecken",
        "§r§7-Kühlschrank",
        "§r§7-Toaster",
        "§r§7-Mirkowelle",
        "§r§7-Kaffeemaschine",
        "§r§7-Besteck",
        "§r§7-Pfanne",
        "§r§7-Vorhang"
    ]);
    kitchen.nameTag = `§r§f§lKüche `;
	kitchen.lockMode = ItemLockMode.slot;

    inventory.setItem(0, kitchen);

    const table = new ItemStack("block:small_table_concrete");
    table.setLore([
        "§r§7-Eichentisch",
        "§r§7-Fichtentisch",
        "§r§7-Betontisch"
    ]);
    table.nameTag = `§r§f§lTische `;
	table.lockMode = ItemLockMode.slot;
    inventory.setItem(1, table);

    const chair = new ItemStack("block:concrete_chair");
    chair.setLore([
        "§r§7-Eichenstuhl",
        "§r§7-Fichtenstuhl",
        "§r§7-Betonstuhl",
        "§r§7-Bürostuhl",
        "§r§7-Bartisch"
    ]);
    chair.nameTag = `§r§f§lStühle `;
	chair.lockMode = ItemLockMode.slot;
    inventory.setItem(2, chair);

    const living = new ItemStack("block:sofa");
    living.setLore([
        "§r§7-sofa",
        "§r§7-Couch",
        "§r§7-TV Bank",
        "§r§7-TV"
    ]);
    living.nameTag = `§r§f§lWohnzimmer`;
	living.lockMode = ItemLockMode.slot;
    inventory.setItem(3, living);

    const bathroom = new ItemStack("block:toilet");
    bathroom.setLore([
        "§r§7-Toilette",
        "§r§7-Spiegel",
        "§r§7-Waschbecken",
        "§r§7-Dusche"
    ]);
    bathroom.nameTag = `§r§f§lBadezimmer`;
	bathroom.lockMode = ItemLockMode.slot;
    inventory.setItem(4, bathroom);

    const technic = new ItemStack("block:tv");
    technic.setLore([
        "§r§7-TV",
        "§r§7-Laptop",
        "§r§7-Drucker",
        "§r§7-Kopfhörer",
        "§r§7-Kamera",
        "§r§7-Router",
        "§r§7-PS5",
        "§r§7-PC"
    ]);
    technic.nameTag = `§r§f§lTechnik`;
	technic.lockMode = ItemLockMode.slot;
    inventory.setItem(5, technic);

    const construction = new ItemStack("block:cone");
    construction.setLore([
        "§r§7-Hütchen",
        "§r§7-Straßenschilder",
        "§r§7-Ampel",
        "§r§7-Kamera",
        "§r§7-Türklingel",
        "§r§7-Hyrant",
        "§r§7-Kanaldeckel",
        "§r§7-Absperrung",
        "§r§7-Feuerlöscher",
        "§r§7-Alarm"
    ]);
	construction.lockMode = ItemLockMode.slot;
    construction.nameTag = `§r§f§lBaustelle`;
    inventory.setItem(6, construction);

    const back = new ItemStack("minecraft:barrier");
	back.lockMode = ItemLockMode.slot;
    back.nameTag = `§r§c§lBaumodus Verlassen`;
    inventory.setItem(8, back);

    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
            if (itemStack.typeId === "block:oven") {
                hotbarKitchen(source);
                world.afterEvents.itemUse.unsubscribe(Instance)
            } else if (itemStack.typeId === "block:small_table_concrete") {
                hotbarTable(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            } else if (itemStack.typeId === "block:concrete_chair") {
                hotbarChair(source);
                world.afterEvents.itemUse.unsubscribe(Instance)
            } else if (itemStack.typeId === "block:sofa") {
                hotbarLiving(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            } else if (itemStack.typeId === "block:toilet") {
                hotbarBathroom(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            } else if (itemStack.typeId === "block:tv") {
                hotbarTechnic(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            } else if (itemStack.typeId === "block:cone") {
                hotbarConstruction(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            } else if (itemStack.typeId === "minecraft:barrier") {
                clearHotbar(data.source)
                loadHotbar(data.source)
                world.sendMessage("[§bi§f] Baumodus §cdeaktiviert")
                world.afterEvents.itemUse.unsubscribe(Instance)
            } 
        })
    }
}


function hotbarKitchen(player) {
    const inventory = player.getComponent('minecraft:inventory').container;

    inventory.setItem(0, new ItemStack("minecraft:barrier"));
    inventory.setItem(1, new ItemStack("block:kitchen_counter"));
    inventory.setItem(2, new ItemStack("block:kitchen_cabinet"));
    inventory.setItem(3, new ItemStack("block:kitchen_drawer"));
    inventory.setItem(4, new ItemStack("block:kitchen_sink"));
    inventory.setItem(5, new ItemStack("block:fridge"));
    inventory.setItem(6, new ItemStack("block:oven"));
    inventory.setItem(7, new ItemStack("block:coffe_machine"));
    inventory.setItem(8, new ItemStack("minecraft:arrow"));
    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
            if (itemStack.typeId === "minecraft:arrow") {
                hotbarDetails(source);
                world.afterEvents.itemUse.unsubscribe(Instance)
            } else if (itemStack.typeId === "minecraft:barrier") {
                customMode(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
        })
    }    
}

function hotbarDetails(player) {
    const inventory = player.getComponent('minecraft:inventory').container;
    clearHotbar
    inventory.setItem(0, new ItemStack("minecraft:arrow"));
    inventory.setItem(1, new ItemStack("minecraft:air"));
    inventory.setItem(2, new ItemStack("block:kitchen_microwave"));
    inventory.setItem(3, new ItemStack("block:toaster"));
    inventory.setItem(4, new ItemStack("block:plate"));
    inventory.setItem(5, new ItemStack("block:utensils"));
    inventory.setItem(6, new ItemStack("block:kitchen_pan"));
    inventory.setItem(7, new ItemStack("hf:curtain"));
    inventory.setItem(8, new ItemStack("minecraft:brush"));
    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
            if (itemStack.typeId === "minecraft:arrow") {
                hotbarKitchen(source);
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
        })
    }    
}

function hotbarTable(player) {
    clearHotbar(player)
    const inventory = player.getComponent('minecraft:inventory').container;

    inventory.setItem(0, new ItemStack("minecraft:barrier"));
    inventory.setItem(1, new ItemStack("block:small_table_concrete"));
    inventory.setItem(2, new ItemStack("block:small_table_oak"));
    inventory.setItem(3, new ItemStack("block:small_table_spruce"));
    inventory.setItem(4, new ItemStack("minecraft:air"));
    inventory.setItem(5, new ItemStack("minecraft:air"));
    inventory.setItem(6, new ItemStack("minecraft:air"));
    inventory.setItem(7, new ItemStack("minecraft:air"));
    inventory.setItem(8, new ItemStack("minecraft:brush"));
    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
             if (itemStack.typeId === "minecraft:barrier") {
                customMode(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
        })
    }    
}

function hotbarChair(player) {
    clearHotbar(player)
    const inventory = player.getComponent('minecraft:inventory').container;

    inventory.setItem(0, new ItemStack("minecraft:barrier"));
    inventory.setItem(2, new ItemStack("block:chair"));
    inventory.setItem(1, new ItemStack("block:concrete_chair"));
    inventory.setItem(3, new ItemStack("block:dark_oak_chair"));
    inventory.setItem(4, new ItemStack("block:spruce_chair"));
    inventory.setItem(5, new ItemStack("block:gaming_chair"));
    inventory.setItem(6, new ItemStack("minecraft:air"));
    inventory.setItem(7, new ItemStack("minecraft:air"));
    inventory.setItem(8, new ItemStack("minecraft:brush"));
    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
             if (itemStack.typeId === "minecraft:barrier") {
                customMode(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
        })
    }    
}

function hotbarLiving(player) {
    clearHotbar(player)
    const inventory = player.getComponent('minecraft:inventory').container;

    inventory.setItem(0, new ItemStack("minecraft:barrier"));
    inventory.setItem(2, new ItemStack("block:sofa"));
    inventory.setItem(1, new ItemStack("block:sofa_inter"));
    inventory.setItem(3, new ItemStack("block:sofa_left"));
    inventory.setItem(4, new ItemStack("block:sofa_middle"));
    inventory.setItem(5, new ItemStack("block:sofa_right"));
    inventory.setItem(6, new ItemStack("block:concrete_tv_furniture"));
    inventory.setItem(7, new ItemStack("minecraft:air"));
    inventory.setItem(8, new ItemStack("minecraft:brush"));
    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
             if (itemStack.typeId === "minecraft:barrier") {
                customMode(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
        })
    }    
}

function hotbarBathroom(player) {
    clearHotbar(player)
    const inventory = player.getComponent('minecraft:inventory').container;

    inventory.setItem(0, new ItemStack("minecraft:barrier"));
    inventory.setItem(2, new ItemStack("block:toilet"));
    inventory.setItem(1, new ItemStack("block:mirror"));
    inventory.setItem(3, new ItemStack("block:bathroom_sink"));
    inventory.setItem(4, new ItemStack("block:bathroom_cabinet"));
    inventory.setItem(5, new ItemStack("block:shower_head"));
    inventory.setItem(6, new ItemStack("block:shower"));
    inventory.setItem(7, new ItemStack("minecraft:air"));
    inventory.setItem(8, new ItemStack("minecraft:brush"));
    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
             if (itemStack.typeId === "minecraft:barrier") {
                customMode(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
        })
    }    
}

function hotbarTechnic(player) {
    clearHotbar(player)
    const inventory = player.getComponent('minecraft:inventory').container;

    inventory.setItem(0, new ItemStack("minecraft:barrier"));
    inventory.setItem(2, new ItemStack("block:ps5"));
    inventory.setItem(1, new ItemStack("block:tv"));
    inventory.setItem(3, new ItemStack("hf:gamingpc"));
    inventory.setItem(4, new ItemStack("block:notebook"));
    inventory.setItem(5, new ItemStack("block:roteador_wifi"));
    inventory.setItem(6, new ItemStack("block:headphones"));
    inventory.setItem(7, new ItemStack("block:printer"));
    inventory.setItem(8, new ItemStack("block:microphone"));
    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
             if (itemStack.typeId === "minecraft:barrier") {
                customMode(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
        })
    }    
}

function hotbarConstruction(player) {
    clearHotbar(player)
    const inventory = player.getComponent('minecraft:inventory').container;

    inventory.setItem(0, new ItemStack("minecraft:barrier"));
    inventory.setItem(1, new ItemStack("block:traffic_light_0"));
    inventory.setItem(3, new ItemStack("block:cone"));
    inventory.setItem(4, new ItemStack("block:pole"));
    inventory.setItem(5, new ItemStack("block:doorbell"));
    inventory.setItem(6, new ItemStack("block:camera"));
    inventory.setItem(7, new ItemStack("block:light"));
    inventory.setItem(8, new ItemStack("minecraft:arrow"));
    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
             if (itemStack.typeId === "minecraft:barrier") {
                customMode(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
            if (itemStack.typeId === "minecraft:arrow") {
                hotbarFeuerwehr(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
        })
    }    
}

function hotbarFeuerwehr(player) {
    clearHotbar(player)
    const inventory = player.getComponent('minecraft:inventory').container;

    inventory.setItem(0, new ItemStack("minecraft:arrow"));
    inventory.setItem(2, new ItemStack("block:hydrant"));
    inventory.setItem(1, new ItemStack("feuerwehr:feuerloscher1"));
    inventory.setItem(3, new ItemStack("feuerwehr:alarm"));
    inventory.setItem(4, new ItemStack("feuerwehr:absperrung"));
    inventory.setItem(5, new ItemStack("block:doorbell"));
    inventory.setItem(6, new ItemStack("block:camera"));
    inventory.setItem(7, new ItemStack("block:light"));
    inventory.setItem(8, new ItemStack("minecraft:air"));
    subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
            if (itemStack.typeId === "minecraft:arrow") {
                hotbarConstruction(source)
                world.afterEvents.itemUse.unsubscribe(Instance)
            }
        })
    }    
}