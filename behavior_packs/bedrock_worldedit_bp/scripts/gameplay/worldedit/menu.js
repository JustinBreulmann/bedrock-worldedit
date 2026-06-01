import {world,Player,ItemStack,system,ItemTypes} from "@minecraft/server"
import {ActionFormData,MessageFormData,ModalFormData,ActionFormResponse,MessageFormResponse,ModalFormResponse} from "@minecraft/server-ui";
import { fill } from "./fill";
import { replace } from "./replace";
import { copypaste } from "./paste";

export function WorldEdit(player) {
    let actionForm = new ActionFormData();
    actionForm.title(`§5§lWorldEdit`);
	actionForm.body("§l      --------------------      §r    schnelle und effiziente Bearbeitung\n              großer Bereiche\n§l      --------------------      ")
    actionForm.button("Fülle Region", "textures/blocks/structure_block_load.png");
    actionForm.button("Austauschen", "textures/blocks/command_block.png");
    actionForm.button("Copy & Paste", "textures/blocks/brick.png");
    actionForm.show(player).then(actionFormResponse => {
        if (actionFormResponse.canceled) return;
        const { selection } = actionFormResponse;
        if (selection == 0) {
            fill(player);
        }
        if (selection == 1) {
            replace(player);
        }
        if (selection == 2) {
            copypaste(player);
        }
    });
}