'use client';

import { Fragment, useState } from "react";
import Image from "next/image";
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

const navigation = [
  {
    name: "Dashboard",
    href: "#",
    icon: Element3,
    current: true,
  },
  {
    name: "Staking",
    href: "#",
    icon: ArrangeHorizontalCircle,
    current: false,
  },
  {
    name: "Redeem Ordinal",
    href: "#",
    icon: Box1,
    current: false,
  },
  {
    name: "Supply Pool",
    href: "#",
    icon: Bank,
    current: false,
  },
  {
    name: "Yield Farming",
    href: "#",
    icon: BitcoinRefresh,
    current: false,
  },
  {
    name: "Loan Management",
    href: "#",
    icon: Money2,
    current: false,
  },
  {
    name: "My Wallet",
    href: "#",
    icon: Wallet,
    current: false,
  },
];

const links = [
  { name: "Help", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Discord", href: "#" },
  { name: "Twitter", href: "#" },
];

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-900 px-6 pb-4">
                    <nav className="flex flex-1 flex-col">
		                    <div className="py-10 mb-4 self-center">
  <Link href="/"><Image src="/logo.png" alt="OrdinalDAO" width="150" height="25" /></Link>
</div>
		      <ul className="space-y-5">
  {navigation.map((item) => (
    <li
      key={item.name}
      className={classNames(
        item.current ? "bg-neutral-800" : "",
        "rounded",
      )}
    >
      <a
        href={item.href}
        className={classNames(
          item.current
            ? "text-white"
            : "text-neutral-500 hover:text-white",
          "flex gap-x-4 py-3 px-4 text-base leading-6 font-normal items-center",
        )}
      >
        <item.icon size={20} variant="Bold" />
        <span>{item.name}</span>
      </a>
    </li>
  ))}
</ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-900 px-6 pb-4">
            <nav className="flex flex-1 flex-col">
              <div className="py-10 mb-4 self-center">
                <Link href="/"><Image src="/logo.png" alt="OrdinalDAO" width="150" height="25" /></Link>
              </div>
              <ul className="space-y-5">
                {navigation.map((item) => (
                  <li
                    key={item.name}
                    className={classNames(
                      item.current ? "bg-neutral-800" : "",
                      "rounded",
                    )}
                  >
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "text-white"
                          : "text-neutral-500 hover:text-white",
                        "flex gap-x-4 py-3 px-4 text-base leading-6 font-normal items-center",
                      )}
                    >
                      <item.icon size={20} variant="Bold" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-[73px] shrink-0 items-center bg-white px-10">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-neutral-900 lg:hidden me-4"
              onClick={() => setSidebarOpen(true)}
            >
              <HambergerMenu size={34} variant="Bold" />
            </button>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 text-neutral-700">
              <div className="flex items-center space-x-[30px]">
                {links.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="hover:text-black"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </>
  );
}

