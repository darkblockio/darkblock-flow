// import * as fcl from "@onflow/fcl";
// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Fragment } from "react";
// import Modal from "./Modal";

// const Wrapper = styled.div`
//   background-color: #e5e5e5;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   align-items: center;
//   justify-content: center;
//   padding: 50px;

//   button {
//     width: 100px;
//     padding: 10px;
//     border: none;
//     background-color: #8dfe89;
//     border-radius: 10px;
//     font-weight: 700;
//     &:hover {
//       color: white;
//       background-color: black;
//       cursor: pointer;
//     }
//   }

//   section {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-wrap: wrap;
//     gap: 30px;
//     padding: 10%;
//   }

//   .nftDiv{
//     padding: 10px;
//     background-color: #141414;
//     border-radius: 20px;
//     color: white;
//     box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
//     img{
//         width: 140px;
//         border-radius: 10px;
//     }
//     p{
//         font-size: 14px;
//     }
//   }

//   button.nftDiv {
//     border: none;
//     background: none;
//     cursor: pointer;
//     padding: 10px;
//     background-color: #141414;
//     border-radius: 20px;
//     color: white;
//     box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 10px;
//     width: 140px; // adjust as necessary
//   }
  
//   button.nftDiv img {
//     width: 100%;
//     border-radius: 10px;
//   }
  
//   button.nftDiv p {
//     font-size: 14px;
//   }
  
// `;

// export default function ShowNfts() {
//   const [nfts, setNfts] = useState([]);
//   const [user, setUser] = useState({ loggedIn: false, addr: undefined });
//   const [selectedNft, setSelectedNft] = useState(null);

// 	useEffect(() => {
//     fcl.currentUser.subscribe(setUser);
//     getNFTs(user.addr)
//   }, [user.addr]);

//   async function getNFTs(addr) {
//     try {
//       const result = await fcl.query({
//         cadence: `
//                 import FlowTutorialMint from 0x0822a39d2b1cb404
//                 import MetadataViews from 0x631e88ae7f1d7c20
                
//                 pub fun main(address: Address): [FlowTutorialMint.FlowTutorialMintData] {
//                   let collection = getAccount(address).getCapability(FlowTutorialMint.CollectionPublicPath)
//                                     .borrow<&{MetadataViews.ResolverCollection}>()
//                                     ?? panic("Could not borrow a reference to the nft collection")
                
//                   let ids = collection.getIDs()
                
//                   let answer: [FlowTutorialMint.FlowTutorialMintData] = []
                
//                   for id in ids {
                    
//                     let nft = collection.borrowViewResolver(id: id)
//                     let view = nft.resolveView(Type<FlowTutorialMint.FlowTutorialMintData>())!
                
//                     let display = view as! FlowTutorialMint.FlowTutorialMintData
//                     answer.append(display)
//                   }
                    
//                   return answer
//                 }
//                 `,
//         args: (arg, t) => [arg(addr, t.Address)],
//       });
//       setNfts(result);
//     } catch (error) {
//       console.log("err", error);
//     }
//   }

//   const handleNftClick = (nftId) => {
//     setSelectedNft(nftId);
//   };

//   const handleCloseModal = () => {
//     setSelectedNft(null);
//   };


//   return (
//     <Wrapper>
//       <h1>My NFTs</h1>
//       <main>
//         <button onClick={() => getNFTs(user.addr)}>Get NFTs</button>
//         <section>
//           {nfts.map((nft, index) => {
//             return (
//               <button key={index} className="nftDiv" onClick={() => handleNftClick(nft.id)}>
//                 <img src={nft.url} alt="nft" />
//                 <p>Type: {nft.type}</p>
//                 <p>Id: {nft.id}</p>
//               </button>
//             );
//           })}
//         </section>
//       </main>
  
//       {selectedNft && (
//         <Modal nftId={selectedNft} onClose={handleCloseModal} />
//       )}
//     </Wrapper>
//   );
  
  
// }




