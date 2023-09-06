'use client'

import { Fragment, useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { operations } from "../../../utils/api/graphql"
import {  signTransaction, SignTransactionOptions,BitcoinNetworkType } from 'sats-connect';

import { useAuthContext } from '@/lib/auth';

import { Dialog, Menu, Transition } from "@headlessui/react"
import { RadioGroup } from "@headlessui/react"

import {
  SearchNormal1,
  CloseCircle,
  Lock,
} from "iconsax-react";

import { InfoIcon } from "@/components/Icons";

import { classNames } from "@/utils"

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
  const {metamaskData, xverseData, setAuthMetamask, setAuthXverse, getProfile}:any = useAuthContext();
  
  const selectedItems = items.filter((item: any) => item.selected);

  const times = [
    { id: 1, time: "7 Days", value: "7"},
    { id: 2, time: "14 Days", value: "14"},
    { id: 3, time: "30 Days", value: "30"},
    { id: 4, time: "60 Days", value: "60"},
    { id: 5, time: "144 Days", value: "144"},
  ]
  const [selectedTime, setSelectedTime] = useState(times[0])

  const steps = ["lock", "approve", "summary", "approve_wallet", "success"];
  
  const [step, setStep]  = useState("lock");

  const borrowAmountRef = useRef<HTMLInputElement>(null);

  function lockOridnalClicked(){
    console.log(metamaskData);
    setStep("approve");
  }

  function signAndApproveClicked(){
    setStep("summary");
  }

  function submitClicked(e:any){
    e.preventDefault();
    console.log("Submit clicked");
    if (borrowAmountRef?.current){
      console.log(borrowAmountRef?.current["value"]);
    }
    console.log(selectedTime);
    //setStep("approve_wallet");
  }

  function approveTransactionClicked(){
    setStep("success");
  }

  const lockDialog = (
    <>
      <div className="h-[160px] flex justify-center items-center mt-[30px]">
	<img src="/assets/nft-example.png" width="112px" height="112px" className="rounded-full" />
      </div>
      <div className="px-8 flex-col flex items-center">
	<div className="text-lg font-semibold">Lock your ordinals</div>
	<div className="text-neutral-600 text-sm pt-4 pb-8 text-center">
	  In order to proceed, your Ordinal will be locked and used for staking.
	</div>
	<div className="flex pb-8 space-x-4 w-full">
	  <button className="basis-1/2 grow rounded-lg bg-white h-10 text-neutral-900 border border-neutral-200 text-sm font-semibold" onClick={closeModal}>Close</button>
	  <button className="basis-1/2 grow rounded-lg bg-neutral-900 h-10 text-white text-sm font-semibold" onClick={lockOridnalClicked}>Lock Ordinal</button>
	</div>
      </div>
    </>
  )

  const approveDialog = (
    <>
      <div className="p-8">
	<div className="flex items-center justify-center text-warning-500 pt-8"><Lock size={64} /></div>
	<div className="text-lg font-semibold text-center pt-8">Approve Wallet Transaction</div>
	<div className="text-neutral-600 text-sm pt-4 pb-8 text-center">
	  You are almost done, just sign it and it will be completed.
	</div>
	<div className="flex space-x-4 w-full">
	  <button className="basis-1/2 grow rounded-lg bg-white h-10 text-neutral-900 border border-neutral-200 text-sm font-semibold" onClick={closeModal}>Close</button>
	  <button className="basis-1/2 grow rounded-lg bg-neutral-900 h-10 text-white text-sm font-semibold" onClick={signAndApproveClicked}>Sign and approve</button>
	</div>
      </div>
    </>
  )

    const summaryDialog = (
      <>
	<div className="h-[160px] flex justify-center items-center">		      
	  <img src="/assets/nft-example.png" width="112px" height="112px" className="rounded-full" />
	</div>
	<div className="p-8">
	  <form method="post">
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
		<div className="text-sm font-medium">Borrow amount</div>
		<div className="relative mt-2 rounded-md shadow-sm">
		  <input
		    ref={borrowAmountRef}
		    type="text"
		    name="borrow_amount"
		    id="borrow_amount"
		    className="block w-full rounded-md border-0 py-1.5 px-4 text-neutral-900 ring-1 ring-inset ring-neutral-200 focus:ring-neutral-200 h-[50px]"
		    placeholder="0.00"
		  />
		  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
		    <button className="rounded-2xl bg-neutral-900 text-white text-xs px-3 h-8">MAX</button>
		  </div>
		</div>
	      </div>
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
	      <button type="submit" className="rounded-lg bg-black text-white font-semibold text-sm h-10 w-full" onClick={submitClicked}>Submit</button>
	    </div>
	  </form>
	</div>
      </>
    )

  const approveWalletDialog = (
    <>
      <div className="p-8">
	<div className="flex items-center justify-center text-warning-500 pt-8"><InfoIcon size={64} /></div>
	<div className="text-lg font-semibold text-center pt-8">Approve Wallet Transaction</div>
	<div className="space-y-6 py-8">
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
	  <div className="flex justify-between text-sm font-medium">
	    <div>Intest Rate:</div>
	    <div>0.0 rBTC</div>
	  </div>
	  <div className="flex justify-between text-sm font-medium">
	    <div>Loan to Value (LTV)</div>
	    <div>20%</div>
	  </div>
	</div>
	<div className="flex space-x-4 w-full">
	  <button className="basis-1/2 grow rounded-lg bg-white h-10 text-neutral-900 border border-neutral-200 text-sm font-semibold" onClick={closeModal}>Close</button>
	  <button className="basis-1/2 grow rounded-lg bg-neutral-900 h-10 text-white text-sm font-semibold" onClick={approveTransactionClicked}>Approve Transaction</button>
	</div>
      </div>
    </>
  )

  const successDialog = (
    <>
      <div className="p-8">	
	<div className="flex items-center justify-center text-warning-500 pt-8">
	  <img src="/assets/success.png" width="64" height="64" />
	</div>
	<div className="text-lg font-semibold text-center pt-8">Transaction Successful</div>
	<div className="text-neutral-600 text-sm pt-4 pb-8 text-center">
	  Your <span className="font-medium text-neutral-900">Ordinal</span> is now locked and <span className="font-medium text-neutral-900">0.082rBTC</span> deposited into your wallet.
	</div>
	<div className="flex space-x-4 w-full">
	  <button className="basis-1/2 grow rounded-lg bg-white h-10 text-neutral-900 border border-neutral-200 text-sm font-semibold" onClick={closeModal}>Close</button>
	</div>
      </div>
    </>
  )

  function renderDialog(param:string){
    switch(param){
      case 'lock':
	return lockDialog
      case 'summary':
	return summaryDialog
      case 'approve':
	return approveDialog
      case 'approve_wallet':
	return approveWalletDialog
      case 'success':
	return successDialog
      default:
	return <div></div>
    }
  }

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
		  { renderDialog(step) }
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

  function closeBorrowModal(){
    setIsBorrowModalOpen(false);  
  }

  const [base64Signed , setbase64] = useState();
  const [escrowId , setEscrowId] = useState();
  const [showLockModal, setshowLockModal] = useState(true);

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
	      <div className="text-neutral-900 text-xl font-medium pb-2">Borrow</div>
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

