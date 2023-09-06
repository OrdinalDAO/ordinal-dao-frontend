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
  return (
    <>
      <main className="bg-neutral-100 text-neutral-900 p-10">
	<div className="flex flex-col space-y-10 text-black">
	  Test
	</div>
      </main>
    </>
  );
}

