import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';



const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => props.show ? 'block' : 'none'};
`;

const ldsSpinner = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Spinner = styled.div`
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    transform-origin: 40px 40px;
    animation: ${ldsSpinner} 1.2s linear infinite;

    &:after {
      content: " ";
      display: block;
      position: absolute;
      top: 3px;
      left: 37px;
      width: 6px;
      height: 18px;
      border-radius: 20%;
      background: #000000;
    }

    ${[...Array(12)].map((_, i) => css`
      &:nth-child(${i + 1}) {
        transform: rotate(${i * 30}deg);
        animation-delay: ${-1.1 + i * 0.1}s;
      }
    `)}
  }
`;






const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  height: 80%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
`;

const Iframe = styled.iframe`
  width: 90%;
  height: 80%;
  border: none;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};  // Add this line
`;



export default function Modal({ nftId, onClose }) {
    const [isLoading, setIsLoading] = useState(true);  // Set initial state to true
    const contracAddress = "0x0822a39d2b1cb404";
    const iframeSrc = `https://staging.darkblock.io/platform/flow/embed/nft/${contracAddress}/${nftId}/<epoch>_<signature>/<address>`;
    // for local development
    const iframeSrcLocal = `http://localhost:3000/platform/flow/embed/nft/${contracAddress}/${nftId}/<epoch>_<signature>/<address>`;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);  // Change loading state to false after 3 seconds
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ModalWrapper>
            <ModalContent>
            <LoaderWrapper show={isLoading}>
      <Spinner>
        <div></div><div></div><div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div><div></div><div></div>
      </Spinner>
    </LoaderWrapper>
                <nav>
                    <h2>NFT ID: {nftId}</h2>
                    <CloseButton onClick={onClose}>X</CloseButton>
                </nav>
                <Iframe
                    src={iframeSrc}
                    title="NFT Info"
                    allow="fullscreen"
                    sandbox="allow-same-origin allow-scripts"
                    onLoad={() => setIsLoading(false)}  // Set loading to false when iframe has loaded
                    visible={!isLoading}  // Add this line
                />
            </ModalContent>
        </ModalWrapper>
    );
}

