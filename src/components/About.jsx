import React from 'react';
import styled from 'styled-components';

const FullWidthContainer = styled.div`
  border-top: 1px solid #000;
  width: 100%;
  margin: 0 auto; // centers the container horizontally
`;

const AboutContainer = styled.div`
  padding: 20px;
  margin-bottom: 50px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Link = styled.a`
  color: #000;
  text-align: center;
  text-decoration: none;
  display: block;
  margin: 10px auto;

  &:hover {
    color: #007BFF;
  }
`;

const AboutSection = () => {
  return (
    <FullWidthContainer>
      <AboutContainer>
        <h2>About this site and useful links</h2>
        <p>
          This demo was built as part of the “Flow to the Future” Flow Hackthon. It demonstrates how Darkblock token-bound content can be accessed via ownership of a Flow NFT. The Darkblock token-bound content has been added by the project and NFT creators.
        </p>
        <p>Learn more about Darkblock and this project:</p>
        <Link href="https://github.com/darkblockio/darkblock-flow">Github of this project</Link>
        <Link href="https://darkblock.io">Darkblock.io</Link>
        <Link href="https://docs.darkblock.io">docs.darkblock.io</Link>
        <Link href="https://twitter.com/darkblockio">https://twitter.com/darkblockio</Link>
        <Link href="https://discord.darkblock.io">http://discord.darkblock.io</Link>
      </AboutContainer>
    </FullWidthContainer>
  );
};

export default AboutSection;
