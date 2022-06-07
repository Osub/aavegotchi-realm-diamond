import { BigNumber, ethers } from "ethers";
import { network } from "hardhat";
import { Network } from "hardhat/types";
import { maticDiamondAddress } from "../../constants";
import {
  AlchemicaFacet,
  AlchemicaToken,
  ERC1155Facet,
  ERC1155FacetTile,
  InstallationFacet,
  InstallationAdminFacet,
  TileFacet,
  OwnershipFacet,
  RealmFacet,
  GLTR,
} from "../../typechain";
import {
  InstallationTypeInput,
  TileTypeInput,
  InstallationTypeOutput,
  TileTypeOutput,
  TestBeforeVars,
} from "../../types";
import {
  maticAavegotchiDiamondAddress,
  pixelcraftAddress,
  aavegotchiDAOAddress,
} from "../helperFunctions";
import { deployDiamond } from "../installation/deploy";
import { impersonate } from "../installation/helperFunctions";
import { deployDiamondTile } from "../tile/deploy";
import { upgrade } from "./upgrades/upgrade-harvesting";
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";

const credentials = {
  apiKey: process.env.DEFENDER_API_KEY_MUMBAI,
  apiSecret: process.env.DEFENDER_SECRET_KEY_MUMBAI,
};
const provider = new DefenderRelayProvider(credentials);
const signer = new DefenderRelaySigner(credentials, provider, {
  speed: "fastest",
});

export function outputInstallation(
  installation: InstallationTypeInput
): InstallationTypeOutput {
  if (installation.width > 64) throw new Error("Width too much");
  if (installation.height > 64) throw new Error("Height too much");

  const alchemica = installation.alchemicaCost.map((val) =>
    ethers.utils.parseEther(val.toString())
  );

  let output: InstallationTypeOutput = {
    deprecated: installation.deprecated,
    installationType: installation.installationType,
    level: installation.level,
    width: installation.width,
    height: installation.height,
    alchemicaType: installation.alchemicaType,
    alchemicaCost: [
      BigNumber.from(alchemica[0]),
      BigNumber.from(alchemica[1]),
      BigNumber.from(alchemica[2]),
      BigNumber.from(alchemica[3]),
    ],
    harvestRate: ethers.utils.parseEther(installation.harvestRate.toString()),
    capacity: ethers.utils.parseEther(installation.capacity.toString()),
    spillRadius: installation.spillRadius,
    spillRate: ethers.utils.parseUnits(installation.spillRate.toString(), 2),
    upgradeQueueBoost: installation.upgradeQueueBoost,
    craftTime: installation.craftTime,
    nextLevelId: installation.nextLevelId,
    prerequisites: installation.prerequisites,
    name: installation.name,
  };

  return output;
}

export function outputTile(tile: TileTypeInput): TileTypeOutput {
  if (tile.width > 64) throw new Error("Width too much");
  if (tile.height > 64) throw new Error("Height too much");

  let output: TileTypeOutput = {
    deprecated: false,
    tileType: tile.tileType,
    width: tile.width,
    height: tile.height,
    alchemicaCost: [
      ethers.utils.parseEther(tile.alchemicaCost[0].toString()),
      ethers.utils.parseEther(tile.alchemicaCost[1].toString()),
      ethers.utils.parseEther(tile.alchemicaCost[2].toString()),
      ethers.utils.parseEther(tile.alchemicaCost[3].toString()),
    ],
    craftTime: tile.craftTime,
    name: tile.name,
  };

  return output;
}

