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
	    <div className="text-neutral-900 text-xl font-medium pb-2">Testing</div>
	    <div className="text-neutral-600 text-base font-medium">Repay loans and redeem your ordinals</div>
	  </div>
	</div>
      </main>
    </>
  );
}

