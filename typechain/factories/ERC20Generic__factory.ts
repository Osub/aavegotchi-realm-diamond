/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC20Generic, ERC20GenericInterface } from "../ERC20Generic";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
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
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "remaining",
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
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "view",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
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
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060408051808201909152600d8082526c047656e6572696320455243323609c1b602090920191825261004591600091610085565b5060408051808201909152600580825264047454e32360dc1b602090920191825261007291600191610085565b506002805460ff19166012179055610159565b8280546100919061011e565b90600052602060002090601f0160209004810192826100b357600085556100f9565b82601f106100cc57805160ff19168380011785556100f9565b828001600101855582156100f9579182015b828111156100f95782518255916020019190600101906100de565b50610105929150610109565b5090565b5b80821115610105576000815560010161010a565b600181811c9082168061013257607f821691505b6020821081141561015357634e487b7160e01b600052602260045260246000fd5b50919050565b61084e806101686000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806370a082311161006657806370a082311461012d57806395d89b411461014d578063a0712d6814610155578063a9059cbb1461016a578063dd62ed3e1461017d57600080fd5b806306fdde03146100a3578063095ea7b3146100c157806318160ddd146100e457806323b872dd146100fb578063313ce5671461010e575b600080fd5b6100ab6101b6565b6040516100b89190610653565b60405180910390f35b6100d46100cf3660046106c4565b610244565b60405190151581526020016100b8565b6100ed60035481565b6040519081526020016100b8565b6100d46101093660046106ee565b6102b0565b60025461011b9060ff1681565b60405160ff90911681526020016100b8565b6100ed61013b36600461072a565b60046020526000908152604090205481565b6100ab6104f6565b61016861016336600461074c565b610503565b005b6100d46101783660046106c4565b61054b565b6100ed61018b366004610765565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205490565b600080546101c390610798565b80601f01602080910402602001604051908101604052809291908181526020018280546101ef90610798565b801561023c5780601f106102115761010080835404028352916020019161023c565b820191906000526020600020905b81548152906001019060200180831161021f57829003601f168201915b505050505081565b3360008181526005602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061029f9086815260200190565b60405180910390a350600192915050565b6001600160a01b03831660009081526004602052604081205482111561032c5760405162461bcd60e51b815260206004820152602660248201527f7472616e7366657246726f6d3a205f66726f6d2062616c616e636520697320746044820152656f6f206c6f7760d01b60648201526084015b60405180910390fd5b6001600160a01b0384166000908152600560209081526040808320338452909152902054821115806103665750336001600160a01b038516145b6103d85760405162461bcd60e51b815260206004820152603860248201527f7472616e7366657246726f6d3a206d73672e73656e64657220616c6c6f77616e60448201527f63652077697468205f66726f6d20697320746f6f206c6f7700000000000000006064820152608401610323565b336001600160a01b0385161461043c576001600160a01b03841660009081526005602090815260408083203384529091529020546104179083906107e9565b6001600160a01b03851660009081526005602090815260408083203384529091529020555b6001600160a01b0384166000908152600460205260409020546104609083906107e9565b6001600160a01b038086166000908152600460205260408082209390935590851681522054610490908390610800565b6001600160a01b0380851660008181526004602052604090819020939093559151908616907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906104e49086815260200190565b60405180910390a35060019392505050565b600180546101c390610798565b3360009081526004602052604090205461051e908290610800565b3360009081526004602052604081209190915560038054839290610543908490610800565b909155505050565b336000908152600460205260408120548211156105ba5760405162461bcd60e51b815260206004820152602760248201527f7472616e736665723a206d73672e73656e6465722062616c616e636520697320604482015266746f6f206c6f7760c81b6064820152608401610323565b336000908152600460205260409020546105d59083906107e9565b33600090815260046020526040808220929092556001600160a01b03851681522054610602908390610800565b6001600160a01b0384166000818152600460205260409081902092909255905133907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061029f9086815260200190565b600060208083528351808285015260005b8181101561068057858101830151858201604001528201610664565b81811115610692576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146106bf57600080fd5b919050565b600080604083850312156106d757600080fd5b6106e0836106a8565b946020939093013593505050565b60008060006060848603121561070357600080fd5b61070c846106a8565b925061071a602085016106a8565b9150604084013590509250925092565b60006020828403121561073c57600080fd5b610745826106a8565b9392505050565b60006020828403121561075e57600080fd5b5035919050565b6000806040838503121561077857600080fd5b610781836106a8565b915061078f602084016106a8565b90509250929050565b600181811c908216806107ac57607f821691505b602082108114156107cd57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000828210156107fb576107fb6107d3565b500390565b60008219821115610813576108136107d3565b50019056fea26469706673582212201a491a9756dff246bd786a77007c32360261d10e30fc3d778a9f166dc2bddc7c64736f6c63430008090033";

export class ERC20Generic__factory extends ContractFactory {
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
  ): Promise<ERC20Generic> {
    return super.deploy(overrides || {}) as Promise<ERC20Generic>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC20Generic {
    return super.attach(address) as ERC20Generic;
  }
  connect(signer: Signer): ERC20Generic__factory {
    return super.connect(signer) as ERC20Generic__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20GenericInterface {
    return new utils.Interface(_abi) as ERC20GenericInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20Generic {
    return new Contract(address, _abi, signerOrProvider) as ERC20Generic;
  }
}
