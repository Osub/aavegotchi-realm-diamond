import { BigNumber, Signer } from "ethers";
import { ethers } from "hardhat";
import { installationTypes } from "../../data/installations/installationTypes";
import {
  InstallationAdminFacet,
  InstallationFacet,
  OwnershipFacet,
} from "../../typechain";
import { InstallationTypeInput, InstallationTypeOutput } from "../../types";
import {
  aavegotchiDAOAddress,
  gasPrice,
  maticAavegotchiDiamondAddress,
  maticDiamondAddress,
  pixelcraftAddress,
} from "../helperFunctions";

function outputInstallation(
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
    spillRadius: installation.spillRadius.toString(),
    spillRate: (installation.spillRate * 1000).toString(), //add on 3 zeroes for precision
    upgradeQueueBoost: installation.upgradeQueueBoost,
    craftTime: installation.craftTime,
    nextLevelId: installation.nextLevelId,
    prerequisites: installation.prerequisites,
    name: installation.name,
  };

  return output;
}

export async function setAddresses() {
  const accounts: Signer[] = await ethers.getSigners();
  const deployer = accounts[0];

  const diamondAddress = "0x19f870bD94A34b3adAa9CaA439d333DA18d6812A";

  const installationFacet = (await ethers.getContractAt(
    "InstallationFacet",
    diamondAddress,
    deployer
  )) as InstallationFacet;

  const installations = await installationFacet.getInstallationTypes([]);
  console.log("installations:", installations);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  setAddresses()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
