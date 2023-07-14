const fcl = require("@onflow/fcl");

fcl.config({
  "app.detail.title": "Darkblock on Flow: Demo", // this adds a custom name to our wallet
  "app.detail.icon": "https://raw.githubusercontent.com/raggi-eth/frames/main/site-logo.jpg",
  "accessNode.api": "https://rest-testnet.onflow.org", // this is for the local emulator
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // this is for the local dev wallet
})
