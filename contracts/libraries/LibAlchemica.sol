// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import {InstallationDiamondInterface} from "../interfaces/InstallationDiamond.sol";
import {LibAppStorage, AppStorage, Parcel} from "./AppStorage.sol";
import "hardhat/console.sol";

library LibAlchemica {
  //Parcel starts out with 0 harvest rate
  //Player equips harvester, harvest rate begins increasing
  //Available alchemica will always be 0 if reservoir has not been added
  //Once player has equipped a reservoir, the harvested amount will increase until it has reached the capacity.
  //When a player claims the alchemica, the timeSinceLastUpdate is reset to 0, which means the harvested amount is also set back to zero. This prevents the reservoir from immediately refilling after a claim.

  function settleUnclaimedAlchemica(uint256 _tokenId, uint256 _alchemicaType) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();

    uint256 capacity = s.parcels[_tokenId].reservoirCapacity[_alchemicaType];
    uint256 alchemicaSinceUpdate = alchemicaSinceLastUpdate(_tokenId, _alchemicaType);

    if (alchemicaSinceUpdate > capacity) {
      s.parcels[_tokenId].unclaimedAlchemica[_alchemicaType] = capacity;
    } else {
      s.parcels[_tokenId].unclaimedAlchemica[_alchemicaType] += alchemicaSinceUpdate;
    }

    s.parcels[_tokenId].lastUpdateTimestamp[_alchemicaType] = block.timestamp;
  }

  function alchemicaSinceLastUpdate(uint256 _tokenId, uint256 _alchemicaType) internal view returns (uint256) {
    AppStorage storage s = LibAppStorage.diamondStorage();

    return s.parcels[_tokenId].alchemicaHarvestRate[_alchemicaType] * (block.timestamp - s.parcels[_tokenId].lastUpdateTimestamp[_alchemicaType]);
  }

  function increaseTraits(uint256 _realmId, uint256 _installationId) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();

    //First save the current harvested amount
    InstallationDiamondInterface.InstallationType memory installationType = InstallationDiamondInterface(s.installationsDiamond).getInstallationType(
      _installationId
    );

    uint256 alchemicaType = installationType.alchemicaType;

    //unclaimed alchemica must be settled before mutating harvestRate and capacity
    settleUnclaimedAlchemica(_realmId, alchemicaType);

    //handle harvester
    if (installationType.harvestRate > 0) {
      s.parcels[_realmId].alchemicaHarvestRate[installationType.alchemicaType] += installationType.harvestRate;
    }

    //reservoir
    if (installationType.capacity > 0) {
      s.parcels[_realmId].reservoirCapacity[installationType.alchemicaType] += installationType.capacity;

      //increment storage vars
      s.parcels[_realmId].reservoirCount[installationType.alchemicaType]++;
      s.parcels[_realmId].spilloverRate[installationType.alchemicaType] += installationType.spillRate;
      s.parcels[_realmId].spilloverRadius[installationType.alchemicaType] += installationType.spillRadius;
    }
  }

  function reduceTraits(uint256 _realmId, uint256 _installationId) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();

    InstallationDiamondInterface.InstallationType memory installationType = InstallationDiamondInterface(s.installationsDiamond).getInstallationType(
      _installationId
    );

    uint256 alchemicaType = installationType.alchemicaType;

    //unclaimed alchemica must be settled before updating harvestRate and capacity
    settleUnclaimedAlchemica(_realmId, alchemicaType);

    //Decrement harvest variables
    if (installationType.harvestRate > 0) {
      s.parcels[_realmId].alchemicaHarvestRate[alchemicaType] -= installationType.harvestRate;
    }

    //Decrement reservoir variables
    if (installationType.capacity > 0) {
      s.parcels[_realmId].reservoirCapacity[alchemicaType] -= installationType.capacity;
      s.parcels[_realmId].reservoirCount[alchemicaType]--;
      s.parcels[_realmId].spilloverRate[alchemicaType] -= installationType.spillRate;
      s.parcels[_realmId].spilloverRadius[alchemicaType] -= installationType.spillRadius;

      if (s.parcels[_realmId].unclaimedAlchemica[alchemicaType] > s.parcels[_realmId].reservoirCapacity[alchemicaType]) {
        //@todo: test harvesting and then unequipping
        revert("LibAlchemica: Unclaimed alchemica greater than reservoir capacity");
      }
    }
  }
}
