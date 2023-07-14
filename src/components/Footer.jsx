import styled from 'styled-components';
import React from 'react';
import { FaGithub, FaFacebook, FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';


const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin-top: 50px;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const FooterText = styled.p`
  font-size: 16px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIconLink = styled.a`
  color: #333;
  font-size: 24px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>© 2023 Darkblock on Flow: Demo. All rights reserved.</FooterText>
        <SocialIcons>
        <SocialIconLink href="http://discord.darkblock.io/" target="_blank" aria-label="Discord">
            <FaDiscord />
            </SocialIconLink>
          <SocialIconLink href="https://github.com" target="_blank" aria-label="Github">
            <FaGithub />
          </SocialIconLink>
         
          <SocialIconLink href="https://twitter.com/darkblockio" target="_blank" aria-label="Twitter">
            <FaTwitter />
          </SocialIconLink>
         
        </SocialIcons>
       
      </FooterContent>
    </FooterContainer>
  );
}
