import React from 'react'

export default function NFTCard({item}) {

    let tempLink = item.ipfs_art_hash ? `https://cloudflare-ipfs.com/ipfs/${item.ipfs_art_hash}` : `${item.ipfs_art_url}`;

  return (
    <div style={{margin: 10, textAlign: "center"}}>
        <div>
            <img style={{height: 200, width: 200, objectFit: "cover", borderRadius: 20}} src={tempLink} alt="NFT Image"/>
        </div>
        <div>
            <p style={{marginBottom: 8, fontWeight: "bold"}}>{item.nft_name}</p>
            <p style={{marginBottom: 30, marginTop: 0, fontWeight: "bold"}}>{item.nerg_sale_value / 1000000000} ERG</p>
        </div>
    </div>
  )
}
