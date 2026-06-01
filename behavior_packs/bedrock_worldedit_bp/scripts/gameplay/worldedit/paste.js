import {world,Player,ItemStack,system,ItemTypes} from "@minecraft/server"
import {ActionFormData,MessageFormData,ModalFormData,ActionFormResponse,MessageFormResponse,ModalFormResponse} from "@minecraft/server-ui";

import {block } from "../../extensions/config"

let ItemID = Object.keys(block);
let blocks = Object.values(block);

let x1, y1, z1, x2, y2, z2; // Move the variable declarations here

export function copypaste(player) {
  const form = new ModalFormData();

  const pos1 = player
    .getTags()
    .filter((t) => t.startsWith("pos1"))
    .map((t) => t.replace("pos1,", ""));

  const pos2 = player
    .getTags()
    .filter((t) => t.startsWith("pos2"))
    .map((t) => t.replace("pos2,", ""));

  [x1, y1, z1] = pos1[0].split(",");
  [x2, y2, z2] = pos2[0].split(",");

  const totalBlocks = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1) * (Math.abs(z2 - z1) + 1);
  const x = Math.floor(player.location.x)
	const y = Math.floor(player.location.y)
	const z = Math.floor(player.location.z)

  form.title(`§5WorldEdit (${totalBlocks} blocks)`);
  form.textField(`\n§7Position 1 ${pos1}\nPosition 2 ${pos2}\n\n§8§lRegion`, `${x},${y},${z}`);

  form.show(player).then((response) => {
    if (response.canceled) return;

if (totalBlocks < 10000) {
          player.runCommandAsync(`clone ${x1} ${y1} ${z1} ${x2} ${y2} ${z2} ${response.formValues[0]}`);
        }
        else {exception('TooManyBlocks', player, totalBlocks)}
  });
}