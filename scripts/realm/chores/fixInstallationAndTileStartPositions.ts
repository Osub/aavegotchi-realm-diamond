const fs = require("fs").promises;
const hre = require("hardhat");
import { request } from "graphql-request";
import { ethers, network } from "hardhat";
import { Ownable, RealmGridFacet } from "../../../typechain";
import { impersonate } from "../../helperFunctions";
import { BigNumberish } from "@ethersproject/bignumber";
import { upgrade } from "../upgrades/upgrade-fixStartGrid";
import { varsForNetwork } from "../../../constants";

let DEFAULT_BLOCKNUMBER = 0;
let id = DEFAULT_BLOCKNUMBER;

const uri =
  "https://api.thegraph.com/subgraphs/name/aavegotchi/gotchiverse-matic";

function getInstallationsQuery() {
  return `
    {installations(first: 1000 where: {id_gt:"${id}" equipped: true}) {
      id
      x
      y
      type {
        id
      }
      parcel {
        id
      }
    }}`;
}

function getTilesQuery() {
  return `
    {tiles(first: 1000 skip: 0 where: {id_gt:"${id}" equipped: true}) {
      id
      x
      y
      type {
        id
      }
      parcel {
        id
      }
    }}`;
}

async function main() {
  await upgrade();

  // Tiles
  let tiles = [];
  let tilesTmp = (await request(uri, getTilesQuery())).tiles;
  while (tilesTmp.length > 0) {
    id = tilesTmp[tilesTmp.length - 1].id;
    tiles = tiles.concat(tilesTmp);
    tilesTmp = (await request(uri, getTilesQuery())).tiles;

    // console.log("Tiles: ", tiles.length);
  }

  // Installations
  id = DEFAULT_BLOCKNUMBER;
  let installations = [];
  let installationsTmp = (await request(uri, getInstallationsQuery()))
    .installations;

  while (installationsTmp.length > 0) {
    id = installationsTmp[installationsTmp.length - 1].id;
    installations = installations.concat(installationsTmp);
    installationsTmp = (await request(uri, getInstallationsQuery()))
      .installations;
  }

  const testing = ["hardhat", "localhost"].includes(hre.network.name);

  const accounts = await ethers.getSigners();

  const c = await varsForNetwork(ethers);

  let realmFacet = (await ethers.getContractAt(
    "RealmGridFacet",
    c.realmDiamond
  )) as RealmGridFacet;

  let ownable = (await ethers.getContractAt(
    "contracts/interfaces/Ownable.sol:Ownable",
    c.realmDiamond
  )) as Ownable;

  const owner = await ownable.owner();

  if (testing) {
    realmFacet = await impersonate(owner, realmFacet, ethers, network);

    console.log("tile length:", tiles.length);
    console.log("installation length:", installations.length);
  }

  console.log("Fixing installation start positions");
  const batchSize = 500;
  for (let i = 0; i < installations.length / batchSize; i++) {
    let realmIds: BigNumberish[] = [];
    let xs: BigNumberish[] = [];
    let ys: BigNumberish[] = [];
    let ids: BigNumberish[] = [];
    for (let j = 0; j < batchSize; j++) {
      const pos = i * batchSize + j;

      realmIds.push(installations[pos].parcel.id);
      xs.push(installations[pos].x);
      ys.push(installations[pos].y);
      ids.push(installations[pos].type.id);
    }

    console.log("realm ids:", realmIds);
    console.log("xs", xs);
    console.log("ys", ys);
    console.log("ids:", ids);

    let tx = await realmFacet.fixGridStartPositions(
      realmIds,
      xs,
      ys,
      false,
      ids
    );

    console.log("TXID: ", tx.hash, tx.gasLimit.toString());
    await tx.wait();
  }

  console.log("Fixing tile start positions");
  for (let i = 0; i < tiles.length / batchSize; i++) {
    let realmIds: BigNumberish[] = [];
    let xs: BigNumberish[] = [];
    let ys: BigNumberish[] = [];
    let ids: BigNumberish[] = [];
    for (let j = 0; j < batchSize; j++) {
      const pos = i * batchSize + j;
      realmIds.push(tiles[pos].parcel.id);
      xs.push(tiles[pos].x);
      ys.push(tiles[pos].y);
      ids.push(tiles[pos].type.id);
    }
    let tx = await realmFacet.fixGridStartPositions(
      realmIds,
      xs,
      ys,
      true,
      ids
    );
    console.log("TXID: ", tx.hash);
    await tx.wait();
  }
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
