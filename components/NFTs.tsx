import { useContract, useNFTs, useAddress, ThirdwebNftMedia } from "@thirdweb-dev/react";
import styles from "../styles/Theme.module.css";

export default function MintedNFTs() {
  
    // Fetch the NFT collection from thirdweb via it's contract address.
    const { contract: nftCollection } = useContract(
        // Replace this with your NFT Collection contract address
        process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS,
        "nft-collection"
    );

    // Wallet address
    const address = useAddress();

    // Load all the minted NFTs in the collection
    const { data: nfts, isLoading: loadingNfts } = useNFTs(nftCollection);

    // Showing special text of NFT owner address
    const truncateAddress = (address: string) => {
        return (
          address.substring(0, 6) + "..." + address.substring(address.length - 4)
        );
      };

  return (
    <>
        <fieldset className={styles.fieldsetCollection}>
            <legend>More from this collection</legend>
            <div >
                {loadingNfts ? (
                <p>Loading...</p>
                ) : (
                <div className={styles.nftGrid}>
                    {nfts?.map((nft) => (
                    <div className={styles.nftItem} key={nft.metadata.id.toString()}>
                        <div>
                            <p>
                                <b>{nft.metadata.name}</b>
                            </p>
                            <div className={styles.nftImage}>
                                <ThirdwebNftMedia 
                                    metadata={nft.metadata} 
                                    width='210px'
                                />
                            </div>
                            <p>
                                owned by:&nbsp;{address && nft.owner === address? "you" : truncateAddress(nft.owner)}
                            </p>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </fieldset>
    </>
  );
}