export function testInstallations() {
  const installations: InstallationTypeOutput[] = [];
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 1,
      width: 1,
      height: 1,
      alchemicaType: 0,
      alchemicaCost: [0, 0, 0, 0],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 0,
      upgradeQueueBoost: 0,
      craftTime: 0,
      deprecated: true,
      nextLevelId: 0,
      prerequisites: [],
      name: "The Void",
    })
  );
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 1,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [100, 20, 0, 30],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 0,
      upgradeQueueBoost: 1,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 7,
      prerequisites: [0, 0],
      name: "Altar level 1",
    })
  );
  installations.push(
    outputInstallation({
      installationType: 2,
      level: 1,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [400, 50, 60, 60],
      harvestRate: 0,
      capacity: 500,
      spillRadius: 100,
      spillRate: 50,
      upgradeQueueBoost: 0,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 3,
      prerequisites: [1, 0],
      name: "FUD Reservoir level 1",
    })
  );
  installations.push(
    outputInstallation({
      installationType: 2,
      level: 2,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [40, 50, 60, 60],
      harvestRate: 0,
      capacity: 1000,
      spillRadius: 75,
      spillRate: 20,
      upgradeQueueBoost: 0,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 0,
      prerequisites: [2, 0],
      name: "FUD Reservoir level 2",
    })
  );
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 1,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [10, 10, 10, 10],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 20,
      upgradeQueueBoost: 1,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 7,
      prerequisites: [0, 0],
      name: "Altar level 1",
    })
  );
  installations.push(
    outputInstallation({
      installationType: 1,
      level: 1,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [10, 10, 10, 10],
      harvestRate: 2,
      capacity: 0,
      spillRadius: 0,
      spillRate: 0,
      upgradeQueueBoost: 0,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 0,
      prerequisites: [1, 0],
      name: "FUD Harvester level 1",
    })
  );
  installations.push(
    outputInstallation({
      installationType: 6,
      level: 1,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [10, 10, 10, 10],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 0,
      upgradeQueueBoost: 1,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 0,
      prerequisites: [0, 0],
      name: "BuildQueue level 1",
    })
  );
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 2,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [100, 20, 0, 30],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 20,
      upgradeQueueBoost: 1,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 0,
      prerequisites: [1, 0],
      name: "Altar level 2",
    })
  );
  installations.push(
    outputInstallation({
      installationType: 3,
      level: 1,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [10, 10, 10, 10],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 0,
      upgradeQueueBoost: 1,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 0,
      prerequisites: [3, 0],
      name: "Gotchi Lodge level 1",
    })
  );
  return installations;
}

export function testTiles() {
  const tiles: TileTypeOutput[] = [];
  tiles.push(
    outputTile({
      tileType: 0,
      width: 1,
      height: 1,
      alchemicaCost: [0, 0, 0, 0],
      craftTime: 0,
      deprecated: true,
      name: "",
    })
  );
  tiles.push(
    outputTile({
      tileType: 1,
      width: 2,
      height: 2,
      alchemicaCost: [5, 5, 5, 5],
      craftTime: 1000,
      deprecated: true,
      name: "tile 1",
    })
  );
  tiles.push(
    outputTile({
      deprecated: true,
      tileType: 2,
      width: 4,
      height: 4,
      alchemicaCost: [10, 10, 10, 10],
      craftTime: 2000,
      name: "tile 2",
    })
  );
  tiles.push(
    outputTile({
      deprecated: true,
      tileType: 3,
      width: 8,
      height: 8,
      alchemicaCost: [20, 20, 20, 20],
      craftTime: 5000,
      name: "tile 3",
    })
  );
  return tiles;
}

export function goldenAaltar() {
  const installations: InstallationTypeOutput[] = [];

  //Level 1 GA
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 1,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [0, 0, 0, 0],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 50,
      craftTime: 0,
      deprecated: true,
      nextLevelId: 1,
      prerequisites: [],
      name: "Golden Aaltar",
      upgradeQueueBoost: 1,
    })
  );

  //Level 2 GA
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 2,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [100, 20, 0, 30],
      harvestRate: 2,
      capacity: 0,
      spillRadius: 0,
      spillRate: 45,
      craftTime: 1000,
      deprecated: false,
      nextLevelId: 2,
      prerequisites: [],
      name: "Golden Aaltar",
      upgradeQueueBoost: 0,
    })
  );
  installations.push(
    outputInstallation({
      installationType: 1,
      level: 3,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [400, 50, 60, 60],
      harvestRate: 0,
      capacity: 500,
      spillRadius: 100,
      spillRate: 40,
      craftTime: 20000,
      deprecated: false,
      nextLevelId: 3,
      prerequisites: [],
      name: "Golden Aaltar",
      upgradeQueueBoost: 0,
    })
  );
  installations.push(
    outputInstallation({
      installationType: 1,
      level: 4,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [40, 50, 60, 60],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 35,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 4,
      prerequisites: [],
      name: "Golden Aaltar",
      upgradeQueueBoost: 0,
    })
  );

  return installations;
}

