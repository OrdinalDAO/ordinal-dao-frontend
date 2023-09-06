'use client'

import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { ethers , JsonRpcSigner } from "ethers";
import { getAddress,AddressPurpose, BitcoinNetworkType } from 'sats-connect'
import { GetAddressOptions } from "sats-connect";
import {
  Element3,
  ArrangeHorizontalCircle,
  Box1,
  Bank,
  BitcoinRefresh,
  Money2,
  Wallet,
  HambergerMenu,
  UserOctagon,
  Information,
  CloseCircle,
} from "iconsax-react";
import { EmojiHappyIcon, MetaMaskIcon } from "@/components/Icons";
import { sign } from "crypto";

import { AuthProvider, useAuthContext } from '@/lib/auth';

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(" ");
}
declare var window: any
export function Sidebar({sidebarOpen, setSidebarOpen}: {sidebarOpen: boolean, setSidebarOpen: any}){
  const pathname = usePathname();
  
  const [navigation, setNavigation] = useState([
    {
      name: "Dashboard",
      href: "/",
      icon: Element3,
      current: false,
    },
    {
      name: "Borrow",
      href: "/borrow",
      icon: ArrangeHorizontalCircle,
      current: false,
    },
    {
      name: "Yield Farming",
      href: "/farming",
      icon: BitcoinRefresh,
      current: false,
    },
    {
      name: "Loan Management",
      href: "/loans",
      icon: Money2,
      current: false,
    },
    {
      name: "My Wallet",
      href: "/wallet",
      icon: Wallet,
      current: false,   
    },
  ]);  

  useEffect(() => {
    setNavigation(navigation.map(function(el){
      el.current = pathname == el.href;      
      return el
    }));
  }, [pathname]);
  
  return (
    <>
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
		      <Link href="/"><img src="/logo.png" alt="OrdinalDAO" width="150" height="25" /></Link>
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
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
	<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-900 px-6 pb-4">
	  <nav className="flex flex-1 flex-col">
            <div className="py-10 mb-4 self-center">
              <Link href="/"><img src="/logo.png" alt="OrdinalDAO" width="150" height="25" /></Link>
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
    </>
  )
}

