'use client';

import { Fragment, useState } from "react";
import Link from "next/link";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Element3,
  ArrangeHorizontalCircle,
  Box1,
  Bank,
  BitcoinRefresh,
  Money2,
  Wallet,
  HambergerMenu,
} from "iconsax-react";
import { EmojiHappyIcon } from "@/components/Icons";

export default function Dashboard() { 
  return (
    <>
      <main className="bg-neutral-100 text-neutral-900 p-10">
        <div className="flex flex-col space-y-10">
          <div className="bg-[url('/assets/banner.png')] h-[144px] bg-cover rounded-lg flex px-8 items-center justify-between">
            <div className="text-white">
              <div className="md:text-2xl pb-2 text-lg">
                Put your ordinals to work
              </div>
              <div className="md:text-base text-sm">
                Stake your ordinal, borrow rBTC
              </div>
              <div className="text-base">Stake your rBTC, get %APY</div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
              <button className="rounded-lg bg-white text-neutral-900 px-10 h-10">
                Borrow
              </button>
              <button className="rounded-lg bg-warning-500 text-white px-10 h-10">
                Staking
              </button>
            </div>
          </div>
          <div className="bg-white">
            <div className="py-4 px-8">
              <div className="text-neutral-light-500 text-xl font-semibold">
                Account overview
              </div>
              <div className="text-neutral-light-400 text-sm">
                Overview of your account
              </div>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-2 divide-x divide-y divide-neutral-200">
              <div className="border-t border-neutral-200 p-6">
                <div className="text-neutral-700 pb-2 text-sm">
                  Orignal Ordinals
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="text-neutral-900">23</div>
                    <div className="bg-origin-green-100 text-origin-green-500 rounded-lg text-xs flex items-center px-2">
                      $55,192
                    </div>
                  </div>
                  <div>
                    <EmojiHappyIcon size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-neutral-700 pb-2 text-sm">
                  Orignal in Loan
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="text-neutral-900">23</div>
                    <div className="bg-origin-green-100 text-origin-green-500 rounded-lg text-xs flex items-center px-2">
                      $55,192
                    </div>
                  </div>
                  <div>
                    <EmojiHappyIcon size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-neutral-700 pb-2 text-sm">
                  Orignal in Auction
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="text-neutral-900">23</div>
                    <div className="bg-origin-green-100 text-origin-green-500 rounded-lg text-xs flex items-center px-2">
                      $55,192
                    </div>
                  </div>
                  <div>
                    <EmojiHappyIcon size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-neutral-700 pb-2 text-sm">
                  Ordinals in Danger
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="text-neutral-900">23</div>
                    <div className="bg-origin-green-100 text-origin-green-500 rounded-lg text-xs flex items-center px-2">
                      $55,192
                    </div>
                  </div>
                  <div>
                    <EmojiHappyIcon size={24} />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-2 divide-x border-t border-neutral-200 divide-neutral-200">
              <div className="p-6">
                <div className="text-neutral-700 pb-2 text-sm">
                  Listed Ordinals
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="text-neutral-900">0 for Sale</div>
                    <div className="bg-origin-green-100 text-origin-green-500 rounded-lg text-xs flex items-center px-2">
                      $55,192
                    </div>
                  </div>
                  <div>
                    <EmojiHappyIcon size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-neutral-700 pb-2 text-sm">
                  NFTs in Custody
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="text-neutral-900">
                      0 Ordinals in Vault
                    </div>
                  </div>
                  <div>
                    <EmojiHappyIcon size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-neutral-700 pb-2 text-sm">
                  Ordinals in Pool Staking
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="text-neutral-900">
                      0 Ordinals Staked
                    </div>
                  </div>
                  <div>
                    <EmojiHappyIcon size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-neutral-700 pb-2 text-sm">
                  Ordinals in Collateral & Solo Staking
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="text-neutral-900">
                      0 Ordinals in Vault
                    </div>
                  </div>
                  <div>
                    <EmojiHappyIcon size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