import * as fcl from "@onflow/fcl";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const Wrapper = styled.div`
  
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 50px;
  padding-top: 150px;

  button {
    width: 100px;
    padding: 10px;
    border: none;
    background-color: #8dfe89;
    border-radius: 10px;
    font-weight: 700;
    &:hover {
      color: white;
      background-color: black;
      cursor: pointer;
    }
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
    
  }

  .nftDiv{
    
    background-color: #141414;
    border-radius: 20px;
    color: white;
    
    img{
        width: 140px;
        border-radius: 10px;
    }
    p{
        font-size: 14px;
    }
  }

  button.nftDiv {
    border: none;
    background: none;
    cursor: pointer;
    padding: 10px;
    background-color: #141414;
    border-radius: 20px;
    color: white;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 140px; // adjust as necessary
  }
  
  button.nftDiv img {
    width: 100%;
    border-radius: 10px;
  }
  
  button.nftDiv p {
    font-size: 14px;
  }

  @media (max-width: 1280px) {
    padding: 16px;
  }

  @media (max-width: 800px) {
    padding-bottom: 50px;
  }
  
`;

const IframeContainer = styled.div`
  position: relative;
  width: 100%; // This will make the iframe responsive
  padding-top: 70%; // This is based on the aspect ratio 16:9 (9/16 = 0.5625)
  margin-bottom: 100px;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none; // This line removes the border
  }

  @media (max-width: 800px) {
    padding-top: 100%;
  }
`;



const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0); // Semi-transparent overlay
  display: flex;
  z-index: 9;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;
`;


export default function ShowNfts() {
  const [nfts, setNfts] = useState([]);
  const [user, setUser] = useState({ loggedIn: false, addr: undefined });
  const [selectedNft, setSelectedNft] = useState(null);

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
    getNFTs(user.addr);
  }, [user.addr]);

  async function getNFTs(addr) {
    try {
      const result = await fcl.query({
        cadence: `
                import FlowTutorialMint from 0x0822a39d2b1cb404
                import MetadataViews from 0x631e88ae7f1d7c20
                
                pub fun main(address: Address): [FlowTutorialMint.FlowTutorialMintData] {
                  let collection = getAccount(address).getCapability(FlowTutorialMint.CollectionPublicPath)
                                    .borrow<&{MetadataViews.ResolverCollection}>()
                                    ?? panic("Could not borrow a reference to the nft collection")
                
                  let ids = collection.getIDs()
                
                  let answer: [FlowTutorialMint.FlowTutorialMintData] = []
                
                  for id in ids {
                    
                    let nft = collection.borrowViewResolver(id: id)
                    let view = nft.resolveView(Type<FlowTutorialMint.FlowTutorialMintData>())!
                
                    let display = view as! FlowTutorialMint.FlowTutorialMintData
                    answer.append(display)
                  }
                    
                  return answer
                }
                `,
        args: (arg, t) => [arg(addr, t.Address)],
      });
      
      setNfts(result);
    } catch (error) {
      console.log("err", error);
    }
  }

  const handleCloseModal = () => {
    setSelectedNft(null);
  };

  const handleOverlayClick = () => {
    if (nfts.length === 0) {
      alert('You need to mint the NFT to access.');
    }
  };

  const contracAddress = "0x0822a39d2b1cb404";
  const iframeSrc = `https://staging.darkblock.io/platform/flow/embed/nft/${contracAddress}/2/<epoch>_<signature>/<address>`;

  return (
    <Wrapper>
      <h1 style={{}}>Token-bound Content</h1>
      <IframeContainer>
        <iframe src={iframeSrc} title="NFT" width="100%" height="100%"></iframe>
        {nfts.length === 0 && (
          <Overlay onClick={handleOverlayClick}></Overlay>
        )}
      </IframeContainer>

      {selectedNft && (
        <Modal nftId={selectedNft} onClose={handleCloseModal} />
      )}
    </Wrapper>
  );
}
