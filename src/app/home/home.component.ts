import { Component, OnInit } from '@angular/core';
import { Contract, ContractInterface, ethers } from 'ethers';
import { AbiService } from '../abi.service';
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
  provider: ethers.providers.BaseProvider;
  tokenContract: Contract;
  lotteryContract: Contract;
  tokenTotalSupply: string;
  lotteryAddress: string;
  tokenAddress: string;


  constructor(private abiService: AbiService) {
    this.TOKEN_CONTRACT_ADDRESS = "0x651Fb8e9FEa375800b3eF5368BE6b32a95Cf5859";
    this.LOTTERY_CONTRACT_ADDRESS = "0x1e443d54370152f75E556e7B8b91c5Fb5b523B6b";
    this.tokenTotalSupply = 'Loading...'; 
    this.walletAddress = 'Loading...';
    this.etherBalance = 'Loading...';
    this.provider = ethers.getDefaultProvider("goerli");
    this.tokenContract = new ethers.Contract(this.TOKEN_CONTRACT_ADDRESS, this.abiService.tokenAbi.abi, this.provider);
    this.lotteryContract = new ethers.Contract(this.LOTTERY_CONTRACT_ADDRESS, this.abiService.lotteryAbi.abi, this.provider);
    this.lotteryAddress = this.lotteryContract.address;
    this.tokenAddress = this.tokenContract.address;
   };

  ngOnInit(): void {
    this.wallet = ethers.Wallet.createRandom(); // use random wallet initially,
    // integrate with metamask later
    this.walletAddress = this.wallet.address;
    this.provider.getBalance(this.walletAddress).then((balanceBN) => {
      this.etherBalance = ethers.utils.formatEther(balanceBN) + "ETH";
    });

  }

}
