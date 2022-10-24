import { Component, OnInit } from '@angular/core';
import { Contract, ContractInterface, ethers } from 'ethers';
import { AbiService } from '../abi.service';
import { AuthService } from '../auth.service';
// import { abi as LotteryABI } from "/home/leo/Eth_Dev/Encode/week5/weekendProject/my-app/src/assets/Lottery.json";
// import { abi as TokenABI } from "/home/leo/Eth_Dev/Encode/week5/weekendProject/my-app/src/assets/LotteryToken.json";
// import * as LotteryABI from "/home/leo/Eth_Dev/Encode/week5/weekendProject/my-app/src/assets/Lottery.json";
// import * as TokenABI from "/home/leo/Eth_Dev/Encode/week5/weekendProject/my-app/src/assets/LotteryToken.json";

// logic that serves component xref lesson16 48:20
// ng generate service [name] from angular docs
// see abi.service.ts file
// import ABIs into service
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  // define types for variables used
  TOKEN_CONTRACT_ADDRESS: string;
  LOTTERY_CONTRACT_ADDRESS: string;
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  etherBalance: string;
  provider: any;
  tokenContract: Contract;
  lotteryContract: Contract;
  tokenTotalSupply: string;
  lotteryAddress: string;
  tokenAddress: string;
  // betsAreOpen: string;
  public ethereum;
  walletId: any;
  signer: any;


  constructor(private abiService: AbiService, private authService: AuthService) {
    this.TOKEN_CONTRACT_ADDRESS = "0x651Fb8e9FEa375800b3eF5368BE6b32a95Cf5859";
    this.LOTTERY_CONTRACT_ADDRESS = "0x1e443d54370152f75E556e7B8b91c5Fb5b523B6b";
    this.tokenTotalSupply = 'Loading...'; 
    this.walletAddress = 'Loading...';
    this.etherBalance = 'Loading...';
    this.ethereum = (window as any).ethereum;
    // this.provider = ethers.getDefaultProvider("goerli");
    this.provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
    // https://stackoverflow.com/questions/60785630/how-to-connect-ethers-js-with-metamask
    this.tokenContract = new ethers.Contract(this.TOKEN_CONTRACT_ADDRESS, this.abiService.tokenAbi.abi, this.provider);
    this.lotteryContract = new ethers.Contract(this.LOTTERY_CONTRACT_ADDRESS, this.abiService.lotteryAbi.abi, this.provider);
    this.lotteryAddress = this.lotteryContract.address;
    this.tokenAddress = this.tokenContract.address;
    // this.betsAreOpen = String(this.lotteryContract.betsOpen());
   };

  ngOnInit(): void {
    this.ethersSetup().then(()=> {
        console.log("ethers setup")
    })
    // this.authService
    //   .checkWalletConnected()
    //   .then((accounts) => (this.walletId = accounts[0]));
    // this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();

    this.walletAddress = this.signer.address;
    console.log(`This wallet address: ${this.walletAddress}`);
    this.provider.getBalance(this.walletAddress).then((balanceBN: ethers.BigNumberish) => {
      console.log("big number inbound");
      this.etherBalance = ethers.utils.formatEther(balanceBN) + "ETH";
    });
    // this.betsAreOpen = this.lotteryContract.betsOpen();
    // this.lotteryContract['betsOpen'].then((_betsOpen: any) => {
    //   this.betsAreOpen = String(_betsOpen);
    // });
    // console.log(`BETS OPEN: ${this.betsAreOpen}`);

  }

  getWalletFromMetamask() {
    this.authService.connectWallet();
    // this.wallet = ethers.Wallet.createRandom();
    // this.walletAddress = this.wallet.address;
  }

  async ethersSetup() {
    await this.provider.send("eth_requestAccounts", []);
    this.signer = this.provider.getSigner();
    console.log("Account: ", await this.signer.getAddress());
  }

}