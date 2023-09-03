'use client'

import { useState } from 'react';

import {
  SearchNormal1
} from "iconsax-react";
import { useMutation } from "@apollo/client";
import { operations } from "../../../utils/api/graphql";
import {signTransaction , SignTransactionOptions,BitcoinNetworkType } from 'sats-connect'

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
  const [showLockModal, setshowLockModal] = useState(false);
  const [showBroadcastModal , setshowBroadcastModal] = useState(false)
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
            console.log(escrowId)
          },
          onCancel: () => alert('Canceled'),
        }
        
        await signTransaction(signPsbtOptions);

        
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
    const escrow :any = {
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
              meta: { amount: "2306" }, 
              node: {
                id: "0ee648bc7d9b1624c8509f286659392f94b7568e67642a24380f553054ebb80c",
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

    createEscrow({
      variables : {
        data : escrow,
      }
    })
  setshowBroadcastModal(true)
  setshowLockModal(false)

	
  }

  const handleBroadcast = async()=>{
    broadcastEscrow({
      variables : {
        data : {
        id:"escrowId",
        transactions : [
          {
            base64 : "base64Signed" 
          }
        ]
        }
      }
    })
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
		<button className="h-11 bg-warning-500 text-white rounded-lg px-8 font-semibold text-sm w-[148px]" onClick={(e)=>handleStaking(e)}>Stake Ordinal</button>
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