export function Topbar({setSidebarOpen}:{setSidebarOpen:any}){
  const {user, setAuthUser, getProfile}:any = useAuthContext();
  
  const links = [
    { name: "Help", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Discord", href: "#" },
    { name: "Twitter", href: "#" },
  ];
  
  return (
    <div className="sticky top-0 flex h-[73px] shrink-0 items-center bg-white px-10">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-neutral-900 lg:hidden me-4"
        onClick={() => setSidebarOpen(true)}
      >
        <HambergerMenu size={34} variant="Bold" />
      </button>
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 text-neutral-700 justify-between">
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
	    <div className="flex items-center">
	      { getProfile() ?
		<div className="rounded-xl bg-neutral-200 flex text-neutral-900 space-x-2 px-4 py-2 text-sm font-semibold items-center">
		  <div><Wallet size={24} variant={"Bold"} /></div>
		  <div>{ getProfile() }</div>
		</div>
		:
		<button className="rounded-full bg-black w-10 h-10 text-white flex items-center text-center">
		  <div className="px-2">
		    <UserOctagon size="24" variant="Bold" />
		  </div>
		</button> }
	    </div>
	    </div>
	    </div>
  )
}


function ConnectModal({isOpen, closeModal, metaMaskConnectClicked, xverseConnectClicked}:{isOpen: boolean, closeModal:any, metaMaskConnectClicked: any, xverseConnectClicked: any}) {
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
		  <div>
		    <div>
		      <div className="flex justify-between">
			<div className="text-neutral-900 font-medium text-xl">Connect wallet</div>
			<div><button onClick={closeModal}><CloseCircle size={24} /></button></div>
		      </div>
		      <div className="font-medium text-xl py-2">Choose how you want to connect</div>
		    </div>
		    <div className="py-8 space-y-4">
		      <a className="flex justify-between bg-neutral-200 p-4 rounded-lg items-center" href="#" onClick={metaMaskConnectClicked}>
			<div>
			  <div>Metamask</div>
			  <div>Connect to your Metamask wallet</div>
			</div>
			<div>
			  <MetaMaskIcon size={32} />
			</div>
		      </a>
		      <a className="flex justify-between bg-neutral-200 p-4 rounded-lg items-center" href="#" onClick={xverseConnectClicked}>
			<div>
			  <div>Xverse Wallet</div>
			  <div>Connect to your Xverse wallet</div>
			</div>
			<div>
			  <img width="32" src="/assets/hiro128.png" />
			</div>
		      </a>
		    </div>
		    <div className="text-neutral-600">
		      We do not own your private keys and cannot access your funds or ordinals without confirmation
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

export  function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  // const options: MetaMaskSDKOptions = {
  //   dappMetadata: {
  //     name: "OrdinalDAO",
  //     url: "https://ordinal-dao.pages.dev",
  //   }
  // };
  
  // const MMSDK = new MetaMaskSDK(options);
  const {user, setAuthUser, getProfile}:any = useAuthContext();

  // Metamask
  const [address,setAddress]=useState()
  const [signer,setSigner]=useState<JsonRpcSigner>()

  // Xverse
  const [add1, setAdd1] = useState(""); // xverse wallet fee paying 
  const [pubkey1, setPubKey1] = useState(""); // xverse wallet fee paying 
  const [add2, setAdd2] = useState(""); //ord
  const [pubkey2, setPubKey2] = useState(""); // ord
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let [isConnectModalOpen, setIsConnectModalOpen] = useState(false)

  function closeConnectModal() {
    setIsConnectModalOpen(false)
  } 

  function openConnectModal() {
    setIsConnectModalOpen(true)
  }
  
  async function metaMaskConnectClicked() {
    const {ethereum} = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner()
    
    console.log(provider);
    console.log(accounts[0]); setAddress(accounts[0]);
    console.log(signer);
    console.log(JSON.stringify(signer)); setSigner(signer)
    setAuthUser({
      "signer": signer
    });
    closeConnectModal();
  }

  async function xverseConnectClicked() {
    const getAddressOptions:GetAddressOptions= {
      payload: {
        purposes: [AddressPurpose.Ordinals,AddressPurpose.Payment],
        message: 'Address for receiving Ordinals and payments',
        network: {
          type:BitcoinNetworkType.Testnet
        },
      },
      onFinish: (response:any) => {
        console.log(response.addresses)
	setAdd1(response.addresses[1].address) 
	setAdd2(response.addresses[0].address) 
	setPubKey1(response.addresses[1].publicKey) 
	setPubKey2(response.addresses[0].publicKey)
	setAuthUser({
	  "add1": response.addresses[1].address,
	  "add2": response.addresses[0].address,
	  "pubKey1": response.addresses[1].publicKey,
	  "pubKey2": response.addresses[0].publicKey,
	});
	closeConnectModal();
      },
      onCancel: () => alert('Request canceled'),
    }
   await getAddress(getAddressOptions);
  }
  
  return (
    <>
      <div>
	<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="lg:pl-72">
	  <Topbar setSidebarOpen={setSidebarOpen} />
	  { !user ?
	  <div className="px-10">
	    <div className="flex flex-col md:flex-row bg-warning-50 w-full text-black mt-[40px] px-6 rounded border-warning-200 py-2 items-center border min-h-[56px] justify-between">
	      <div className="flex flex-col md:flex-row items-center">
		<div className="flex items-center">
		  <Information size={28} variant="Bold" className="text-warning-500" />
		  <div className="ps-6 font-medium text-neutral-900">No wallet detected.</div>
		</div>
		<span className="rounded-full bg-black w-2 h-2 mx-2 hidden md:block"></span>
		<span className="text-neutral-600 text-center">Please connect it to interact with the platform.</span>
	      </div>
	      <div>
		<button className="h-10 rounded-lg bg-warning-500 text-white px-4 py-2 font-semibold mt-2 md:mt-0" onClick={openConnectModal}>Connect Wallet</button>
	      </div>
	    </div>
	  </div>
	  : ''}
	  {children}
        </div>
	<ConnectModal isOpen={isConnectModalOpen} closeModal={closeConnectModal} metaMaskConnectClicked={metaMaskConnectClicked} xverseConnectClicked={xverseConnectClicked} />
      </div>
    </>
  )
}

export default function AuthLayout({children}:{
  children: React.ReactNode
}){
  return (
    <AuthProvider>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  )
}
