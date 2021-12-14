//@ts-ignore
import { run } from "hardhat";
import { MintParcelsTaskArgs } from "../../tasks/mintParcels";
import { parcels } from "../../data/raffle2";
import { maticDiamondAddress } from "../helperFunctions";

export async function mintParcels() {
  const maxProcess = 30;

  const batches = Math.ceil(parcels.length / maxProcess);
  console.log("batches:", batches);

  let currentBatch = 0;

  for (let index = 0; index < batches; index++) {
    const tokenIds = parcels
      .slice(maxProcess * currentBatch, maxProcess * currentBatch + maxProcess)
      .join(",");

    const taskArgs: MintParcelsTaskArgs = {
      //Send directly to voucher conversion contract
      toAddress: "0xD8eB01f43B2Cfb1b29e2119FFe90DFbF11f873a3",
      tokenIds: tokenIds,
      diamondAddress: maticDiamondAddress,
    };

    await run("mintParcels", taskArgs);

    currentBatch++;
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  mintParcels()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
