'use client'

import { Fragment, useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { operations } from "../../../utils/api/graphql"
import { signTransaction, SignTransactionOptions, BitcoinNetworkType } from 'sats-connect';

import { useAuthContext } from '@/lib/auth';

import { Dialog, Menu, Transition } from "@headlessui/react"
import { RadioGroup } from "@headlessui/react"

import {
	SearchNormal1,
	CloseCircle,
	Lock,
} from "iconsax-react";

import { Brc20, Rbtc, OrdinalIcon, BitcoinIcon, GreenFolderIcon, StakedIcon, DangerIcon, BorrowedIcon } from "@/components/Icons";

import { classNames } from "@/utils"

export default function Loans() {
	const items = [
		{
			"ordinal": { "name": "YuliMysteryBox", "url": "/assets/nft-example.png" },
			"token_id": "#92114",
			"floor_price": "0.291 rBTC",
			"debt": "0.24 rBTC",
			"loan_duration": "0.24 rBTC",
			"health_factor": "7.0",
		},
		{
			"ordinal": { "name": "YuliMysteryBox", "url": "/assets/nft-2.jpeg" },
			"token_id": "#92114",
			"floor_price": "0.291 rBTC",
			"debt": "0.24 rBTC",
			"loan_duration": "0.24 rBTC",
			"health_factor": "7.0",
		},
		{
			"ordinal": { "name": "YuliMysteryBox", "url": "/assets/nft-3.jpeg" },
			"token_id": "#92114",
			"floor_price": "0.291 rBTC",
			"debt": "0.24 rBTC",
			"loan_duration": "0.24 rBTC",
			"health_factor": "7.0",
		},
		{
			"ordinal": { "name": "YuliMysteryBox", "url": "/assets/nft-4.jpeg" },
			"token_id": "#92114",
			"floor_price": "0.291 rBTC",
			"debt": "0.24 rBTC",
			"loan_duration": "0.24 rBTC",
			"health_factor": "7.0",
		},
	]
	// const [items, setItems] = useState<Item[]>([]);



	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:8000/api/stakedOrdinals/3');
				const data = await response.json();
				if (data.success) {
					// setItems(data.data);
				} else {
					console.error('Error fetching data:', data.message);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();



	}, []);


	return (
		<>
			<main className="bg-neutral-100 text-neutral-900 p-10">
				<div className="flex flex-col space-y-10 text-black">
					<div>
						<div className="text-neutral-900 text-xl font-medium pb-2">My Wallet</div>
						<div className="text-neutral-600 text-base font-medium">Manage your crypto and ordinals</div>
					</div>
					<div className="grid grid-cols-4 gap-4">
						<div className="bg-white w-full py-6 px-8 rounded-lg border border-neutral-200 flex justify-between">
							<div>
								<div className="text-neutral-600 font-medium text-sm">rBTC</div>
								<div className="font-semibold text-base">0.523rBTC</div>
							</div>
							<div className="flex items-end">
								<Rbtc size={25} />
							</div>
						</div>
						<div className="bg-white w-full py-6 px-8 border border-neutral-200 flex justify-between">
							<div>
								<div className="text-neutral-600 font-medium text-sm ">BRC Token</div>
								<div className="font-semibold text-base">BRC20</div>
							</div>
							<div className="flex items-end">
								<Brc20 size={25} />
							</div>
						</div>
						<div className="bg-white w-full py-6 px-8 border border-neutral-200 flex justify-between">
							<div>
								<div className="text-neutral-600 font-medium text-sm">Ordinals</div>
								<div className="font-semibold text-base">14 Ordinals</div>
							</div>
							<div className="flex items-end">
								<OrdinalIcon size={25} />
							</div>
						</div>
						<div className="bg-white w-full py-6 px-8 border border-neutral-200 flex justify-between">
							<div>
								<div className="text-neutral-600 font-medium text-sm">Bitcoin</div>
								<div className="font-semibold text-base">0.523BTC</div>
							</div>
							<div className="flex items-end">
								<BitcoinIcon size={25} />
							</div>
						</div>
					</div>

					<div className="grid grid-cols-4 gap-0">
						<div className="bg-white w-full py-6 px-8 rounded-lg border border-neutral-200 flex justify-between">
							<div>
								<div className="text-neutral-600 font-medium text-sm">Ordinals Available</div>
								<div className="font-semibold text-base">8 Ordinals</div>
							</div>
							<div className="flex items-end">
								<GreenFolderIcon size={25} />
							</div>
						</div>
						<div className="bg-white w-full py-6 px-8 border border-neutral-200 flex justify-between">
							<div>
								<div className="text-neutral-600 font-medium text-sm ">Staked</div>
								<div className="font-semibold text-base">4 ordinals</div>
							</div>
							<div className="flex items-end">
								<StakedIcon size={25} />
							</div>
						</div>
						<div className="bg-white w-full py-6 px-8 border border-neutral-200 flex justify-between">
							<div>
								<div className="text-neutral-600 font-medium text-sm">Ordinals in danger</div>
								<div className="font-semibold text-base">2 Ordinals</div>
							</div>
							<div className="flex items-end">
								<DangerIcon size={25} />
							</div>
						</div>
						<div className="bg-white w-full py-6 px-8 border border-neutral-200 flex justify-between">
							<div>
								<div className="text-neutral-600 font-medium text-sm">Borrowed</div>
								<div className="font-semibold text-base">0.981rBTC</div>
							</div>
							<div className="flex items-end">
								<BorrowedIcon size={25} />
							</div>
						</div>
					</div>

					<div>
						<div className="text-neutral-900 text-xl font-medium pb-2">My Ordinals</div>
						<div className="text-neutral-600 text-base font-medium">Overview of your ordinals</div>
					</div>
					<div className="pt-6">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{items.map((item, index) => <Item item={item} />)}
						</div>
					</div>

					<div>
						<div className="text-neutral-900 text-xl font-medium pb-2">Loans</div>
						<div className="text-neutral-600 text-base font-medium">Recent deposit, withdraw and reward claiming</div>
					</div>

					<div>
						<table className="border-separate bg-white w-full table-auto text-center">
							<thead>
								<tr>
									<th className="font-normal text-nuetral-600 text-sm py-4">Event</th>
									<th className="font-normal text-nuetral-600 text-sm py-4">Amount</th>
									<th className="font-normal text-nuetral-600 text-sm py-4">Token</th>
									<th className="font-normal text-nuetral-600 text-sm py-4">Tx hash</th>
									<th className="font-normal text-nuetral-600 text-sm py-4">Block</th>
									<th className="font-normal text-nuetral-600 text-sm py-4">Date</th>
								</tr>
							</thead>
							<tbody>
								<tr className="h-32">
									<td className="font-medium-600 text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">Deposit</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">0.029rBTC</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">rBTC</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">asdsa78a7sd87s8dg87s8728hd8y2b98728b2878n9dn938bd98</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">10 blocks</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">0.24rBTC</td>
								</tr>
								<tr className="h-32">
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">Claim reward</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">0.029rBTC</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">rBTC</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">asdsa78a7sd87s8dg87s8728hd8y2b98728b2878n9dn938bd98</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">10 blocks</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">0.24rBTC</td>
								</tr>
								<tr className="h-32">
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">Withdraw</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">0.029rBTC</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">rBTC</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">asdsa78a7sd87s8dg87s8728hd8y2b98728b2878n9dn938bd98</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">10 blocks</td>
									<td className="font-medium text-sm border border-t-neutral-200 border-s-0 border-b-0 border-e-0">0.24rBTC</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</>
	);
}

function Item({ item }: { item: any }) {
	return (
		<div className="p-3 border rounded-lg border-neutral-200 hover:bg-neutral-50 cursor-pointer">
			<div className="relative">
				<img src={item.ordinal.url} className="rounded-lg"></img>
			</div>

			<div className="flex justify-between pt-4 pb-2 items-center">
				<div className="text-neutral-900 text-base font-bold">{item.name}</div>
				<div className="text-sm text-neutral-600">{item.status}</div>
			</div>
			<div className="text-sm text-neutral-600">Price {item.price} rBTC</div>
		</div>
	)
}