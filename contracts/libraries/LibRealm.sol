// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import {InstallationDiamondInterface} from "../interfaces/InstallationDiamond.sol";
import {TileDiamondInterface} from "../interfaces/TileDiamond.sol";
import "./AppStorage.sol";
import "hardhat/console.sol";

library LibRealm {
  event SurveyParcel(uint256 _tokenId, uint256[] _alchemicas);

  //Place installation
  function placeInstallation(
    uint256 _realmId,
    uint256 _installationId,
    uint256 _x,
    uint256 _y
  ) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();
    uint256[5] memory widths = getWidths();

    uint256[5] memory heights = getHeights();

    InstallationDiamondInterface installationsDiamond = InstallationDiamondInterface(s.installationsDiamond);
    InstallationDiamondInterface.InstallationType memory installation = installationsDiamond.getInstallationType(_installationId);

    Parcel storage parcel = s.parcels[_realmId];

    //Check if these slots are available onchain
    require(_x <= widths[parcel.size] - installation.width, "LibRealm: x exceeding width");
    require(_y <= heights[parcel.size] - installation.height, "LibRealm: y exceeding height");
    for (uint256 indexW = _x; indexW < _x + installation.width; indexW++) {
      for (uint256 indexH = _y; indexH < _y + installation.height; indexH++) {
        require(parcel.buildGrid[indexW][indexH] == 0, "LibRealm: Invalid spot");
        parcel.buildGrid[indexW][indexH] = _installationId;
      }
    }
  }

  function removeInstallation(
    uint256 _realmId,
    uint256 _installationId,
    uint256 _x,
    uint256 _y
  ) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();
    InstallationDiamondInterface installationsDiamond = InstallationDiamondInterface(s.installationsDiamond);
    InstallationDiamondInterface.InstallationType memory installation = installationsDiamond.getInstallationType(_installationId);
    Parcel storage parcel = s.parcels[_realmId];
    require(parcel.buildGrid[_x][_y] == _installationId, "LibRealm: wrong installationId");
    for (uint256 indexW = _x; indexW < _x + installation.width; indexW++) {
      for (uint256 indexH = _y; indexH < _y + installation.height; indexH++) {
        parcel.buildGrid[indexW][indexH] = 0;
      }
    }
  }

  function placeTile(
    uint256 _realmId,
    uint256 _tileId,
    uint256 _x,
    uint256 _y
  ) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();
    uint256[5] memory widths = getWidths();

    uint256[5] memory heights = getHeights();

    TileDiamondInterface tilesDiamond = TileDiamondInterface(s.tileDiamond);
    TileDiamondInterface.TileType memory tile = tilesDiamond.getTileType(_tileId);

    Parcel storage parcel = s.parcels[_realmId];

    //Check if these slots are available onchain
    require(_x <= widths[parcel.size] - tile.width - 1, "LibRealm: x exceeding width");
    require(_y <= heights[parcel.size] - tile.height - 1, "LibRealm: y exceeding height");
    for (uint256 indexW = _x; indexW < _x + tile.width; indexW++) {
      for (uint256 indexH = _y; indexH < _y + tile.height; indexH++) {
        require(parcel.tileGrid[indexW][indexH] == 0, "LibRealm: Invalid spot");
        parcel.tileGrid[indexW][indexH] = _tileId;
      }
    }
  }

  function removeTile(
    uint256 _realmId,
    uint256 _tileId,
    uint256 _x,
    uint256 _y
  ) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();
    TileDiamondInterface tilesDiamond = TileDiamondInterface(s.tileDiamond);
    TileDiamondInterface.TileType memory tile = tilesDiamond.getTileType(_tileId);
    Parcel storage parcel = s.parcels[_realmId];
    require(parcel.tileGrid[_x][_y] == _tileId, "LibRealm: wrong tileId");
    for (uint256 indexW = _x; indexW < _x + tile.width; indexW++) {
      for (uint256 indexH = _y; indexH < _y + tile.height; indexH++) {
        parcel.tileGrid[indexW][indexH] = 0;
      }
    }
  }

  function calculateAmount(
    uint256 _tokenId,
    uint256[] memory randomWords,
    uint256 i
  ) internal view returns (uint256) {
    AppStorage storage s = LibAppStorage.diamondStorage();
    return (randomWords[i] % s.totalAlchemicas[s.parcels[_tokenId].size][i]);
  }

  function updateRemainingAlchemica(
    uint256 _tokenId,
    uint256[] memory randomWords,
    uint256 _round
  ) internal {
    AppStorage storage s = LibAppStorage.diamondStorage();
    require(s.parcels[_tokenId].currentRound <= s.surveyingRound, "AlchemicaFacet: Round not released");
    s.parcels[_tokenId].currentRound++;
    s.parcels[_tokenId].surveying = false;

    uint256[] memory alchemicas = new uint256[](4);
    uint256[] memory roundAmounts = new uint256[](4);
    for (uint256 i; i < 4; i++) {
      uint256 baseAmount = calculateAmount(_tokenId, randomWords, i); //100%;

      //first round is 25%, rounds after are 8.3%
      uint256 roundAmount = _round == 0 ? baseAmount / 4 : (baseAmount - (baseAmount / 4)) / 9;
      uint256 boost = s.parcels[_tokenId].alchemicaBoost[i] * s.boostMultipliers[i];

      s.parcels[_tokenId].alchemicaRemaining[i] += roundAmount + boost;
      roundAmounts[i] = roundAmount;
      alchemicas[i] = roundAmount + boost;
    }
    //update round alchemica
    s.parcels[_tokenId].roundAlchemica[_round] = alchemicas;
    s.parcels[_tokenId].roundBaseAlchemica[_round] = roundAmounts;
    emit SurveyParcel(_tokenId, alchemicas);
  }

  function getWidths() internal pure returns (uint256[5] memory) {
    uint256[5] memory widths = [
      HUMBLE_WIDTH, //humble
      REASONABLE_WIDTH, //reasonable
      SPACIOUS_WIDTH, //spacious vertical
      SPACIOUS_HEIGHT, //spacious horizontal
      PAARTNER_WIDTH //partner
    ];
    return widths;
  }

  function getHeights() internal pure returns (uint256[5] memory) {
    uint256[5] memory heights = [
      HUMBLE_HEIGHT, //humble
      REASONABLE_HEIGHT, //reasonable
      SPACIOUS_HEIGHT, //spacious vertical
      SPACIOUS_WIDTH, //spacious horizontal
      PAARTNER_HEIGHT //partner
    ];
    return heights;
  }
}
