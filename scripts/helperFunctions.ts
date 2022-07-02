import { BigNumber, Signer, Contract, Wallet, Signature } from "ethers";
import { ethers } from "ethers";

import { Domain, PERMIT_TYPES } from "../constants";
import { HardhatEthersHelpers, Network } from "hardhat/types";
import { LedgerSigner } from "@anders-t/ethers-ledger";

export const gasPrice = 75000000000;

export async function getDiamondSigner(
  diamondAddress: string,
  ethers: HardhatEthersHelpers,
  network: string,
  useLedger: boolean
): Promise<LedgerSigner | Signer> {
  if (network === "mumbai") {
    return await ethers.getSigners()[0];
  } else if (network === "hardhat") {
    return ethers.provider.getSigner(
      await diamondOwner(diamondAddress, ethers)
    );
  } else {
    if (useLedger) return new LedgerSigner(ethers.provider, "m/44'/60'/2'/0/0");
    else return await ethers.getSigners()[0];
  }
}

export async function impersonate(
  address: string,
  contract: any,
  ethers: any,
  network: Network
) {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
  let signer = await ethers.getSigner(address);
  contract = contract.connect(signer);
  return contract;
}

export async function resetChain(hre: any) {
  await hre.network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: process.env.MATIC_URL,
        },
      },
    ],
  });
}

export function getSelectors(contract: Contract) {
  const signatures = Object.keys(contract.interface.functions);
  const selectors = signatures.reduce((acc: string[], val: string) => {
    if (val !== "init(bytes)") {
      acc.push(contract.interface.getSighash(val));
    }
    return acc;
  }, []);
  return selectors;
}

export function getSighashes(selectors: string[], ethers: any): string[] {
  if (selectors.length === 0) return [];
  const sighashes: string[] = [];
  selectors.forEach((selector) => {
    if (selector !== "") sighashes.push(getSelector(selector, ethers));
  });
  return sighashes;
}

export function getSelector(func: string, ethers: any) {
  const abiInterface = new ethers.utils.Interface([func]);
  return abiInterface.getSighash(ethers.utils.Fragment.from(func));
}

export const kovanDiamondAddress = "0xa37D0c085121B6b7190A34514Ca28fC15Bb4dc22";
export const maticAavegotchiDiamondAddress =
  "0x86935F11C86623deC8a25696E1C19a8659CbF95d";
export const aavegotchiDAOAddress =
  "0xb208f8BB431f580CC4b216826AFfB128cd1431aB";
export const pixelcraftAddress = "0xD4151c984e6CF33E04FFAAF06c3374B2926Ecc64";

export async function diamondOwner(address: string, ethers: any) {
  return await (await ethers.getContractAt("OwnershipFacet", address)).owner();
}

export async function mineBlocks(ethers: any, count: number) {
  //convert to hex and handle invalid leading 0 problem
  const number = ethers.utils.hexlify(count).replace("0x0", "0x");
  await ethers.provider.send("hardhat_mine", [number]);
}

export async function createDomain(token: Contract): Promise<Domain> {
  const domain = {
    name: await token.name(),
    version: "1",
    chainId: 137,
    verifyingContract: token.address,
  };
  return domain;
}

export async function permit(
  token: Contract,
  owner: Wallet,
  spender: string,
  value: BigNumber,
  nonce: BigNumber,
  deadline: BigNumber
) {
  const sig = await permitRSV(
    owner,
    spender,
    value,
    nonce,
    deadline,
    await createDomain(token)
  );
  return await token
    .connect(owner)
    .permit(
      await owner.getAddress(),
      spender,
      value,
      deadline,
      sig.v,
      sig.r,
      sig.s
    );
}

export async function permitRSV(
  owner: Wallet,
  spender: string,
  value: BigNumber,
  nonce: BigNumber,
  deadline: BigNumber,
  domain: Domain
) {
  const message = {
    owner: await owner.getAddress(),
    spender: spender,
    value: value,
    nonce: nonce,
    deadline: deadline,
  };

  const result = await owner._signTypedData(domain, PERMIT_TYPES, message);
  let sig: Signature = ethers.utils.splitSignature(result);

  return sig;
}
