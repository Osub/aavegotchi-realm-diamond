// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "../../libraries/AppStorage.sol";
import "./RealmFacet.sol";
import "../../libraries/LibRealm.sol";
import "../../libraries/LibMeta.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "../../libraries/LibAlchemica.sol";
import "../../libraries/LibSignature.sol";
import "../../interfaces/AavegotchiDiamond.sol";
import "../../interfaces/IERC20Mintable.sol";

uint256 constant bp = 100 ether;

contract AlchemicaFacet is Modifiers {
  event AlchemicaClaimed(
    uint256 indexed _realmId,
    uint256 indexed _gotchiId,
    uint256 indexed _alchemicaType,
    uint256 _amount,
    uint256 _spilloverRate,
    uint256 _spilloverRadius
  );

  event ChannelAlchemica(
    uint256 indexed _realmId,
    uint256 indexed _gotchiId,
    uint256[4] _alchemica,
    uint256 _spilloverRate,
    uint256 _spilloverRadius
  );

  event ExitAlchemica(uint256 indexed _gotchiId, uint256[] _alchemica);

  event SurveyingRoundProgressed(uint256 indexed _newRound);

  // /// @notice Allow the owner of a parcel to start surveying his parcel
  // /// @dev Will throw if a surveying round has not started
  // /// @param _realmId Identifier of the parcel to survey
  // function startSurveying(uint256 _realmId) external onlyParcelOwner(_realmId) gameActive {
  //   require(s.parcels[_realmId].altarId > 0, "AlchemicaFacet: Must equip Altar");
  //   require(!s.parcels[_realmId].surveying, "AlchemicaFacet: Parcel already surveying");
  //   s.parcels[_realmId].surveying = true;
  //   // do we need to cancel the listing?
  //   drawRandomNumbers(_realmId, s.parcels[_realmId].currentRound);
  // }

  // function drawRandomNumbers(uint256 _realmId, uint256 _surveyingRound) internal {
  //   // Will revert if subscription is not set and funded.
  //   uint256 requestId = VRFCoordinatorV2Interface(s.vrfCoordinator).requestRandomWords(
  //     s.requestConfig.keyHash,
  //     s.requestConfig.subId,
  //     s.requestConfig.requestConfirmations,
  //     s.requestConfig.callbackGasLimit,
  //     s.requestConfig.numWords
  //   );
  //   s.vrfRequestIdToTokenId[requestId] = _realmId;
  //   s.vrfRequestIdToSurveyingRound[requestId] = _surveyingRound;
  // }

  function getAlchemicaAddresses() external view returns (address[4] memory) {
    return s.alchemicaAddresses;
  }

  /// @notice Query details about all total alchemicas present
  /// @return output_ A two dimensional array, each representing an alchemica value
  function getTotalAlchemicas() external view returns (uint256[4][5] memory) {
    return s.totalAlchemicas;
  }

  /// @notice Query details about the remaining alchemica in a parcel
  /// @param _realmId The identifier of the parcel to query
  /// @return output_ An array containing details about each remaining alchemica in the parcel
  function getRealmAlchemica(uint256 _realmId) external view returns (uint256[4] memory) {
    return s.parcels[_realmId].alchemicaRemaining;
  }

  // /// @notice Allow the diamond owner to increment the surveying round
  // function progressSurveyingRound() external onlyOwner {
  //   s.surveyingRound++;
  //   emit SurveyingRoundProgressed(s.surveyingRound);
  // }

  /// @notice Query details about all alchemica gathered in a surveying round in a parcel
  /// @param _realmId Identifier of the parcel to query
  /// @param _roundId Identifier of the surveying round to query
  /// @return output_ An array representing the numbers of alchemica gathered in a round
  function getRoundAlchemica(uint256 _realmId, uint256 _roundId) external view returns (uint256[] memory) {
    return s.parcels[_realmId].roundAlchemica[_roundId];
  }

  /// @notice Query details about the base alchemica gathered in a surveying round in a parcel
  /// @param _realmId Identifier of the parcel to query
  /// @param _roundId Identifier of the surveying round to query
  /// @return output_ An array representing the numbers of base alchemica gathered in a round
  function getRoundBaseAlchemica(uint256 _realmId, uint256 _roundId) external view returns (uint256[] memory) {
    return s.parcels[_realmId].roundBaseAlchemica[_roundId];
  }

  /// @notice Allow the diamond owner to set some important diamond state variables
  /// @param _alchemicas A nested array containing the amount of alchemicas available
  /// @param _boostMultipliers The boost multiplers applied to each parcel
  /// @param _greatPortalCapacity The individual alchemica capacity of the great portal
  /// @param _installationsDiamond The installations diamond address
  /// @param _vrfCoordinator The chainlink vrfCoordinator address
  /// @param _linkAddress The link token address
  /// @param _alchemicaAddresses The four alchemica token addresses
  /// @param _backendPubKey The Realm(gotchiverse) backend public key
  /// @param _gameManager The address of the game manager
  function setVars(
    uint256[4][5] calldata _alchemicas,
    uint256[4] calldata _boostMultipliers,
    uint256[4] calldata _greatPortalCapacity,
    address _installationsDiamond,
    address _vrfCoordinator,
    address _linkAddress,
    address[4] calldata _alchemicaAddresses,
    address _gltrAddress,
    bytes memory _backendPubKey,
    address _gameManager,
    address _tileDiamond,
    address _aavegotchiDiamond
  ) external onlyOwner {
    for (uint256 i; i < _alchemicas.length; i++) {
      for (uint256 j; j < _alchemicas[i].length; j++) {
        s.totalAlchemicas[i][j] = _alchemicas[i][j];
      }
    }
    s.boostMultipliers = _boostMultipliers;
    s.greatPortalCapacity = _greatPortalCapacity;
    s.installationsDiamond = _installationsDiamond;
    s.vrfCoordinator = _vrfCoordinator;
    s.linkAddress = _linkAddress;
    s.alchemicaAddresses = _alchemicaAddresses;
    s.backendPubKey = _backendPubKey;
    s.gameManager = _gameManager;
    s.gltrAddress = _gltrAddress;
    s.tileDiamond = _tileDiamond;
    s.aavegotchiDiamond = _aavegotchiDiamond;
  }

  /// @notice Query the available alchemica in a parcel
  /// @param _realmId identifier of parcel to query
  /// @return _availableAlchemica An array representing the available quantity of alchemicas
  function getAvailableAlchemica(uint256 _realmId) public view returns (uint256[4] memory _availableAlchemica) {
    //Calculate the # of blocks elapsed since the last

    for (uint256 index = 0; index < 4; index++) {
      //First get the onchain amount
      uint256 available = s.parcels[_realmId].unclaimedAlchemica[index];
      //Then get the floating amount
      available += LibAlchemica.alchemicaSinceLastUpdate(_realmId, index);

      uint256 capacity = LibAlchemica.calculateTotalCapacity(_realmId, index);

      //ensure that available alchemica is not higher than available reservoir capacity
      if (available > capacity) {
        _availableAlchemica[index] = capacity;
      } else {
        _availableAlchemica[index] = available;
      }
    }
  }

  struct SpilloverIO {
    uint256 rate;
    uint256 radius;
  }

  function calculateSpilloverForReservoir(uint256 _realmId, uint256 _alchemicaType) public view returns (SpilloverIO memory spillover_) {
    uint256 capacityXspillrate;
    uint256 capacityXspillradius;
    uint256 totalCapacity;
    for (uint256 i; i < s.parcels[_realmId].reservoirs[_alchemicaType].length; i++) {
      InstallationDiamondInterface.ReservoirStats memory reservoirStats = InstallationDiamondInterface(s.installationsDiamond).getReservoirStats(
        s.parcels[_realmId].reservoirs[_alchemicaType][i]
      );
      totalCapacity += reservoirStats.capacity;

      capacityXspillrate += reservoirStats.capacity * reservoirStats.spillRate;
      capacityXspillradius += reservoirStats.capacity * reservoirStats.spillRadius;
    }
    require(totalCapacity > 0, "AlchemicaFacet: no reservoirs equipped");

    uint256 spilloverRate = capacityXspillrate / totalCapacity;
    uint256 spilloverRadius = capacityXspillradius / totalCapacity;

    return SpilloverIO(spilloverRate, spilloverRadius);
  }

  struct TransferAmounts {
    uint256 owner;
    uint256 spill;
  }

  function calculateTransferAmounts(uint256 _amount, uint256 _spilloverRate) internal pure returns (TransferAmounts memory) {
    uint256 owner = (_amount * (bp - (_spilloverRate * 10**16))) / bp;
    uint256 spill = (_amount * (_spilloverRate * 10**16)) / bp;
    return TransferAmounts(owner, spill);
  }

  function alchemicaRecipient(uint256 _gotchiId) internal view returns (address) {
    AavegotchiDiamond diamond = AavegotchiDiamond(s.aavegotchiDiamond);
    if (diamond.isAavegotchiLent(uint32(_gotchiId))) {
      return diamond.gotchiEscrow(_gotchiId);
    } else {
      return diamond.ownerOf(_gotchiId);
    }
  }

  // /// @notice Allow parcel owner to claim available alchemica with his parent NFT(Aavegotchi)
  // /// @param _realmId Identifier of parcel to claim alchemica from
  // /// @param _alchemicaTypes Alchemica types to claim
  // /// @param _gotchiId Identifier of Aavegotchi to use for alchemica collecction/claiming
  // /// @param _signature Message signature used for backend validation
  // function claimAvailableAlchemica(
  //   uint256 _realmId,
  //   uint256[] calldata _alchemicaTypes,
  //   uint256 _gotchiId,
  //   bytes memory _signature
  // ) external gameActive {
  //   //Check access rights
  //   if (s.accessRights[_realmId][1] == 0) {
  //     require(LibMeta.msgSender() == s.parcels[_realmId].owner, "AlchemicaFacet: Only Parcel owner can claim");
  //   } else if (s.accessRights[_realmId][1] == 1) {
  //     try AavegotchiDiamond(s.aavegotchiDiamond).getGotchiLendingFromToken(uint32(_gotchiId)) returns (
  //       AavegotchiDiamond.GotchiLending memory listing
  //     ) {
  //       require(
  //         LibMeta.msgSender() == s.parcels[_realmId].owner ||
  //           (LibMeta.msgSender() == listing.borrower && listing.lender == s.parcels[_realmId].owner),
  //         "AlchemicaFacet: Only Parcel owner/borrower can claim"
  //       );
  //     } catch (bytes memory) {
  //       revert("AlchemicaFacet: Only Parcel owner/borrower can claim");
  //     }
  //   }

  //   require(block.timestamp > s.lastClaimedAlchemica[_realmId] + 8 hours, "AlchemicaFacet: 8 hours claim cooldown");
  //   s.lastClaimedAlchemica[_realmId] = block.timestamp;

  //   uint256[4] memory _availableAlchemica = getAvailableAlchemica(_realmId);

  //   for (uint256 i = 0; i < _alchemicaTypes.length; i++) {
  //     uint256 remaining = s.parcels[_realmId].alchemicaRemaining[_alchemicaTypes[i]];

  //     require(
  //       LibSignature.isValid(keccak256(abi.encodePacked(_alchemicaTypes[i], _realmId, _gotchiId, remaining)), _signature, s.backendPubKey),
  //       "AlchemicaFacet: Invalid signature"
  //     );

  //     //@todo (future release): allow claimOperator

  //     uint256 available = _availableAlchemica[_alchemicaTypes[i]];
  //     require(remaining >= available, "AlchemicaFacet: Not enough alchemica available");

  //     s.parcels[_realmId].alchemicaRemaining[_alchemicaTypes[i]] -= available;
  //     s.parcels[_realmId].unclaimedAlchemica[_alchemicaTypes[i]] = 0;
  //     s.parcels[_realmId].lastUpdateTimestamp[_alchemicaTypes[i]] = block.timestamp;

  //     SpilloverIO memory spillover = calculateSpilloverForReservoir(_realmId, _alchemicaTypes[i]);
  //     TransferAmounts memory amounts = calculateTransferAmounts(available, spillover.rate);

  //     //Mint new tokens
  //     _mintAvailableAlchemica(_alchemicaTypes[i], _gotchiId, amounts.owner, amounts.spill);

  //     emit AlchemicaClaimed(_realmId, _gotchiId, _alchemicaTypes[i], available, spillover.rate, spillover.radius);
  //   }
  // }

  function _mintAvailableAlchemica(
    uint256 _alchemicaType,
    uint256 _gotchiId,
    uint256 _owner,
    uint256 _spill
  ) internal {
    IERC20Mintable alchemica = IERC20Mintable(s.alchemicaAddresses[_alchemicaType]);
    alchemica.mint(alchemicaRecipient(_gotchiId), _owner);
    alchemica.mint(address(this), _spill);
  }

  /// @notice Allow a parcel owner to channel alchemica
  /// @dev This transfers alchemica to the parent ERC721 token with id _gotchiId and also to the great portal
  /// @param _realmId Identifier of parcel where alchemica is being channeled from
  /// @param _gotchiId Identifier of parent ERC721 aavegotchi which alchemica is channeled to
  /// @param _lastChanneled The last time alchemica was channeled in this _realmId
  /// @param _signature Message signature used for backend validation
  function channelAlchemica(
    uint256 _realmId,
    uint256 _gotchiId,
    uint256 _lastChanneled,
    bytes memory _signature
  ) external gameActive {
    AavegotchiDiamond diamond = AavegotchiDiamond(s.aavegotchiDiamond);

    //0 - alchemical channeling
    LibRealm.verifyAccessRight(_realmId, _gotchiId, 0);

    require(_lastChanneled == s.gotchiChannelings[_gotchiId], "AlchemicaFacet: Incorrect last duration");

    //Gotchis can only channel every 24 hrs
    if (s.lastChanneledDay[_gotchiId] == block.timestamp / (60 * 60 * 24)) revert("AlchemicaFacet: Gotchi can't channel yet");
    s.lastChanneledDay[_gotchiId] = block.timestamp / (60 * 60 * 24);

    uint256 altarLevel = InstallationDiamondInterface(s.installationsDiamond).getAltarLevel(s.parcels[_realmId].altarId);

    require(altarLevel > 0, "AlchemicaFacet: Must equip Altar");

    //How often Altars can channel depends on their level
    require(block.timestamp >= s.parcelChannelings[_realmId] + s.channelingLimits[altarLevel], "AlchemicaFacet: Parcel can't channel yet");

    //Use _lastChanneled to ensure that each signature hash is unique
    require(
      LibSignature.isValid(keccak256(abi.encodePacked(_realmId, _gotchiId, _lastChanneled)), _signature, s.backendPubKey),
      "AlchemicaFacet: Invalid signature"
    );

    (uint256 rate, uint256 radius) = InstallationDiamondInterface(s.installationsDiamond).spilloverRateAndRadiusOfId(s.parcels[_realmId].altarId);

    require(rate > 0, "InstallationFacet: Spillover Rate cannot be 0");

    uint256[4] memory channelAmounts = [uint256(20e18), uint256(10e18), uint256(5e18), uint256(2e18)];
    // apply kinship modifier
    uint256 kinship = diamond.kinship(_gotchiId) * 10000;
    for (uint256 i; i < 4; i++) {
      uint256 kinshipModifier = floorSqrt(kinship / 50);
      channelAmounts[i] = (channelAmounts[i] * kinshipModifier) / 100;
    }

    for (uint256 i; i < channelAmounts.length; i++) {
      IERC20Mintable alchemica = IERC20Mintable(s.alchemicaAddresses[i]);

      //Mint new tokens if the Great Portal Balance is less than capacity

      if (alchemica.balanceOf(address(this)) < s.greatPortalCapacity[i]) {
        TransferAmounts memory amounts = calculateTransferAmounts(channelAmounts[i], rate);

        alchemica.mint(alchemicaRecipient(_gotchiId), amounts.owner);
        alchemica.mint(address(this), amounts.spill);
      } else {
        TransferAmounts memory amounts = calculateTransferAmounts(channelAmounts[i], rate);

        alchemica.transfer(alchemicaRecipient(_gotchiId), amounts.owner);
      }
    }

    //update latest channeling
    s.gotchiChannelings[_gotchiId] = block.timestamp;
    s.parcelChannelings[_realmId] = block.timestamp;

    emit ChannelAlchemica(_realmId, _gotchiId, channelAmounts, rate, radius);
  }

  /// @notice Return the last timestamp of a channeling
  /// @dev used as a parameter in channelAlchemica
  /// @param _gotchiId Identifier of parent ERC721 aavegotchi
  /// @return last channeling timestamp
  function getLastChanneled(uint256 _gotchiId) public view returns (uint256) {
    return s.gotchiChannelings[_gotchiId];
  }

  /// @notice Return the last timestamp of an altar channeling
  /// @dev used as a parameter in channelAlchemica
  /// @param _parcelId Identifier of ERC721 parcel
  /// @return last channeling timestamp
  function getParcelLastChanneled(uint256 _parcelId) public view returns (uint256) {
    return s.parcelChannelings[_parcelId];
  }

  /// @notice Helper function to batch transfer alchemica
  /// @param _targets Array of target addresses
  /// @param _amounts Nested array of amounts to transfer.
  /// @dev The inner array element order for _amounts is FUD, FOMO, ALPHA, KEK
  function batchTransferAlchemica(address[] calldata _targets, uint256[4][] calldata _amounts) external {
    require(_targets.length == _amounts.length, "AlchemicaFacet: Mismatched array lengths");

    IERC20Mintable[4] memory alchemicas = [
      IERC20Mintable(s.alchemicaAddresses[0]),
      IERC20Mintable(s.alchemicaAddresses[1]),
      IERC20Mintable(s.alchemicaAddresses[2]),
      IERC20Mintable(s.alchemicaAddresses[3])
    ];

    for (uint256 i = 0; i < _targets.length; i++) {
      for (uint256 j = 0; j < _amounts[i].length; j++) {
        if (_amounts[i][j] > 0) {
          alchemicas[j].transferFrom(msg.sender, _targets[i], _amounts[i][j]);
        }
      }
    }
  }

  /// @notice Helper function to batch transfer alchemica to Aavegotchis
  /// @param _gotchiIds Array of Gotchi IDs
  /// @param _tokenAddresses Array of tokens to transfer
  /// @param _amounts Nested array of amounts to transfer.
  function batchTransferTokensToGotchis(
    uint256[] calldata _gotchiIds,
    address[] calldata _tokenAddresses,
    uint256[][] calldata _amounts
  ) external {
    require(_gotchiIds.length == _amounts.length, "AlchemicaFacet: Mismatched array lengths");

    for (uint256 i = 0; i < _gotchiIds.length; i++) {
      for (uint256 j = 0; j < _amounts[i].length; j++) {
        require(_tokenAddresses.length == _amounts[i].length, "RealmFacet: Mismatched array lengths");
        uint256 amount = _amounts[i][j];
        if (amount > 0) {
          IERC20(_tokenAddresses[j]).transferFrom(msg.sender, alchemicaRecipient(_gotchiIds[i]), amount);
        }
      }
    }
  }

  /// @notice Owner function to change the altars channeling limits
  /// @param _altarLevel Array of altars level
  /// @param _limits Array of time limits
  function setChannelingLimits(uint256[] calldata _altarLevel, uint256[] calldata _limits) external onlyOwner {
    require(_altarLevel.length == _limits.length, "AlchemicaFacet: array mismatch");
    for (uint256 i; i < _limits.length; i++) {
      s.channelingLimits[_altarLevel[i]] = _limits[i];
    }
  }

  /// @notice Calculate the floor square root of a number
  /// @param n Input number
  function floorSqrt(uint256 n) internal pure returns (uint256) {
    unchecked {
      if (n > 0) {
        uint256 x = n / 2 + 1;
        uint256 y = (x + n / x) / 2;
        while (x > y) {
          x = y;
          y = (x + n / x) / 2;
        }
        return x;
      }
      return 0;
    }
  }
}
