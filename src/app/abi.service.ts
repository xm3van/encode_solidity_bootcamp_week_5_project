import { Injectable } from '@angular/core';
import { Contract, ContractInterface, ethers } from 'ethers';
import * as LotteryABI from "/home/leo/Eth_Dev/Encode/week5/weekendProject/my-app/src/assets/Lottery.json";
import * as TokenABI from "/home/leo/Eth_Dev/Encode/week5/weekendProject/my-app/src/assets/LotteryToken.json";

@Injectable({
  providedIn: 'root'
})
export class AbiService {
  tokenAbi: any;
  lotteryAbi: any;

  constructor() {
    this.tokenAbi = TokenABI;
    this.lotteryAbi = LotteryABI;
   }

}