export function testnetAltar() {
  const installations: InstallationTypeOutput[] = [];

  //Void
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 1,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [0, 0, 0, 0],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 50,
      craftTime: 0,
      deprecated: true,
      nextLevelId: 1,
      prerequisites: [],
      name: "The Void",
      upgradeQueueBoost: 0,
    })
  );

  //Level 1 GA
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 1,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [100, 20, 0, 30],
      harvestRate: 2,
      capacity: 0,
      spillRadius: 0,
      spillRate: 45,
      craftTime: 0,
      deprecated: false,
      nextLevelId: 2,
      prerequisites: [],
      name: "Alchemical Aaltar (Testnet)",
      upgradeQueueBoost: 1,
    })
  );
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 2,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [400, 50, 60, 60],
      harvestRate: 0,
      capacity: 500,
      spillRadius: 100,
      spillRate: 40,
      craftTime: 20000,
      deprecated: false,
      nextLevelId: 3,
      prerequisites: [1],
      name: "Alchemical Aaltar (Testnet)",
      upgradeQueueBoost: 1,
    })
  );
  installations.push(
    outputInstallation({
      installationType: 0,
      level: 3,
      width: 2,
      height: 2,
      alchemicaType: 0,
      alchemicaCost: [40, 50, 60, 60],
      harvestRate: 0,
      capacity: 0,
      spillRadius: 0,
      spillRate: 35,
      craftTime: 10000,
      deprecated: false,
      nextLevelId: 4,
      prerequisites: [2],
      name: "Alchemical Aaltar (Testnet)",
      upgradeQueueBoost: 1,
    })
  );

  return installations;
}

export async function deployAlchemica(ethers: any, diamondAddress: string) {
  const Fud = await ethers.getContractFactory("AlchemicaToken");
  let fud = (await Fud.connect(signer).deploy()) as AlchemicaToken;
  const Fomo = await ethers.getContractFactory("AlchemicaToken");
  let fomo = (await Fomo.connect(signer).deploy()) as AlchemicaToken;
  const Alpha = await ethers.getContractFactory("AlchemicaToken");
  let alpha = (await Alpha.connect(signer).deploy()) as AlchemicaToken;
  const Kek = await ethers.getContractFactory("AlchemicaToken");
  let kek = (await Kek.connect(signer).deploy()) as AlchemicaToken;
  await fud
    .connect(signer)
    .initialize(
      "FUD",
      "FUD",
      ethers.utils.parseUnits("1000000000000"),
      diamondAddress,
      diamondAddress,
      diamondAddress
    );
  await fomo
    .connect(signer)
    .initialize(
      "FOMO",
      "FOMO",
      ethers.utils.parseUnits("250000000000"),
      diamondAddress,
      diamondAddress,
      diamondAddress
    );
  await alpha
    .connect(signer)
    .initialize(
      "ALPHA",
      "ALPHA",
      ethers.utils.parseUnits("125000000000"),
      diamondAddress,
      diamondAddress,
      diamondAddress
    );
  await kek
    .connect(signer)
    .initialize(
      "KEK",
      "KEK",
      ethers.utils.parseUnits("100000000000"),
      diamondAddress,
      diamondAddress,
      diamondAddress
    );

  const Glmr = await ethers.getContractFactory("GLTR");
  let gltr = (await Glmr.connect(signer).deploy()) as GLTR;

  return {
    fud,
    fomo,
    alpha,
    kek,
    gltr,
  };
}

