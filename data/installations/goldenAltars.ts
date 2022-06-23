import { InstallationTypeInput } from "../../types";

export const goldenAltars: InstallationTypeInput[] = [
  {
    id: 1,
    name: "LE Golden Aaltar",
    level: 1,
    nextLevelId: 2,
    prerequisites: [0, 0],
    width: 2,
    height: 2,
    deprecated: true,
    installationType: 0,
    alchemicaType: 0,
    alchemicaCost: [3000, 1500, 2000, 750],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 2000,
    spillRate: 50,
    upgradeQueueBoost: 1,
    craftTime: 0,
    unequipType: 0,
  },
  {
    id: 2,
    name: "LE Golden Aaltar",
    level: 2,
    nextLevelId: 3,
    prerequisites: [1, 0],
    width: 2,
    height: 2,
    deprecated: false,
    installationType: 0,
    alchemicaType: 0,
    alchemicaCost: [300, 150, 75, 10],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1800,
    spillRate: 45,
    upgradeQueueBoost: 1,
    craftTime: 65000,
    unequipType: 0,
  },
  {
    id: 3,
    name: "LE Golden Aaltar",
    level: 3,
    nextLevelId: 4,
    prerequisites: [2, 0],
    width: 2,
    height: 2,
    deprecated: false,
    installationType: 0,
    alchemicaType: 0,
    alchemicaCost: [600, 300, 150, 20],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1600,
    spillRate: 40,
    upgradeQueueBoost: 1,
    craftTime: 160000,
    unequipType: 0,
  },
  {
    id: 4,
    name: "LE Golden Aaltar",
    level: 4,
    nextLevelId: 5,
    prerequisites: [3, 0],
    width: 2,
    height: 2,
    deprecated: false,
    installationType: 0,
    alchemicaType: 0,
    alchemicaCost: [1000, 750, 375, 100],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1400,
    spillRate: 35,
    upgradeQueueBoost: 1,
    craftTime: 320000,
    unequipType: 0,
  },
  {
    id: 5,
    name: "LE Golden Aaltar",
    level: 5,
    nextLevelId: 6,
    prerequisites: [4, 0],
    width: 2,
    height: 2,
    deprecated: false,
    installationType: 0,
    alchemicaType: 0,
    alchemicaCost: [2000, 1500, 750, 200],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1200,
    spillRate: 30,
    upgradeQueueBoost: 1,
    craftTime: 475000,
    unequipType: 0,
  },
  {
    id: 6,
    name: "LE Golden Aaltar",
    level: 6,
    nextLevelId: 7,
    prerequisites: [5, 0],
    width: 2,
    height: 2,
    deprecated: false,
    installationType: 0,
    alchemicaType: 0,
    alchemicaCost: [4000, 3000, 1500, 400],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1000,
    spillRate: 25,
    upgradeQueueBoost: 1,
    craftTime: 630000,
    unequipType: 0,
  },
  {
    id: 7,
    name: "LE Golden Aaltar",
    level: 7,
    nextLevelId: 8,
    prerequisites: [6, 0],
    width: 2,
    height: 2,
    deprecated: false,
    installationType: 0,
    alchemicaType: 0,
    alchemicaCost: [5000, 7500, 3750, 1500],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 800,
    spillRate: 20,
    upgradeQueueBoost: 1,
    craftTime: 1250000,
    unequipType: 0,
  },
  {
    id: 8,
    name: "LE Golden Aaltar",
    level: 8,
    nextLevelId: 9,
    prerequisites: [7, 0],
    width: 2,
    height: 2,
    deprecated: false,
    installationType: 0,
    alchemicaType: 0,
    alchemicaCost: [10000, 15000, 7500, 3000],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 600,
    spillRate: 15,
    upgradeQueueBoost: 1,
    craftTime: 1900000,
    unequipType: 0,
  },
  {
    id: 9,
    name: "LE Golden Aaltar",
    level: 9,
    nextLevelId: 0,
    prerequisites: [8, 0],
    width: 2,
    height: 2,
    deprecated: false,
    installationType: 0,
    alchemicaType: 0,
    alchemicaCost: [20000, 30000, 15000, 6000],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 400,
    spillRate: 10,
    upgradeQueueBoost: 1,
    craftTime: 3200000,
    unequipType: 0,
  },
];
