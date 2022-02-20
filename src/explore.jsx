
import { useState } from 'react';
import ChainSelector from './components/chainSelector';
import NftCard from './components/nftcard';
import {fetchNFTs} from './utils/fetchNFTs';




const Explore = () => {

    const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [NFTs, setNFTs] = useState("")
    const [chain, setBlockchain] = useState("Ethereum")
  

    

    return (
        <div>
            <header className=' py-24 w-full   alchemy'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            Alchemy NFT Explorer
                        </h1>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                        <input className="border rounded-sm focus:outline-none py-2 px-3 w-full" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder='Your wallet address...'></input>
                        <input className="focus:outline-none rounded-sm py-2 px-3 w-full" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='NFT Wallet (optionnal)...'></input>
                        <ChainSelector setBlockchain={setBlockchain} chain={chain}/>
                    </div>
                    <div className='w-2/6 flex justify-center'>
                        <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={() => {fetchNFTs(owner, setNFTs, chain, contractAddress)}}>Search</button>
                    </div>
                </div>
            </header>

            <section className='py-24  w-full alchemy flex flex-wrap justify-center'>
                {
                    NFTs ? NFTs.map(NFT => {
                        return (
                           <NftCard key={NFT.value.id + NFT.value.  contractAddress} image={NFT.value.image} id={NFT.value.id} title={NFT.value.title} description={NFT.value.description} address={NFT.value.contractAddress} attributes={NFT.value.attributes}></NftCard>
                        )
                    }) : <div className="text-2xl text-white font-bold font-body mb-2">No NFTs</div>
                }
            </section>
        </div>
    )
}


export default Explore