export async function beforeTest(
  ethers: any,
  realmDiamondAddress: string
): Promise<TestBeforeVars> {
  const installationsAddress = await deployDiamond();
  const tileAddress = await deployDiamondTile();

  const alchemica = await deployAlchemica(ethers, realmDiamondAddress);

  const fud = alchemica.fud;
  const fomo = alchemica.fomo;
  const alpha = alchemica.alpha;
  const kek = alchemica.kek;
  const gltr = alchemica.gltr;

  //Upgrade Realm Diamond
  await upgrade(installationsAddress, {
    fud: alchemica.fud.address,
    fomo: alchemica.fomo.address,
    alpha: alchemica.alpha.address,
    kek: alchemica.kek.address,
    gltr: alchemica.gltr.address,
  });

  const alchemicaFacet = (await ethers.getContractAt(
    "AlchemicaFacet",
    realmDiamondAddress
  )) as AlchemicaFacet;
  const realmFacet = (await ethers.getContractAt(
    "RealmFacet",
    realmDiamondAddress
  )) as RealmFacet;
  const installationDiamond = (await ethers.getContractAt(
    "InstallationFacet",
    installationsAddress
  )) as InstallationFacet;
  const installationAdminFacet = (await ethers.getContractAt(
    "InstallationAdminFacet",
    installationsAddress
  )) as InstallationAdminFacet;
  const tileDiamond = (await ethers.getContractAt(
    "TileFacet",
    tileAddress
  )) as TileFacet;

  const erc1155Facet = (await ethers.getContractAt(
    "ERC1155Facet",
    installationsAddress
  )) as ERC1155Facet;
  const erc1155FacetTile = (await ethers.getContractAt(
    "ERC1155FacetTile",
    tileAddress
  )) as ERC1155FacetTile;

  const ownershipFacet = (await ethers.getContractAt(
    "OwnershipFacet",
    realmDiamondAddress
  )) as OwnershipFacet;

  const ownerAddress = await ownershipFacet.owner();

  const installationOwnershipFacet = (await ethers.getContractAt(
    "OwnershipFacet",
    installationsAddress
  )) as OwnershipFacet;
  const tileOwnershipFacet = (await ethers.getContractAt(
    "OwnershipFacet",
    tileAddress
  )) as OwnershipFacet;
  const installationOwner = await installationOwnershipFacet.owner();

  const tileOwner = await tileOwnershipFacet.owner();

  const alchemicaOwner = await fud.owner();

  const backendSigner = new ethers.Wallet(process.env.REALM_PK); // PK should start with '0x'

  await installationAdminFacet.setAddresses(
    maticAavegotchiDiamondAddress,
    maticDiamondAddress,
    gltr.address,
    pixelcraftAddress,
    aavegotchiDAOAddress,
    ethers.utils.hexDataSlice(backendSigner.publicKey, 1)
  );
  await tileDiamond.setAddresses(
    maticAavegotchiDiamondAddress,
    realmDiamondAddress,
    gltr.address,
    pixelcraftAddress,
    aavegotchiDAOAddress
  );

  let ownerRealmFacet = await impersonate(
    ownerAddress,
    realmFacet,
    ethers,
    network
  );

  await ownerRealmFacet.setGameActive(true);

  return {
    alchemicaFacet,
    installationsAddress,
    realmFacet,
    installationDiamond,
    installationAdminFacet,
    erc1155Facet,
    erc1155FacetTile,
    ownerAddress,
    installationOwner,
    fud,
    fomo,
    alpha,
    kek,
    gltr,
    tileDiamond,
    tileAddress,
    tileOwner,
    alchemicaOwner,
  };
}

const backendSigner = () => {
  //@ts-ignore
  return new ethers.Wallet(process.env.PROD_PK); // PK should start with '0x'
};

export const genEquipInstallationSignature = async (
  parcelId: number,
  tileId: number,
  x: number,
  y: number
) => {
  let messageHash1 = ethers.utils.solidityKeccak256(
    ["uint256", "uint256", "uint256", "uint256"],
    [parcelId, tileId, x, y]
  );
  let signedMessage1 = await backendSigner().signMessage(
    ethers.utils.arrayify(messageHash1)
  );
  let signature1 = ethers.utils.arrayify(signedMessage1);

  return signature1;
};

export const genUpgradeInstallationSignature = async (
  realmId: number,
  coordinateX: number,
  coordinateY: number,
  installationId: number
) => {
  let messageHash = ethers.utils.solidityKeccak256(
    ["uint256", "uint16", "uint16", "uint256"],
    [realmId, coordinateX, coordinateY, installationId]
  );
  let signedMessage = await backendSigner().signMessage(
    ethers.utils.arrayify(messageHash)
  );
  let signature = ethers.utils.arrayify(signedMessage);
  return signature;
};

