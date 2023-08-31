'use client'

import { useState } from 'react';

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
  const items = [
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
    {"name": "Doodle Max2", "status": "Available", "price": "0.12", "image": "/assets/nft-example.png"},
  ];
  
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
		<button className="h-11 bg-warning-500 text-white rounded-lg px-8 font-semibold text-sm w-[148px]">Stake Ordinal</button>
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
