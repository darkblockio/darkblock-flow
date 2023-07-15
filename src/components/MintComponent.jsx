import styled from "styled-components";
import * as fcl from "@onflow/fcl";

const Wrapper = styled.div`
background: linear-gradient(0deg, #ffffff 0%, #e5e5e5 100%);
display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding-top: 110px;
  padding-bottom: 50px;
 

  main{
    display: flex;
  }

  div{
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  button{
    width: 100px;
    padding: 10px;
    border: none;
    background-color: #000000;
    color: white;
    border-radius: 8px;
    font-weight: 500;
    &:hover {
      color: black;
      background-color: white;
      cursor: pointer;
    }
  }

  img{
    width: 200px;
  }
`;

function MintComponent() {
  async function mintNFT(type, url) {
    try {
      const res = await fcl.mutate({
        cadence: `
            import FlowTutorialMint from 0x0822a39d2b1cb404
            import NonFungibleToken from 0x631e88ae7f1d7c20
            import MetadataViews from 0x631e88ae7f1d7c20

            transaction(type: String, url: String){
                let recipientCollection: &FlowTutorialMint.Collection{NonFungibleToken.CollectionPublic}

                prepare(signer: AuthAccount){
                    
                if signer.borrow<&FlowTutorialMint.Collection>(from: FlowTutorialMint.CollectionStoragePath) == nil {
                signer.save(<- FlowTutorialMint.createEmptyCollection(), to: FlowTutorialMint.CollectionStoragePath)
                signer.link<&FlowTutorialMint.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(FlowTutorialMint.CollectionPublicPath, target: FlowTutorialMint.CollectionStoragePath)
                }

                self.recipientCollection = signer.getCapability(FlowTutorialMint.CollectionPublicPath)
                                            .borrow<&FlowTutorialMint.Collection{NonFungibleToken.CollectionPublic}>()!
                }
                execute{
                    FlowTutorialMint.mintNFT(recipient: self.recipientCollection, type: type, url: url)
                }
            }
            `,
        args: (arg, t) => [arg(type, t.String), arg(url, t.String)],
        limit: 9999,
      });
      fcl.tx(res).subscribe((res) => {
        if (res.status === 4 && res.errorMessage === "") {
            window.alert("NFT Minted!")
            window.location.reload(false);
        }
      });

      console.log("txid", res);
    } catch (error) {
      console.log("err", error);
    }
  }

  return (
  <Wrapper>
    <h1>Mint this NFT to access <br></br> its token-bound content</h1>
    <main>
      
        <div>
          {/* add a video here */}
          <video style={{borderRadius: "16px"}} src="https://github.com/raggi-eth/frames/raw/main/Logo_Rotation.mp4" width="320" height="320" loop autoPlay muted></video>
            {/* <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a" alt="Mad Dog"/> */}
            <h3>Darkblock Demo NFT</h3>
            <button onClick={() => mintNFT("Darkblock Demo NFT", "https://github.com/raggi-eth/frames/blob/main/Logo_Rotation.gif?raw=true")}>Free Mint</button>
        </div>
    </main>
  </Wrapper>
  )
}

export default MintComponent;