export const genClaimAlchemicaSignature = async (
  parcelId: number,
  gotchiId: number,
  amount: BigNumber
) => {
  let messageHash = ethers.utils.solidityKeccak256(
    ["uint256", "uint256", "uint256", "uint256"],
    [0, parcelId, gotchiId, amount]
  );
  let signedMessage = await backendSigner().signMessage(
    ethers.utils.arrayify(messageHash)
  );
  let signature = ethers.utils.arrayify(signedMessage);

  return signature;
};

export const genChannelAlchemicaSignature = async (
  parcelId: number,
  gotchiId: number,
  lastChanneled: BigNumber
) => {
  let messageHash = ethers.utils.solidityKeccak256(
    ["uint256", "uint256", "uint256"],
    [parcelId, gotchiId, lastChanneled]
  );
  let signedMessage = await backendSigner().signMessage(
    ethers.utils.arrayify(messageHash)
  );
  let signature = ethers.utils.arrayify(signedMessage);

  return signature;

  // signedMessage = await backendSigner.signMessage(messageHash);
};

export async function faucetRealAlchemica(receiver: string, ethers: any) {
  const alchemica = [
    "0x403E967b044d4Be25170310157cB1A4Bf10bdD0f",
    "0x44A6e0BE76e1D9620A7F76588e4509fE4fa8E8C8",
    "0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2",
    "0x42E5E06EF5b90Fe15F853F59299Fc96259209c5C",
  ];

  for (let i = 0; i < alchemica.length; i++) {
    const alchemicaToken = alchemica[i];
    let token = (await ethers.getContractAt(
      "AlchemicaToken",
      alchemicaToken
    )) as AlchemicaToken;
    token = await impersonate(await token.owner(), token, ethers, network);
    await token.mint(receiver, ethers.utils.parseEther("10000"));
  }
}

export async function approveRealAlchemica(
  address: string,
  installationAddress: string,
  ethers: any
) {
  const alchemica = [
    "0x403E967b044d4Be25170310157cB1A4Bf10bdD0f",
    "0x44A6e0BE76e1D9620A7F76588e4509fE4fa8E8C8",
    "0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2",
    "0x42E5E06EF5b90Fe15F853F59299Fc96259209c5C",
  ];

  for (let i = 0; i < alchemica.length; i++) {
    const alchemicaToken = alchemica[i];
    let token = (await ethers.getContractAt(
      "AlchemicaToken",
      alchemicaToken
    )) as AlchemicaToken;
    token = await impersonate(address, token, ethers, network);
    await token.approve(
      installationAddress,
      ethers.utils.parseUnits("1000000000")
    );
  }
}

export async function approveAlchemica(
  g: TestBeforeVars,
  ethers: any,
  address: string,
  network: Network
) {
  g.fud = await impersonate(address, g.fud, ethers, network);
  g.fomo = await impersonate(address, g.fomo, ethers, network);
  g.alpha = await impersonate(address, g.alpha, ethers, network);
  g.kek = await impersonate(address, g.kek, ethers, network);

  await g.fud.approve(
    g.installationsAddress,
    ethers.utils.parseUnits("1000000000")
  );
  await g.fomo.approve(
    g.installationsAddress,
    ethers.utils.parseUnits("1000000000")
  );
  await g.alpha.approve(
    g.installationsAddress,
    ethers.utils.parseUnits("1000000000")
  );
  await g.kek.approve(
    g.installationsAddress,
    ethers.utils.parseUnits("1000000000")
  );

  return g;
}

export async function mintAlchemica(
  g: TestBeforeVars,
  ethers: any,
  owner: string,
  to: string,
  network: Network,
  amount: BigNumber
) {
  g.fud = await impersonate(owner, g.fud, ethers, network);
  g.fomo = await impersonate(owner, g.fomo, ethers, network);
  g.alpha = await impersonate(owner, g.alpha, ethers, network);
  g.kek = await impersonate(owner, g.kek, ethers, network);

  await g.fud.mint(to, amount);
  await g.fomo.mint(to, amount);
  await g.alpha.mint(to, amount);
  await g.kek.mint(to, amount);

  return g;
}
