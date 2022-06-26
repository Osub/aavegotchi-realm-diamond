import { run, ethers } from "hardhat";
import { maticRealmDiamondAddress } from "../../../../constants";
import {
  convertFacetAndSelectorsToString,
  DeployUpgradeTaskArgs,
  FacetsAndAddSelectors,
} from "../../../../tasks/deployUpgrade";

import { diamondOwner } from "../../../helperFunctions";
import { mintPaartnerParcels } from "../../chores/mintPaartnerParcels";

export async function upgradeRealmTest() {
  const MintParcelInput = `tuple(uint256 coordinateX, uint256 coordinateY, uint256 district, string parcelId, string parcelAddress, uint256 size, uint256[4] boost)`;

  const facets: FacetsAndAddSelectors[] = [
    {
      facetName: "TestRealmFacet",
      addSelectors: [
        `function testEquipInstallation(uint256 _realmId, uint256 _installationId, uint256 _x, uint256 _y) external`,
        `function testStartSurveying(uint256 _realmId) external`,
        `function testRawFulfillRandomWords(uint256 tokenId, uint256 surveyingRound, uint256 seed) external`,
      ],
      removeSelectors: [],
    },
  ];

  const joined = convertFacetAndSelectorsToString(facets);

  const args: DeployUpgradeTaskArgs = {
    diamondUpgrader: await diamondOwner(maticRealmDiamondAddress, ethers),
    diamondAddress: maticRealmDiamondAddress,
    facetsAndAddSelectors: joined,
    initAddress: ethers.constants.AddressZero,
    initCalldata: "0x",
    useLedger: true,
    useMultisig: false,
  };

  await run("deployUpgrade", args);

  // await mintPaartnerParcels();
}

if (require.main === module) {
  upgradeRealmTest()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
