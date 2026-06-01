import { currency } from "../extensions/config"
import { getScore } from "../extensions/module/getScore"

export function exception(error, targetPlayer, information) {
    switch (error) {
        case 'noAuthorization':
            sendError(targetPlayer, "Du bist für diese Aktion nicht autorisiert");
            break;
        case 'noPermission':
            sendError(targetPlayer, "Du hast keine Berechtigung");
            break;
        case 'playerNotFound':
            sendError(targetPlayer, "Spieler nicht gefunden:" + information);
            break;
        case 'NoBlockData':
            sendError(targetPlayer, "Block kann nicht bearbeitet werden");
            break;
        case 'NotEnoughMoney':
            sendError(targetPlayer, "Du hast nicht genug Geld, um diese Transaktion durchzuführen" + information + ">" + getScore(player, currency));
            break;
        case 'NoPlotOwned':
            sendError(targetPlayer, "Du besitzt keine Grundstücke");
            break;
        case 'NoOwnerKnown':
            sendError(targetPlayer, "Besitzer nicht gefunden");
            break;
        case 'PlayerMuted':
            sendError(targetPlayer, "Du hast keine Berechtigung, um in den Chat zu schreiben");
            break;
        case 'NoItemEquiped':
            sendError(targetPlayer, "Du hast kein Item ausgewählt!");
            break;
        case 'InventoryFull':
            sendError(targetPlayer, "Du hast keinen freien Platz im Inventar");
            break;
        case 'PlayerIsTargetPlayer':
            sendError(targetPlayer, "Du kannst dir selber kein" + information);
            break;
        case 'DataInvaild':
            sendError(targetPlayer, "Angaben sind unvollständig oder ungültig");
            break;
        case 'TooManyBlocks':
            sendError(targetPlayer, "Im Bereich sind zu viele Blöcke ausgewählt " + information + "> 10000" );
            break;
        case 'negativeValue':
            sendError(targetPlayer, "Es sind nur Zahlen erlaubt " + information);
            break;
        case 'duplicate':
            sendError(targetPlayer, "Dieser Name ist bereits vergeben " + information);
            break;
        case 'questFinished':
            sendError(targetPlayer, "Du hast die ausgewählte Ausbildung bereits abgeschlossen");
            break;
        case 'questInProgress':
            sendError(targetPlayer, "Du belegst bereits die ausgewählte Ausbildung");
            break;
        case 'wrongPassword':
            sendError(targetPlayer, "Falsches Passwort eingegeben");
            break;
        default:
            sendError(targetPlayer, "keine Aktion für diese Interaktion definiert");
    }
}




function sendError(targetPlayer, message) {
	targetPlayer.sendMessage("§l§gServer§r §8>>§7 " + message + "!")
}