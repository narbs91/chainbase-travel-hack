# ReBookt

[ReBookt](https://chainbase-travel-hack.vercel.app/) is a proof of concept secondary marketplace for travel bookings powered by web3, starting with Hotels. ReBookt members can buy or list hotel bookings for sale on our marketplace purchased through popular online travel agencies or directly through a hotel.

This project was submitted to the [Developer DAO x Chainbase Hackathon](https://developerdao.notion.site/Chainbase-Hackathon-Over-5000-USD-in-Bounties-9b68a7ff3b9c488da8bb752cc070c7bb) 
held from Oct 23-30, 2023

## Overview

ReBookt is built with largely open source technology and to look like a web2 app even though it's powered by web3 under the hood. We abstract away the web3 from the entire experience by covering the gas charges when it comes to minting/buring/transfering NFTs, handling transaction signatures and managing wallet creation for the user.

## What problem does it solve?

ReBookt is looking to bring a secondary retail market for popular and/or sold out properties, particularly in the case of non-cancelable stays. In todays world, if a traveler decides they no longer want to go on a non-cancelable trip, they often lose out on getting their money refunded.

Similarly, imagine you want to go to a popular destination during a peak holiday season and it just so happens that your favorite hotel is sold out. In todays reality, you likely wont be able to goto that trip staying at the hotel you want and will have to settle for a less then ideal accommodation.

ReBookt solves these problems by allowing members sell their non-cancelable (or cancelable) stays as well be able to buy sold out accommodations listed on our secondary marketplace.

## How does it work?

Once a user signs up with their email address, they can import bookings that are attached to that address into their ReBookt account. Once imported, the user can list the hotel booking for a price of their choosing. Once the hotel listing has been sold, the lister receives the money for the purchase and we take care of the plumbing to ensure the booking is properly transfered. We collect a processing fee and pass a portion of that back to the hotel in the form of a royalty.

### Tech Stack

Frontend:
- [NextJS](https://nextjs.org/) framework
- [Chakra-UI](https://chakra-ui.com/) React component library

Backend:
- [Chainbase NFT API](https://docs.chainbase.com/reference/nft-api-overview) for retrieving NFT data
- [AwardWallet API](https://awardwallet.com/api/email#introduction) for allowing a user to import travel bookings from their email (only using their testing endpoint for the hack)
- Using Polygon mainnet as our chain of choice where our [NFT smart contract](https://polygonscan.com/address/0xb8a50C823ecf064a94CC77d6DCEe1FA027f69983) is deployed
- [Thirdweb](https://thirdweb.com/) for minting NFTs and retreiving NFT data
- [Magic.link](https://magic.link/) for authetication and user wallet creation
- [IPFS](https://ipfs.tech/) (via thirdweb) to store NFT metadata
- Redis (via [Upstash](https://upstash.com/)) to store user listings

Deployment done via [Vercel](https://vercel.com/)

## Running Locally
While it is possible to run the app locally, you will need to populate the values in an .env file (see sample provided).  The recommended way of playing around with the app is to used the [actual deployed webapp](https://chainbase-travel-hack.vercel.app/); however, if you do want to attempt to run the app locally with your own set of provided .env values:

First, install the dependencies:

```bash
npm install
```

Next, run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the app locally.
