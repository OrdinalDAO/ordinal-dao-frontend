'use client'

import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { operations } from "../../../utils/api/graphql";
import {signTransaction, SignTransactionOptions,BitcoinNetworkType } from 'sats-connect'
import { ethers } from 'ethers';
import TreasuryJson from "../../../utils/contracts-json/Treasury.json"
import TreasuryAddress from "../../../utils/contracts-json/TreasuryAddress"

import {
  SearchNormal1
} from "iconsax-react";


function Item({item}:{item:any}) {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="p-3 border rounded-lg border-neutral-200 hover:bg-neutral-50 cursor-pointer">
      <div className="relative">
	<input type="checkbox" className="h-4 w-4 absolute left-4 top-4 accent-primary-600 rounded" />
	<img src={item.image} className="rounded-lg"></img>
      </div>
      <div className="flex justify-between pt-4 pb-2 items-center">
	<div className="text-neutral-900 text-base font-bold">{item.name}</div>
	<div className="text-sm text-neutral-600">{item.status}</div>
      </div>
      <div className="text-sm text-neutral-600">Price {item.price} rBTC</div>
    </div>
  )
}

export default function Borrow() {
	const [base64Signed , setbase64] = useState()
	const [escrowId , setEscrowId] = useState()
	const [showLockModal, setshowLockModal] = useState(true);
	const [eligibleAmt , setEligibleAmt] = useState("") // modal-3 eligible to borrow
	const [approxInterest , setApproxInterest] = useState("") // modal-3 interest rate / approx interest
	let signer;// this value need to be imported here
	let ordVal=0.000079
	let borrowAmt=0.000023; // this amount must be selected by the user , less than the eligble amount
	let days = 14; // selected by borrower in modal-3 / borrowing time
	const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryJson.abi, signer);
	const getEligibleAmt = async(e:any)=> // modal-3 eligible to borrow
	{
		e.preventDefault();
		try {
		 let amount = await TreasuryContract.callMaxEligibleAmt(ordVal*10**18);
		 setEligibleAmt(ethers.formatUnits(amount.toString(),18))
		} catch (error) {
		  console.log("Error in fetching eligible amt");
		}
	}
	const getApproxInterest = async(e:any)=> // modal-3 interest rate / approx interest
	{
		e.preventDefault();
		try {
		 let amount = await TreasuryContract.callApproxInterest(borrowAmt*10**18,days);
		 setEligibleAmt(ethers.formatUnits(amount.toString(),18))
		} catch (error) {
		  console.log("Error in fetching approx interest");
		}
	}

	const processLoan = async(e:any)=>{ // modal-4 approve tx
		e.preventDefault();
    try {
      await TreasuryContract.withdraw(borrowAmt * 10 ** 18);
    } catch (error) {
      alert("Error in sending transaction");
    }
	}

	
  const items = [
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
  ];
  const [broadcastEscrow] = useMutation(
    operations.mutations.BROADCAST_ESCROW,
    {
      onCompleted: (data) => {
        console.log("success :>> ", data);
      },
      onError: (error) => {
        console.log("error :>> ", error);
      },
    }
  );
  const [executeEscrow] = useMutation(
    operations.mutations.EXECUTE_ESCROW,
    {
      onCompleted: async(data) => {
        console.log(data.executeEscrow.transactions[0])
        
        const signPsbtOptions:SignTransactionOptions = {
          payload: {
            network: {
              type:BitcoinNetworkType.Testnet
            },
            message: 'Sign Transaction',
            psbtBase64: data.executeEscrow.transactions[0].base64,
            broadcast: false,
            inputsToSign: [
              { 
                address: "tb1pekd7wajtlpu7ncd0mvjvpge9penk8knfl7wcvtwjramv0ve3e39sx023kf", 
                signingIndexes: [0], 
              },
              { 
                address: "2N5NdDEwyAiNBPWL2MNvfvcTxVobJtS5SVy", 
                signingIndexes: [1], 
              }
              ],
          },
          onFinish: (response:any) => {
            setbase64(response.psbtBase64)
            // console.log(escrowId)
          },
          onCancel: () => alert('Canceled'),
        }
        
        await signTransaction(signPsbtOptions);
		console.log(base64Signed)
		console.log(escrowId)
		broadcastEscrow({
			variables : {
			  data : {
			  id:escrowId,
			  transactions : [
				{
				  base64 : base64Signed 
				}
			  ]
			  }
			}
		  })

        
      },
      onError: (error) => {
        console.log("error :>> ", error);
      },
    }
  );
  const [createEscrow, { loading, error }] = useMutation(
    operations.mutations.CREATE_ESCROW,
    {
      onCompleted: (data) => {
        console.log("success :>> ", data);
        setEscrowId(data.createEscrow.id)
        executeEscrow({
          variables : {
            where : {id:data.createEscrow.id}
          }
        })
      },
      onError: (error) => {
        console.log("error :>> ", error);
      },
    }
  );
  const handleStaking = async(e:any)=>{
	e.preventDefault()
	const escrow = {
		startDate: "2023-07-15T22:40:56+01:00",
		endDate: "2023-08-14T21:40:37.658Z",
	
		collateral: {
		  assets: [
			{
			  type: "btc.address", // 
			  content: {
				meta : {amount:"1000"},
				node: {
				  publicKey: "0393cdaf0a037c1cbd571965c188015aa2d517cba01aaa9b445675f6ddee359e9d",
				  value: "2N5NdDEwyAiNBPWL2MNvfvcTxVobJtS5SVy" 
				}
			  },
			  action: { type: "fee" },
			  addresses: [
				{
				  value: "2N5NdDEwyAiNBPWL2MNvfvcTxVobJtS5SVy" ,
				  type: "change",
				  publicKey: "0393cdaf0a037c1cbd571965c188015aa2d517cba01aaa9b445675f6ddee359e9d" 
				}
			  ]
			},
			{
			  type: "btc.utxo",
			  content: {
				meta: { amount: "7113" }, 
				node: {
				  id: "d54741c1007597ff8843e70d2402ea61cb010b258478bbb1bde2ab5375f52a68",
				  sequence: 0,
				  publicKey: "85a8de5c77fef2f6afd8596f6fe1560f556fa6aacd360e4d88492f01cf48886e", 
				  value:"tb1pekd7wajtlpu7ncd0mvjvpge9penk8knfl7wcvtwjramv0ve3e39sx023kf"  
				}
			  },
			  action: {
				configuration: {
				  paths: [
					
					{"fn": "time", 
					"tag": "unlock", 
					"addresses": [{"value": "tb1pekd7wajtlpu7ncd0mvjvpge9penk8knfl7wcvtwjramv0ve3e39sx023kf", "type": "receive"}], "args": ["2023-08-25 17:49:18", "0387d7cc841bd941968e7ed394785b624490a88c579ed14c91c7ec42ef70bfb5d6"]}
				  ]
				},
				type: "lock",
			  },
			  addresses: [
				{  
				  value: "tb1pekd7wajtlpu7ncd0mvjvpge9penk8knfl7wcvtwjramv0ve3e39sx023kf",
				  type: "change",
				  publicKey:"85a8de5c77fef2f6afd8596f6fe1560f556fa6aacd360e4d88492f01cf48886e"
				},
			  ]
			},
		  ],
		},
	  };
	  // api calls

	  createEscrow({
		variables : {
		  data : escrow,
		}
	  })
	  setshowLockModal(true)
  
  }

  
  
  return (
    <>
      <main className="bg-neutral-100 text-neutral-900 p-10">
        <div className="flex flex-col space-y-10 text-black">
	  <div>
	    <div>
              <div className="text-neutral-900 text-2xl font-medium pb-2">Borrow</div>
       	      <div className="text-neutral-600 text-base font-medium">Lock your ordinal, borrow rBTC</div>
	    </div>
	    <div className="flex justify-between pt-6 space-x-6 w-full">
              <div>
		<div className="relative rounded-md shadow-sm">
		  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
		    <span className="text-gray-500 sm:text-sm">
		      <SearchNormal1 size={20} />
		    </span>
		  </div>
		  <input
		    type="text"
		    name="search"
		    className="block w-full rounded-lg border-0 py-1.5 pl-10 pr-20 text-neutral-900 ring-1 ring-inset placeholder:text-gray-500 text-sm h-11 ring-neutral-200 focus:ring-neutral-500 focus:ring-1"
		    placeholder="Search ordinals"
		  />
		</div>
	      </div>
	      <div>
		<button className="h-11 bg-warning-500 text-white rounded-lg px-8 font-semibold text-sm w-[148px]" onClick={e=>handleStaking(e)}>Stake Ordinal</button>
	      </div>
            </div>	    
	    <div className="pt-6">
	      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
		{items.map((item, index) => <Item key={index} item={item} />)}
	      </div>
	    </div>
          </div>
        </div>
      </main>
    </>
  );
}
