/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC721Facet, ERC721FacetInterface } from "../ERC721Facet";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_approved",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "approved_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "approved_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "tokenIdsOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds_",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "totalSupply_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611187806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80636352211e11610097578063a22cb46511610066578063a22cb46514610263578063b88d4fde14610276578063c87b56dd14610289578063e985e9c51461029c57600080fd5b80636352211e146101d057806370a08231146101f957806395d89b41146102225780639e59e5981461024357600080fd5b806318160ddd116100d357806318160ddd1461018557806323b872dd1461019757806342842e0e146101aa5780634f6ccce7146101bd57600080fd5b806306fdde03146100fa578063081812fc14610145578063095ea7b314610170575b600080fd5b60408051808201909152601881527f476f746368697665727365205245414c4d2050617263656c000000000000000060208201525b60405161013c9190610dde565b60405180910390f35b610158610153366004610df8565b6102e8565b6040516001600160a01b03909116815260200161013c565b61018361017e366004610e2d565b610389565b005b6000545b60405190815260200161013c565b6101836101a5366004610e57565b6104aa565b6101836101b8366004610e57565b6104c8565b6101896101cb366004610df8565b6104fc565b6101586101de366004610df8565b6000908152600460205260409020546001600160a01b031690565b610189610207366004610e93565b6001600160a01b031660009081526003602052604090205490565b6040805180820190915260058152645245414c4d60d81b602082015261012f565b610256610251366004610e93565b6105aa565b60405161013c9190610eae565b610183610271366004610ef2565b6105bb565b610183610284366004610f2e565b610639565b61012f610297366004610df8565b61069c565b6102d86102aa366004610fc9565b6001600160a01b03918216600090815260086020908152604080832093909416825291909152205460ff1690565b604051901515815260200161013c565b6000818152600460205260408120546001600160a01b031661036d5760405162461bcd60e51b815260206004820152603360248201527f41617665676f7463686946616365743a20746f6b656e496420697320696e76616044820152721b1a59081bdc881a5cc81b9bdd081bdddb9959606a1b60648201526084015b60405180910390fd5b506000908152600960205260409020546001600160a01b031690565b6000818152600460205260408120546001600160a01b0316906103aa6106c0565b9050806001600160a01b0316826001600160a01b031614806103f157506001600160a01b0380831660009081526008602090815260408083209385168352929052205460ff165b61044d5760405162461bcd60e51b815260206004820152602760248201527f4552433732313a204e6f74206f776e6572206f72206f70657261746f72206f66604482015266103a37b5b2b71760c91b6064820152608401610364565b60008381526009602052604080822080546001600160a01b0319166001600160a01b0388811691821790925591518693918616917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a450505050565b60006104b46106c0565b90506104c28185858561071d565b50505050565b60006104d26106c0565b90506104e08185858561071d565b6104c28185858560405180602001604052806000815250610a7e565b60008054821061056c5760405162461bcd60e51b815260206004820152603560248201527f41617665676f7463686946616365743a205f696e64657820697320677265617460448201527432b9103a3430b7103a37ba30b61039bab838363c9760591b6064820152608401610364565b600080548390811061058057610580610ffc565b6000918252602090912060088204015460079091166004026101000a900463ffffffff1692915050565b60606105b582610b82565b92915050565b60006105c56106c0565b6001600160a01b03818116600081815260086020908152604080832094891680845294825291829020805460ff19168815159081179091559151918252939450919290917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b60006106436106c0565b90506106518187878761071d565b6106948187878787878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610a7e92505050565b505050505050565b60606105b560405180606001604052806026815260200161112c6026913983610c76565b60003330141561071757600080368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050503601516001600160a01b0316915061071a9050565b50335b90565b60006001600160a01b0383166107805760405162461bcd60e51b815260206004820152602260248201527f45523732313a2043616e2774207472616e7366657220746f2030206164647265604482015261737360f01b6064820152608401610364565b60008281526004820160205260409020546001600160a01b0316806107ff5760405162461bcd60e51b815260206004820152602f60248201527f4552433732313a20496e76616c696420746f6b656e4964206f722063616e277460448201526e081899481d1c985b9cd9995c9c9959608a1b6064820152608401610364565b806001600160a01b0316866001600160a01b0316148061084657506001600160a01b0380821660009081526008840160209081526040808320938a168352929052205460ff165b8061086c575060008381526009830160205260409020546001600160a01b038781169116145b6108d35760405162461bcd60e51b815260206004820152603260248201527f41617665676f7463686946616365743a204e6f74206f776e6572206f72206170604482015271383937bb32b2103a37903a3930b739b332b960711b6064820152608401610364565b806001600160a01b0316856001600160a01b0316146109485760405162461bcd60e51b815260206004820152602b60248201527f4552433732313a205f66726f6d206973206e6f74206f776e65722c207472616e60448201526a1cd9995c8819985a5b195960aa1b6064820152608401610364565b6000838152600483016020908152604080832080546001600160a01b0319166001600160a01b03898116919091179091558816835260038501909152812080549161099283611028565b90915550506001600160a01b038416600090815260038301602052604081208054916109bd8361103f565b909155505060008381526009830160205260409020546001600160a01b031615610a3557600083815260098301602052604080822080546001600160a01b0319169055518491906001600160a01b038416907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925908390a45b82846001600160a01b0316866001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b823b801561069457604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610ab890899089908890889060040161105a565b602060405180830381600087803b158015610ad257600080fd5b505af1158015610ae6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0a9190611097565b6001600160e01b031916630a85bd0160e11b146106945760405162461bcd60e51b815260206004820152603060248201527f41617665676f7463686946616365743a205472616e736665722072656a65637460448201526f65642f6661696c6564206279205f746f60801b6064820152608401610364565b60008054606091908067ffffffffffffffff811115610ba357610ba36110c1565b604051908082528060200260200182016040528015610bcc578160200160208202803683370190505b5092506000805b82811015610c6b576000846000018281548110610bf257610bf2610ffc565b6000918252602080832060088304015463ffffffff6004600790941684026101000a9091041680845291880190526040909120549091506001600160a01b039081169088161415610c625780868481518110610c5057610c50610ffc565b60209081029190910101526001909201915b50600101610bd3565b508352509092915050565b60608082610ca65783604051602001610c8f91906110d7565b6040516020818303038152906040529150506105b5565b8260005b8115610cbe57600101600a82049150610caa565b8067ffffffffffffffff811115610cd757610cd76110c1565b6040519080825280601f01601f191660200182016040528015610d01576020820181803683370190505b50925084915060001981015b8215610d5857600a830660300160f81b84828060019003935081518110610d3657610d36610ffc565b60200101906001600160f81b031916908160001a905350600a83049250610d0d565b5050508381604051602001610d6e9291906110fc565b60405160208183030381529060405291505092915050565b60005b83811015610da1578181015183820152602001610d89565b838111156104c25750506000910152565b60008151808452610dca816020860160208601610d86565b601f01601f19169290920160200192915050565b602081526000610df16020830184610db2565b9392505050565b600060208284031215610e0a57600080fd5b5035919050565b80356001600160a01b0381168114610e2857600080fd5b919050565b60008060408385031215610e4057600080fd5b610e4983610e11565b946020939093013593505050565b600080600060608486031215610e6c57600080fd5b610e7584610e11565b9250610e8360208501610e11565b9150604084013590509250925092565b600060208284031215610ea557600080fd5b610df182610e11565b6020808252825182820181905260009190848201906040850190845b81811015610ee657835183529284019291840191600101610eca565b50909695505050505050565b60008060408385031215610f0557600080fd5b610f0e83610e11565b915060208301358015158114610f2357600080fd5b809150509250929050565b600080600080600060808688031215610f4657600080fd5b610f4f86610e11565b9450610f5d60208701610e11565b935060408601359250606086013567ffffffffffffffff80821115610f8157600080fd5b818801915088601f830112610f9557600080fd5b813581811115610fa457600080fd5b896020828501011115610fb657600080fd5b9699959850939650602001949392505050565b60008060408385031215610fdc57600080fd5b610fe583610e11565b9150610ff360208401610e11565b90509250929050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60008161103757611037611012565b506000190190565b600060001982141561105357611053611012565b5060010190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061108d90830184610db2565b9695505050505050565b6000602082840312156110a957600080fd5b81516001600160e01b031981168114610df157600080fd5b634e487b7160e01b600052604160045260246000fd5b600082516110e9818460208701610d86565b600360fc1b920191825250600101919050565b6000835161110e818460208801610d86565b835190830190611122818360208801610d86565b0194935050505056fe68747470733a2f2f61617665676f746368692e636f6d2f6d657461646174612f7265616c6d2fa2646970667358221220ca1495a636ef697c9fb3a49ec59178471162a82caa1e3895ed9e6adac0c2c10e64736f6c63430008090033";

export class ERC721Facet__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721Facet> {
    return super.deploy(overrides || {}) as Promise<ERC721Facet>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC721Facet {
    return super.attach(address) as ERC721Facet;
  }
  connect(signer: Signer): ERC721Facet__factory {
    return super.connect(signer) as ERC721Facet__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721FacetInterface {
    return new utils.Interface(_abi) as ERC721FacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Facet {
    return new Contract(address, _abi, signerOrProvider) as ERC721Facet;
  }
}
