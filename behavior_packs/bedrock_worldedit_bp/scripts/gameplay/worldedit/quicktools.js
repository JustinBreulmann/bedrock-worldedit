import { world, ItemStack,system, ItemLockMode } from "@minecraft/server";
import {ActionFormData,MessageFormData,ModalFormData,ActionFormResponse,MessageFormResponse,ModalFormResponse} from "@minecraft/server-ui";


import {saveHotbar} from "./../../inventory/hotbar/save"; 
import {loadHotbar} from "../../inventory/hotbar/load"
import {clearHotbar} from "../../inventory/hotbar/clear"
import { exception } from "../../exceptions/error";

export function lockables(player) {
	saveHotbar(player)
	player.sendMessage("[§bi§f] Schlossmenu §ageladen")
	clearHotbar(player)
	menu(player)

	function menu(player) {
		const inventory = player.getComponent('minecraft:inventory').container;

    const lock = new ItemStack("minecraft:trial_key")
	lock.nameTag = `§r§f§lSperren`;
	lock.setLore([  "§r§7Sperre die Eigenschaften eines Blocks",])
	lock.lockMode = ItemLockMode.slot;
	inventory.setItem(0, lock)
	

	const edit = new ItemStack("minecraft:ominous_trial_key")
	edit.nameTag = `§r§f§lBearbeiten`;
	edit.setLore([  "§r§7Bearbeite einen gesperrten Blocks",])
	edit.lockMode = ItemLockMode.slot;
	inventory.setItem(1, edit)
	

	const overwrite = new ItemStack("minecraft:name_tag")
	overwrite.nameTag = `§r§f§lPasswort anzeigen`;
	overwrite.setLore([  "§r§7funktioniert nur für den 'Besitzer'",])
	overwrite.lockMode = ItemLockMode.slot;
	inventory.setItem(2, overwrite)

	const barrier = new ItemStack("minecraft:barrier")
	barrier.nameTag = `§r§c§lSchlossmenu verlassen`;
	barrier.lockMode = ItemLockMode.slot;
	inventory.setItem(8, barrier)

	subscribeto(player)

    function subscribeto(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
            if (itemStack.typeId === "minecraft:tripwire_hook") {

                world.afterEvents.itemUse.unsubscribe(Instance)

				clearHotbar(player)
				loadHotbar(player)
            } else if (itemStack.typeId === "minecraft:barrier") {
                clearHotbar(data.source)
                loadHotbar(data.source)
                player.sendMessage("[§bi§f] Baumodus §cdeaktiviert")
                world.afterEvents.itemUse.unsubscribe(Instance)
            } 
        })
    }
  }
}

