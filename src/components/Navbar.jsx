import * as fcl from "@onflow/fcl";
import styled from "styled-components";
import { useState, useEffect } from "react";
import "../flow/config";

const Wrapper = styled.nav`
  width: -webkit-fill-available;
  z-index: 1;
  background-color: ${(props) => props.bgColor};
  color: white;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;

  button {
    background-color: white;
    padding: 2px 40px;
    max-width: 200px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    height: 50px;

    &:hover {
      color: white;
      background-color: black;
      cursor: pointer;
    }
  }

  div {
    display: flex;
    gap: 15px;
  }
  box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

function Navbar() {
  const [user, setUser] = useState({ loggedIn: false, addr: undefined });
  const [flow, setFlow] = useState(0);
  const [bgColor, setBgColor] = useState('transparent');

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
    if (user.addr !== "") getFlow(user.addr);

    const handleScroll = () => {
      const position = window.pageYOffset;
      if (position > 6000) {
        setBgColor('black');
      } else {
        setBgColor('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user.addr]);

  const logOut = async () => {
    await fcl.unauthenticate();
    setUser({ addr: undefined, loggedIn: false });
  };

  const logIn = async () => {
    await fcl.authenticate();
  };

  async function getFlow(address) {
    try {
      const res = await fcl.query({
        cadence: `
                  import FlowToken from 0x7e60df042a9c0868
                  import FungibleToken from 0x9a0766d93b6608b7
    
                  pub fun main(address: Address): UFix64{
                    let balanceVault =  getAccount(address).getCapability(/public/flowTokenBalance).borrow<&FlowToken.Vault{FungibleToken.Balance}>()!
                    return balanceVault.balance
                  }`,
        args: (arg, t) => [arg(address, t.Address)],
      });
      setFlow(res);
    } catch (error) {
      console.log("err:", error);
    }
  }
  
  return (
    <Wrapper bgColor={bgColor}>
      <h1>Darkblock on Flow: Demo</h1>
      {user.loggedIn ? (
        <div>
          <button onClick={() => logOut()}>Logout</button>
          <box>
            <span>Address - {user.addr}</span>
            <span>Flow Balance - {flow}</span>
          </box>
        </div>
      ) : (
        <button onClick={() => logIn()}>Login</button>
      )}
    </Wrapper>
  );
}

export default Navbar;
