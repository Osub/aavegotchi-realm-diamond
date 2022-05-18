import { InstallationTypeInput } from "../../types";

export const installationTypes: InstallationTypeInput[] = [
  {
    Installation: "Alchemical Altaar",
    id: 10,
    installationType: 0,
    level: 1,
    width: 2,
    height: 2,
    alchemicaType: 0,
    alchemicaCost: [0, 0, 0, 0],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 2000,
    spillRate: 50,
    upgradeQueueBoost: 1,
    craftTime: 0,
    deprecated: false,
    nextLevelId: 11,
    prerequisites: [0, 0],
    name: "Alchemical Altaar Level 1",
  },
  {
    Installation: "Altaar",
    id: 11,
    installationType: 0,
    level: 2,
    width: 2,
    height: 2,
    alchemicaType: 0,
    alchemicaCost: [300, 150, 75, 10],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1800,
    spillRate: 45,
    upgradeQueueBoost: 1,
    craftTime: 65000,
    deprecated: false,
    nextLevelId: 12,
    prerequisites: [1, 0],
    name: "çAltaar Level 2",
  },
  {
    Installation: "Altaar",
    id: 12,
    installationType: 0,
    level: 3,
    width: 2,
    height: 2,
    alchemicaType: 0,
    alchemicaCost: [600, 300, 150, 20],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1600,
    spillRate: 40,
    upgradeQueueBoost: 1,
    craftTime: 160000,
    deprecated: false,
    nextLevelId: 13,
    prerequisites: [2, 0],
    name: "Alchemical Altaar Level 3",
  },
  {
    Installation: "Altaar",
    id: 13,
    installationType: 0,
    level: 4,
    width: 2,
    height: 2,
    alchemicaType: 0,
    alchemicaCost: [1000, 750, 375, 100],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1400,
    spillRate: 35,
    upgradeQueueBoost: 1,
    craftTime: 320000,
    deprecated: false,
    nextLevelId: 14,
    prerequisites: [3, 0],
    name: "Alchemical Altaar Level 4",
  },
  {
    Installation: "Altaar",
    id: 14,
    installationType: 0,
    level: 5,
    width: 2,
    height: 2,
    alchemicaType: 0,
    alchemicaCost: [2000, 1500, 750, 200],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1200,
    spillRate: 30,
    upgradeQueueBoost: 1,
    craftTime: 475000,
    deprecated: false,
    nextLevelId: 15,
    prerequisites: [4, 0],
    name: "Alchemical Altaar Level 5",
  },
  {
    Installation: "Altaar",
    id: 15,
    installationType: 0,
    level: 6,
    width: 2,
    height: 2,
    alchemicaType: 0,
    alchemicaCost: [4000, 3000, 1500, 400],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 1000,
    spillRate: 25,
    upgradeQueueBoost: 1,
    craftTime: 630000,
    deprecated: false,
    nextLevelId: 16,
    prerequisites: [5, 0],
    name: "Alchemical Altaar Level 6",
  },
  {
    Installation: "Altaar",
    id: 16,
    installationType: 0,
    level: 7,
    width: 2,
    height: 2,
    alchemicaType: 0,
    alchemicaCost: [5000, 7500, 3750, 1500],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 800,
    spillRate: 20,
    upgradeQueueBoost: 1,
    craftTime: 1250000,
    deprecated: false,
    nextLevelId: 17,
    prerequisites: [6, 0],
    name: "Alchemical Altaar Level 7",
  },
  {
    Installation: "Altaar",
    id: 17,
    installationType: 0,
    level: 8,
    width: 2,
    height: 2,
    alchemicaType: 0,
    alchemicaCost: [10000, 15000, 7500, 3000],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 600,
    spillRate: 15,
    upgradeQueueBoost: 1,
    craftTime: 1900000,
    deprecated: false,
    nextLevelId: 18,
    prerequisites: [7, 0],
    name: "Alchemical Altaar Level 8",
  },
  {
    Installation: "Altaar",
    id: 18,
    installationType: 0,
    level: 9,
    width: 2,
    height: 2,
    alchemicaType: 0,
    alchemicaCost: [20000, 30000, 15000, 6000],
    harvestRate: 0,
    capacity: 0,
    spillRadius: 400,
    spillRate: 10,
    upgradeQueueBoost: 1,
    craftTime: 3200000,
    deprecated: false,
    nextLevelId: 0,
    prerequisites: [8, 0],
    name: "Alchemical Altaar Level 9",
  },
];
