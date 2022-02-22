const getAddressNFTs = async (endpoint, owner, contractAddress) => {
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())

            } else {
                // data = await fetch(`${endpoint}/v1/getNFTs?owner=${owner}`).then(data => data.json())
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(data => data.json())

            }
            // console.log("GETNFTS: ", data)
        } catch (e) {
            getAddressNFTs(endpoint, owner, contractAddress)
        }

        return data
    }
}

const getEndpoint = (chain) => {
    switch (chain) {
        case "Ethereum":
            return 'https://eth-mainnet.alchemyapi.io/v2/-7Q7tMjqtuGARfCpVEGzjqcvSNg_uImU'
            break;
        case "Polygon":
            return 'https://polygon-mainnet.g.alchemy.com/v2/JJEOTu7ambTIjzYNUvtJLCJrST5-bxPo'
            break;
    }
}

const fetchNFTs = async (owner, setNFTs, chain, contractAddress) => {
    let endpoint = getEndpoint(chain)
    console.log('Endpoint :' + endpoint)
    const data = await getAddressNFTs(endpoint, owner, contractAddress)
    console.log(data);
    if (data.ownedNfts.length) {
        const NFTs = await getNFTsMetadata(data.ownedNfts, endpoint)
        console.log("NFTS metadata", NFTs)
        const NFTsSlice = NFTs.slice(0,18)
        let fullfilledNFTs = NFTsSlice.filter(NFT => NFT.status == "fulfilled")
        console.log("NFTS", fullfilledNFTs)
        setNFTs(fullfilledNFTs)
     } else {
        setNFTs(null)
    }

}


const getNFTsMetadata = async (NFTS, endpoint) => {
    const NFTsMetadata = await Promise.allSettled(NFTS.map(async (NFT) => {
        const metadata = await fetch(`${endpoint}/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`,).then(data => data.json())
        let imageUrl;
        console.log("metadata", metadata)
        if (metadata.media[0].gateway.length) {
            imageUrl = metadata.media[0].gateway
        } else {
            imageUrl = "https://via.placeholder.com/500"
        }

        return {
            id: NFT.id.tokenId,
            contractAddress: NFT.contract.address,
            image: imageUrl,
            title: metadata.metadata.name,
            description: metadata.metadata.description,
            attributes: metadata.metadata.attributes
        }
    }))

    return NFTsMetadata
}


export { fetchNFTs, getAddressNFTs }