'use client'

import { Fragment, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { operations } from "../../../utils/api/graphql";
import {  signTransaction, SignTransactionOptions,BitcoinNetworkType } from 'sats-connect';

import { Dialog, Menu, Transition } from "@headlessui/react"
import { RadioGroup } from "@headlessui/react"

import {
  SearchNormal1,
  CloseCircle,
} from "iconsax-react";

import {classNames} from "@/utils"

function Item({item, clicked}:{item:any, clicked:any}) {  
  return (
    <div className="p-3 border rounded-lg border-neutral-200 hover:bg-neutral-50 cursor-pointer" onClick={() => clicked(item.id)}>
      <div className="relative">
	<input type="checkbox" className="h-4 w-4 absolute left-4 top-4 accent-primary-600 rounded" checked={item.selected} onChange={e => {}}/>
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

function BorrowModal({isOpen, closeModal, items}: {isOpen:boolean, closeModal:any, items:any}) {
  const selectedItems = items.filter((item: any) => item.selected);

  const times = [
    { id: 1, time: "7 Days"},
    { id: 2, time: "14 Days"},
    { id: 3, time: "30 Days"},
    { id: 4, time: "60 Days"},
    { id: 5, time: "144 Days"},
  ]
  const [selectedTime, setSelectedTime] = useState(times[0])

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
	<Dialog as="div" className="relative z-100" onClose={closeModal}>
	  <Transition.Child
	    as={Fragment}
	    enter="ease-out duration-300"
	    enterFrom="opacity-0"
	    enterTo="opacity-100"
	    leave="ease-in duration-200"
	    leaveFrom="opacity-100"
	    leaveTo="opacity-0"
	  >
	    <div className="fixed inset-0 bg-black bg-opacity-25" />
	  </Transition.Child>

	  <div className="fixed inset-0 overflow-y-auto">
	    <div className="flex min-h-full items-center justify-center p-4 text-center">
	      <Transition.Child
		as={Fragment}
		   enter="ease-out duration-300"
		   enterFrom="opacity-0 scale-95"
		   enterTo="opacity-100 scale-100"
		   leave="ease-in duration-200"
		   leaveFrom="opacity-100 scale-100"
		   leaveTo="opacity-0 scale-95"
	      >
		<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
		  <div className="h-[160px] flex justify-center items-center">		      
		    <img src="/assets/nft-example.png" width="112px" height="112px" className="rounded-full" />
		  </div>
		  <div className="p-8">
		    <div className="space-y-6">
		      <div className="flex justify-between text-sm font-medium">
			<div>Ordinal Inscription ID:</div>
			<div>9b5ad40e4bd......6f3i0</div>
		      </div>
		      <div className="flex justify-between text-sm font-medium">
			<div>Ordinal Value:</div>
			<div>0.000079 BTC</div>
		      </div>
		      <div className="flex justify-between text-sm font-medium">
			<div>Eligible to borrow</div>
			<div>0.082rBTC</div>
		      </div>
		      <div className="flex justify-between text-sm font-medium">
			<div>Loan to Value (LTV)</div>
			<div>20%</div>
		      </div>
		      <div className="h-[1px] bg-neutral-200"></div>
		      <div>
			<div className="text-sm font-medium">Select Borrowing time</div>
			<div>
			  <RadioGroup value={selectedTime} onChange={setSelectedTime} className="bg-gray-50 p-1 border-neutral-200 border rounded-lg mt-4">
			    <div className="flex space-x-2 items-center">
			      {times.map((time) => (
				<RadioGroup.Option
				  key={time.id}
				  value={time}
				  className={({ active }) =>
				    classNames(
				      active ? 'bg-warning-500 text-white' : 'bg-neutral-200 text-neutral-600',
				      "flex-1 px-1.5 py-1 border-neutral-200 border rounded-lg cursor-pointer h-7 font-medium"
				    )
				  }
				>
				  {({ checked, active }) => (
				    <RadioGroup.Label as="span" className="flex items-center justify-center text-xs text-center">
				      {time.time}
				    </RadioGroup.Label>
				  )}
				</RadioGroup.Option>
			      ))}
			    </div>
			  </RadioGroup>
			</div>
		      </div>
		      <div className="flex justify-between text-sm font-medium">
			<div>Interest Rate:</div>
			<div>0.0 rBTC</div>
		      </div>
		      <div className="h-[1px] bg-neutral-200"></div>
		      <button className="rounded-lg bg-black text-white font-semibold text-sm h-10 w-full">Submit</button>
		    </div>
		  </div>
		</Dialog.Panel>
	      </Transition.Child>
	    </div>
	  </div>
	</Dialog>
      </Transition>
    </>
  )
}

export default function Borrow() {
  const [canStake, setCanStake] = useState(false);
  
  const [items, setItems] = useState([
    {"id": 1, "name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png", "selected": false},
    {"id": 2, "name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png", "selected": false},
    {"id": 3, "name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png", "selected": false},
    {"id": 4, "name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png", "selected": false},
    {"id": 5, "name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png", "selected": false}
  ]);

  let selectedItems = [];

  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  function itemClicked(id: number){   
    const newItems = items.map((item) => {
      if (id == item.id) {
	item.selected = !item.selected
      }
      return item
    });
    setItems(newItems);
    selectedItems = newItems.filter((item) => item.selected);
    setCanStake(selectedItems.length != 0);
  }

  function onStakeOrdinalButtonClicked(){
    setIsBorrowModalOpen(true)
  }

  const [base64Signed , setbase64] = useState()
  const [escrowId , setEscrowId] = useState()
  const [showLockModal, setshowLockModal] = useState(true);

  function closeBorrowModal(){
    setIsBorrowModalOpen(false)  
  }

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

  const handleSignOrdinal = async(e:any)=>{
    e.preventDefault()
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
		<button className={classNames("h-11 text-white rounded-lg px-8 font-semibold text-sm w-[148px]", !canStake ? "bg-neutral-400" : "bg-warning-500")} disabled={!canStake} onClick={onStakeOrdinalButtonClicked}>Stake Ordinal</button>
	      </div>
	    </div>	    
	    <div className="pt-6">
	      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
		{items.map((item, index) => <Item key={item.id} item={item} clicked={itemClicked} />)}
	      </div>
	    </div>
	  </div>
	</div>
      </main>
      <BorrowModal isOpen={isBorrowModalOpen} closeModal={closeBorrowModal} items={items} />
    </>
  );
  }

