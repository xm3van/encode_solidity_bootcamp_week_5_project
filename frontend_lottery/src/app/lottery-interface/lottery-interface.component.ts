import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { ethers } from 'ethers';
import { environment } from '../../environments/environment';
import * as LOTTERY_DATA from '../../assets/Lottery.json';
import * as TOKEN_DATA from '../../assets/LotteryToken.json';


let TOKEN_JSON = TOKEN_DATA;
let LOTTERY_JSON = LOTTERY_DATA;
const CONTRACT_ADDRESS = '0x1e443d54370152f75E556e7B8b91c5Fb5b523B6b';
const TOKEN_ADDRESS = '0x651Fb8e9FEa375800b3eF5368BE6b32a95Cf5859';

// forms 


@Component({
  selector: 'app-lottery-interface',
  templateUrl: './lottery-interface.component.html',
  styleUrls: ['./lottery-interface.component.scss']
})

export class LotteryInterfaceComponent implements OnInit {

  // variables 
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  etherBalance: String;
  tokenBalance: String;
  signer: ethers.Signer | undefined;
  provider: ethers.providers.BaseProvider;
  tokenContract: ethers.Contract | undefined;
  lotteryContract: ethers.Contract | undefined;
  lotteryClosingTimeDate: Date | undefined;
  lotteryState: Boolean | undefined;
  currentBlockDate: Date | undefined;
  closingTimeDate: Date | undefined;
  lotteryClosingReceipt: String | undefined;
  tokenPurchaseReceipt: String | undefined;

  // forms 
  tokenPurchaseForm = this.fb.group({
    amount: ['']
  })


  constructor(private fb: FormBuilder) {
    const options = {
      alchemy: environment.ALCHEMY_API_KEY,
      infura: environment.INFURA_API_KEY,
    };

    // wallet prep
    this.walletAddress = "Loading";
    this.etherBalance = "Loading";
    this.tokenBalance = "Loading";

    // set up signer

    this.provider = ethers.getDefaultProvider("goerli", options);
  }

  ngOnInit(): void {

    this.wallet = new ethers.Wallet(environment.PRIVATE_KEY, this.provider);
    this.signer = this.wallet.connect(this.provider);
    this.walletAddress = this.wallet.address;

    // connect to contract 
    this.lotteryContract = new ethers.Contract(CONTRACT_ADDRESS, LOTTERY_JSON.abi, this.signer) // make sure LOTTERY_API works
    this.tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_JSON.abi, this.signer) // make sure LOTTERY_API 

    this.wallet.getBalance().then((balanceBn) => {
      this.etherBalance = ethers.utils.formatEther(balanceBn) + ' ETH'
    });
  }

  // Token balance 

  // @Suggestion: I think this information should always be visual
  async checkState(this: any) {
    // Boolean
    this.lotteryState = this.lotteryContract.betsOpen();

    // last block 
    const currentBlock = await this.provider.getBlock("latest");
    this.currentBlockDate = new Date(currentBlock.timestamp * 1000);

    // closing date
    const closingTime = await this.lotteryContract.betsClosingTime();
    this.closingTimeDate = new Date(closingTime.toNumber() * 1000);
  }

  async TokenBalanceConnected(this: any) {
    const balanceBn = await this.tokenContract.balanceOf(this.signer.address)
    this.tokenBalance = ethers.utils.formatEther(balanceBn) + ' Token'
  }

  async closeLottery(this: any) {
    const tx = await this.lotteryContract.connect(this.signer).closeLottery();
    const receipt = await tx.wait();
    this.lotteryClosingReceipt = receipt.transactionHash
  }

  async buyTokens(this: any) {
    const body = {
      amount: this.tokenPurchaseForm.value.amount
    };
    const tx = await this.lotteryContract.purchaseTokens({
      value: ethers.utils.parseEther(body.amount),
    });
    const receipt = await tx.wait();
    this.tokenPurchaseReceipt = receipt.transactionHash;
  }

}




// @User component // Always display  //done
// async function displayTokenBalance(index: string) {
//   const balanceBN = await token.balanceOf(accounts[Number(index)].address);
//   const balance = ethers.utils.formatEther(balanceBN);
//   console.log(
//     `The account of address ${accounts[Number(index)].address
//     } has ${balance} Tokens\n`
//   );
// }

// @User component
// async function bet(index: string, amount: string) {
//   const allowTx = await token
//     .connect(accounts[Number(index)])
//     .approve(contract.address, ethers.constants.MaxUint256);
//   await allowTx.wait();
//   const tx = await contract.connect(accounts[Number(index)]).betMany(amount);
//   const receipt = await tx.wait();
//   console.log(`Bets placed (${receipt.transactionHash})\n`);
// }

// User or owner 
// async function closeLottery() {
//   const tx = await contract.closeLottery();
//   const receipt = await tx.wait();
//   console.log(`Bets closed (${receipt.transactionHash})\n`);
// }

// @ User Componet
// async function displayPrize(index: string): Promise<string> {
//   const prizeBN = await contract.prize(accounts[Number(index)].address);
//   const prize = ethers.utils.formatEther(prizeBN);
//   console.log(
//     `The account of address ${accounts[Number(index)].address
//     } has earned a prize of ${prize} Tokens\n`
//   );
//   return prize;
// }

// @User components 
// async function claimPrize(index: string, amount: string) {
//   const tx = await contract
//     .connect(accounts[Number(index)])
//     .prizeWithdraw(ethers.utils.parseEther(amount));
//   const receipt = await tx.wait();
//   console.log(`Prize claimed (${receipt.transactionHash})\n`);
// }


// @Suggestion: Admin component
// async function displayOwnerPool() {
//   const balanceBN = await contract.ownerPool();
//   const balance = ethers.utils.formatEther(balanceBN);
//   console.log(`The owner pool has (${balance}) Tokens \n`);
// }

// @Admin
// async function withdrawTokens(amount: string) {
//   const tx = await contract.ownerWithdraw(ethers.utils.parseEther(amount));
//   const receipt = await tx.wait();
//   console.log(`Withdraw confirmed (${receipt.transactionHash})\n`);
// }

// @Suggestion: Owner fornent separate component - Admin 
// async openBets(duration: string) {
//   const currentBlock = await this.provider.getBlock("latest");
//   const tx = await this.lotteryContract.connect(this.signer).openBets(currentBlock.timestamp + Number(duration));
//   const receipt = await tx.wait();
//   console.log(`Bets opened (${receipt.transactionHash})`);
// }


// async function burnTokens(index: string, amount: string) {
//   const allowTx = await token
//     .connect(accounts[Number(index)])
//     .approve(contract.address, ethers.constants.MaxUint256);
//   const receiptAllow = await allowTx.wait();
//   console.log(`Allowance confirmed (${receiptAllow.transactionHash})\n`);
//   const tx = await contract
//     .connect(accounts[Number(index)])
//     .returnTokens(ethers.utils.parseEther(amount));
//   const receipt = await tx.wait();
//   console.log(`Burn confirmed (${receipt.transactionHash})\n`);
// }

// }