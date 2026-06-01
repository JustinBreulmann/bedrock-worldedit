import {world,Player,ItemStack,system,ItemTypes} from "@minecraft/server"
import {ActionFormData,MessageFormData,ModalFormData,ActionFormResponse,MessageFormResponse,ModalFormResponse} from "@minecraft/server-ui";

import {block} from "../../extensions/config"
import { exception } from "../../exceptions/error";

let ItemID = Object.keys(block);
let blocks = Object.values(block);

let x1, y1, z1, x2, y2, z2; // Move the variable declarations here

export function replace(player) {
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
  form.title(`§5WorldEdit (${totalBlocks} blocks)`);
  form.dropdown(`§7Position 1 ${pos1}\nPosition 2 ${pos2}\n§8§lReplace`, blocks);
  form.dropdown(`\n§8§lBlock`, blocks);
  form.dropdown("§8§lBlock", blocks);
  form.dropdown("§8§lBlock", blocks);

  form.show(player).then((response) => {
    if (response.canceled) return;

if (totalBlocks < 10000) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) {
          const randomBlockIndex = Math.floor(Math.random() * blocks.length);
          const selected = ItemID[response.formValues[Math.floor((Math.random()*3)+1)]];
          const selectedBlock = ItemID[randomBlockIndex];
          player.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y} ${z} ${selected} replace ${ItemID[response.formValues[0]]}`);
        }
      }
    }
  }
  else {exception('TooManyBlocks', player, totalBlocks)}
    }
  )
}