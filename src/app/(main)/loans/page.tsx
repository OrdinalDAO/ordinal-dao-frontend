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

export default function Loans() {
  const items = [
    {
      "ordinal": {"name": "YuliMysteryBox", "url": "/assets/nft-example.png"},
      "token_id": "#92114",
      "floor_price": "0.291 rBTC",
      "debt": "0.24 rBTC",
      "loan_duration": "0.24 rBTC",
      "health_factor": "7.0",
    },
        {
	  "ordinal": {"name": "YuliMysteryBox", "url": "/assets/nft-example.png"},
	  "token_id": "#92114",
	  "floor_price": "0.291 rBTC",
	  "debt": "0.24 rBTC",
	  "loan_duration": "0.24 rBTC",
	  "health_factor": "7.0",
	},
        {
	  "ordinal": {"name": "YuliMysteryBox", "url": "/assets/nft-example.png"},
	  "token_id": "#92114",
	  "floor_price": "0.291 rBTC",
	  "debt": "0.24 rBTC",
	  "loan_duration": "0.24 rBTC",
	  "health_factor": "7.0",
	},
        {
	  "ordinal": {"name": "YuliMysteryBox", "url": "/assets/nft-example.png"},
	  "token_id": "#92114",
	  "floor_price": "0.291 rBTC",
	  "debt": "0.24 rBTC",
	  "loan_duration": "0.24 rBTC",
	  "health_factor": "7.0",
	},
  ]
  
  return (
    <>
      <main className="bg-neutral-100 text-neutral-900 p-10">
	<div className="flex flex-col space-y-10 text-black">
	  <div>
	    <div className="text-neutral-900 text-xl font-medium pb-2">Loan Management</div>
	    <div className="text-neutral-600 text-base font-medium">Repay loans and redeem your ordinals</div>
	  </div>
	  <div className="grid grid-cols-2 gap-4">
	    <div className="bg-white w-full py-6 px-8 rounded-lg border border-neutral-200">
	      <div className="font-semibold text-xl">Yield Farming</div>
	      <div className="text-neutral-600 font-medium text-base">Provide liquidity, earn APR</div>
	    </div>
	    <div className="bg-white w-full py-6 px-8 border border-neutral-200"></div>
	  </div>
	  <div>
	    <div className="text-neutral-900 text-xl font-medium pb-2">Locked Ordinals</div>
	    <div className="text-neutral-600 text-base font-medium">Ordinals currently locked in loans</div>
	  </div>
	  <div>
	    <table className="border-separate bg-white w-full table-auto text-left">
	      <thead>
		<tr>
		  <th className="font-normal text-nuetral-600 text-sm py-4 ps-8">Ordinal</th>
		  <th className="font-normal text-nuetral-600 text-sm py-4">Token ID</th>
		  <th className="font-normal text-nuetral-600 text-sm py-4">Floor Price</th>
		  <th className="font-normal text-nuetral-600 text-sm py-4">Debt</th>
		  <th className="font-normal text-nuetral-600 text-sm py-4">Loan Duration</th>
		  <th className="font-normal text-nuetral-600 text-sm py-4">Health Factor</th>
		  <th className="font-normal text-nuetral-600 text-sm py-4 pe-8">Action</th>
		</tr>
	      </thead>
	      <tbody>
		{items.map((item, index) =>
		  <tr key={index} className="">
		    <td className="py-4 border border-t-neutral-200 border-s-0 border-b-0 border-e-0 ps-8">
		      <div className="flex items-center space-x-6">
			<img src={item.ordinal.url} width={50} height={50} className="rounded-lg" />
			<span className="font-medium text-sm">{item.ordinal.name}</span>
		      </div>
		    </td>
		    <td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">{item.token_id}</td>
		    <td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">{item.floor_price}</td>
		    <td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">{item.debt}</td>
		    <td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">{item.loan_duration}</td>
		    <td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">
		      <div className="flex items-center space-x-3 px-1">
			<div className="w-full bg-neutral-200 rounded-full h-2">
			  <div className="bg-success-500 h-2 rounded-full" style={{width: "70%"}}></div>
			</div>
			<div>{item.health_factor}</div>
		      </div>
		    </td>
		    <td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0 pe-8">
		      <button className="bg-warning-500 text-white font-extrabold px-8 py-2 rounded-lg">Redeem</button>
		    </td>
		  </tr>		  
		)}
	      </tbody>
	    </table>
	  </div>
	</div>
      </main>
    </>
  );
}

