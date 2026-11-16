# Bedrock WorldEdit & Builder Suite

[![Minecraft Bedrock](https://img.shields.io/badge/Minecraft-Bedrock%201.21.60%2B-green.svg)](https://minecraft.net/)
[![Mojang Creator Tools](https://img.shields.io/badge/Tooling-mctools.dev-blue.svg)](https://mctools.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Creator](https://img.shields.io/badge/Creator-JustinBreulmann-orange.svg)](https://github.com/JustinBreulmann)

Interactive builder toolkit, 3D region selection (wooden axe/sword), fill/replace/paste operations, builder hotbar management and quicktools

---

## 📦 Architektur & Übersicht

Dieses Repository ist Teil der modularen **Divide & Conquer**-Architektur für Minecraft Bedrock, modularisiert aus monolithischen Welten und ausgerichtet nach offiziellen Standards von [Mojang Creator Tools (mctools.dev)](https://mctools.dev/).

### Pack-Identifikatoren
- **Behavior Pack UUID**: `b704da5b-f414-448b-87cf-6cdc6522f553`
- **Resource Pack UUID**: `N/A`
- **Zielversion**: Minecraft Bedrock 1.21.0 - 1.21.60+ (Neueste Version)
- **Script Engine**: `@minecraft/server` v1.14.0+ / `@minecraft/server-ui` v1.3.0+

---

## 📂 Projektstruktur

```
bedrock-worldedit/
├── behavior_packs/
│   └── bedrock_worldedit_bp/
│       ├── manifest.json
│       └── scripts/
│           └── main.js
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Installation & Bedrock Verlinkung

### Methode 1: Direkt in Minecraft-Welt verlinken (NTFS Junctions)
1. Repository klonen:
   ```bash
   git clone https://github.com/JustinBreulmann/bedrock-worldedit.git
   ```
2. Verzeichnis-Junctions erstellen:
   - Behavior Pack -> `<welt>/behavior_packs/bedrock_worldedit_bp`
   - Resource Pack -> `<welt>/resource_packs/bedrock_worldedit_rp`

### Methode 2: Globaler Development-Ordner
Verlinkung in `development_behavior_packs` bzw. `development_resource_packs` im `com.mojang`-Verzeichnis für weltübergreifendes Live-Testing.

---

## 🛠️ Entwicklung & Tooling
Unterstützt moderne Tooling-Standards kompatibel mit `@minecraft/creator-tools`:
```bash
npm install
npm test
```

## 📄 Lizenz
MIT License © Justin Breulmann
