import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

// (window as any) gets around typechecking!

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public ethereum;
  constructor() {
    this.ethereum = window.ethereum;
  }

  startApp(provider: any) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    console.log(`provider: ${(JSON.stringify(provider))}`);
    console.log(`this.ethereum: ${JSON.stringify(this.ethereum)}`)
    if (provider !== this.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }
    // Access the decentralized web!
    console.log("We're in!");
  }


  public connectWallet = async () => {
    this.ethereum = window.ethereum;
    if (typeof window != "undefined") {
      try {
        const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts"});
        console.log(accounts[0]);
      } catch(err) {
        console.error((err as any).message);
      }
    } else {
      console.log("pls install MM");
    }
  };

  // public checkWalletConnected = async () => {
  //   try {
  //     if (!this.ethereum) return alert('Please install Metamask');
  //     const accounts = await this.ethereum.request({ method: 'eth_accounts' });
  //     return accounts;
  //   } catch (e) {
  //     throw new Error('Error getting accounts from Metamask');
  //   }
  // };
}