export function quicktools(player) {
		saveHotbar(player)
		player.sendMessage("[§bi§f] Schnellmenu §ageladen")
		clearHotbar(player)
		menubar(player)
	
function menubar(player) {
	const inventory = player.getComponent('minecraft:inventory').container;

    const drown = new ItemStack("minecraft:bucket")
	drown.nameTag = `§r§f§lSchwamm`;
	drown.setLore([  "§r§7entferne §bWasser",])
	drown.lockMode = ItemLockMode.slot;
	inventory.setItem(0, drown)


	const nightvision = new ItemStack("minecraft:echo_shard")
	nightvision.nameTag = `§r§f§lNachsicht`;
	nightvision.setLore([  "§r§7Fullbright",])
	nightvision.lockMode = ItemLockMode.slot;
	inventory.setItem(2, nightvision)

	const rocket = new ItemStack("minecraft:firework_rocket")
	rocket.nameTag = `§r§f§lSchnellreise`
	rocket.lockMode = ItemLockMode.slot;
	inventory.setItem(3, rocket)

	const snowball = new ItemStack("minecraft:amethyst_shard")
	snowball.nameTag = `§r§f§lFülle`;
	snowball.lockMode = ItemLockMode.slot;
	inventory.setItem(4, snowball)

	const invisible = new ItemStack("minecraft:dragon_breath")
	invisible.nameTag = `§r§f§lUnsichtbarkeit`;
	invisible.lockMode = ItemLockMode.slot;
	inventory.setItem(6, invisible)

	const barrier = new ItemStack("minecraft:barrier")
	barrier.nameTag = `§r§c§lSchnellmenu verlassen`;
	barrier.lockMode = ItemLockMode.slot;
	inventory.setItem(8, barrier)

	subscribe(player)

    function subscribe(player) {
        const Instance = world.afterEvents.itemUse.subscribe((data) => {
            const { source, itemStack } = data;
            if (itemStack.typeId === "minecraft:bucket") {
                Updatedrown(source);
                world.afterEvents.itemUse.unsubscribe(Instance)

				clearHotbar(player)
				loadHotbar(player)


            } else if (itemStack.typeId === "minecraft:echo_shard") {
                Updatenightvision(player)

                world.afterEvents.itemUse.unsubscribe(Instance)

				clearHotbar(player)
				loadHotbar(player)

            } else if (itemStack.typeId === "minecraft:firework_rocket") {

                teleport(source);

                world.afterEvents.itemUse.unsubscribe(Instance)

				clearHotbar(player)
				loadHotbar(player)


            } else if (itemStack.typeId === "minecraft:dragon_breath") {

				vanish(player)

                world.afterEvents.itemUse.unsubscribe(Instance)

				clearHotbar(player)
				loadHotbar(player)

            } else if (itemStack.typeId === "minecraft:amethyst_shard") {
                throwable(source)

                world.afterEvents.itemUse.unsubscribe(Instance)

				clearHotbar(player)
				loadHotbar(player)

            } else if (itemStack.typeId === "minecraft:barrier") {
                clearHotbar(data.source)
                loadHotbar(data.source)
                player.sendMessage("[§bi§f] Baumodus §cdeaktiviert")
                world.afterEvents.itemUse.unsubscribe(Instance)
            } 
        })
    }
  }
}
function throwable(player) {
	
	const inventory = player.getComponent('minecraft:inventory').container;

	const form = new ModalFormData();
	form.title(`§5Schnellball - erstellen§r`);
	form.textField("minecraft:block", "minecraft:grass")
	form.textField("Maximale Höhe", "65")
	form.slider("Radius",1,15,1)
	form.show(player).then((response) => {
		if (response.canceled) return;
		if(response.formValues[0] = "") {response.formValues[0] = "minecraft:grass"}
		if(response.formValues[1] = "") {response.formValues[1] = "65"}

		if(response.formValues[2] == NaN || response.formValues[2] < 0) {exception('negativeValue', player, response.formValues[2])}
		const snowball = new ItemStack("minecraft:snowball")
		snowball.nameTag = `§r§7Schneeball - §b${response.formValues[0]}`;
		snowball.setLore(
			[  `§r§7Radius: §b + ${response.formValues[2]}`,  `§r§7y-Position: §b + ${response.formValues[1]}`],
		)
		let canTake = player.getComponent('inventory').container.emptySlotsCount > 0
		if (!canTake) exception('NoItemEquiped', player, "")
		else
		inventory.addItem(snowball)

	})


}

function Updatedrown(player) {
	if(player.hasTag("drown") ) {
		player.sendMessage("[§bi§f] Schwamm §cdeaktiviert")
		player.removeTag("drown")
	}
	else{
		player.addTag("drown")
		player.sendMessage("[§bi§f] Schwamm §aaktiv")

	}
}

export function vanish(player) {
	if(player.hasTag("vanish") ) {
		player.sendMessage("[§bi§f] Unsichtbarkeit §cdeaktiviert")
		player.removeEffect("invisibility")
		player.removeTag("vanish")
	}
	else{
		player.addTag("vanish")
		player.sendMessage("[§bi§f] Unsichtbarkeit §aaktiv")

		player.addEffect("invisibility", 20000000, { amplifier: 1, showParticles: false });

	}
}

export function Updatenightvision(player) {
    if (player.hasTag("nightvision")) {
        player.sendMessage("[§bi§f] Nachsicht §cdeaktiviert");
        player.removeEffect("night_vision");
        player.removeTag("nightvision");
        if (world.getAllPlayers().filter(p => p.getTags().includes("nightvision")).length === 0) {
        }
    } else {
        player.addTag("nightvision");
        player.sendMessage("[§bi§f] Nachsicht §aaktiv");

            player.addEffect("night_vision", 20000000, { amplifier: 1, showParticles: false });
    }
}


function teleport(player) {
    let actionForm = new ActionFormData()
        .title(`Schnellreise - Spieler`)

    const players = world.getAllPlayers()

    let functions = [];

    players.forEach((target) => {
        let playerInfo = {
            name: target.name,
            location: {
                x: Math.floor(target.location.x),
                y: Math.floor(target.location.y),
                z: Math.floor(target.location.z)
            }
        };
        actionForm.button(target.name + "\nx:" + playerInfo.location.x + " ,y:" + playerInfo.location.y + ",z:" + playerInfo.location.z)
		functions.push(r => {
            player.teleport({ x: playerInfo.location.x, y: playerInfo.location.y, z: playerInfo.location.z},)
        })
    })
	actionForm.show(player).then(r => {
		if(r.canceled) return 
		functions[r.selection]()
	})
  }
