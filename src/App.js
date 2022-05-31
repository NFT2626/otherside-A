import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import Web3 from "web3";
import 'rsuite/styles/index.less';
import "rsuite/dist/rsuite.min.css";
import { Panel, PanelGroup } from 'rsuite';
import { Carousel } from 'rsuite';
import { Notification, toaster } from 'rsuite';
import { Loader } from 'rsuite';
import { Badge } from 'rsuite';

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: 'coder';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const CTNButton = styled.button`
  font-family: 'coder';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const Maxbtn = styled.button`
  font-family: 'coder';
  font-size: 0.75rem;
  border-radius: 10px;
  background-color: #F48C2C;
  font-weight: bold;
  color: white;
  width: 80px;
  height: 30px;
  cursor: pointer;
  letter-spacing: 2px;
  :hover {
    color: black;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  color: white;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
`;

export const LogoDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
align-content: center;
gap: 10%;
width: 300px;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: center;
  margin: auto;
  width: 70%;
  border: 2px solid white;
  border-radius: 40px;
  background: linear-gradient(90deg, #000000 10%, #000000 93%);
    @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const ResponsiveWrapperHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 80px;
  padding: 10px;
  background-color : #000000;
  @media (min-width: 767px) {
    flex-direction: row;
  }
  @media (max-width: 565px) {
    max-height: 220px;
  }
`;

export const StyledLogo = styled.img`
  display: inline;
  width: 200px;
  @media (max-width: 767px) {
    width: 150px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  width: 450px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 450px;
  }
  @media (min-width: 1000px) {
    width: 450px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const Styledroad = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: width 0.5s;
`;

export const StyledImgSmall = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 220px;
    height: 220px;
  }
  @media (min-width: 1000px) {
    width: 220px;
    height: 220px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

export const WalletBox = styled.div`
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid white;
  background-color: transparent;
  //padding: 10px;
  font-weight: bold;
  font-size: 12px;
  width: 180px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px white;
  -webkit-box-shadow: 0px 4px 0px -2px white;
  -moz-box-shadow: 0px 4px 0px -2px white;
  @media (max-width: 565px) {
    margin-top: 20px;
  
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [walletAddress, setAddress] = useState("Not Connected");
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [tokens, settokens] = useState(1);
  const [brd, setbrd] = useState("2px solid #FFFFFF");
  const [bxsh, setbxsh] = useState("0px 0px 3px 0px #FFFFFF");
  const [DOT, setDOT] = useState("red");
  const [type, setType] = React.useState('info');
  const [placement, setPlacement] = React.useState('topStart');
  const errmessage = (
    <Notification type={'error'} header={'error'} closable>
     Sorry, something went wrong please try again later.
    </Notification>
  );
  const txmessage = (
    <Notification type={'success'} header={'success'} closable>
     Congrats, Mint Was successfull.
    </Notification>
  );
  const mntmessage = (
    <Notification type={'info'} header={'success'} closable>
     <Loader/> Minting in Progress....
    </Notification>
  );
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    DISPLAY_COST: 0,
    WL_Display: 0,
    GAS_LIMIT: 0,
    MAX_PER_TX: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    Twitter: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.DISPLAY_COST * tokens;
    let price = Web3.utils.toWei(cost.toString(), 'ether');
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", price);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    setbrd("2px solid yellow");
    setbxsh("0px 0px 3px 0px yellow");
    toaster.push(mntmessage, { placement })
    blockchain.smartContract.methods
      .mint(tokens)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: price,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
        toaster.push(errmessage, { placement })
        setbrd("2px solid red");
        setbxsh("0px 0px 3px 0px red");
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        toaster.push(txmessage, { placement })
        setbrd("2px solid green");
        setbxsh("0px 0px 3px 0px green");
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementtokens = () => {
    let newtokens = tokens - 1;
    if (newtokens < 1) {
      newtokens = 1;
    }
    settokens(newtokens);
  };

  const incrementtokens = () => {
    let newtokens = tokens + 1;
    if (newtokens > CONFIG.MAX_PER_TX) {
      newtokens = CONFIG.MAX_PER_TX;
    }
    settokens(newtokens);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setAddress(blockchain.account.substring(0,4) + "..." + blockchain.account.substring(38,42));
      setDOT("green");
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        // ai={"center"}
        style={{ backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <ResponsiveWrapperHeader>
          <LogoDiv>
            <a href="https://otherdeed.tk/" target={"home"}>
              <StyledLogo alt={"logo"} src={"/config/images/1500x500iu.jpg"} />
            </a>
          </LogoDiv>

          <s.Headerlinks>
            <s.StyledLink href="#story">Story</s.StyledLink>
            <s.StyledLink href="#sneak">Sneak Peaks</s.StyledLink>
            <s.StyledLink href="#faq">FAQ</s.StyledLink>
          </s.Headerlinks>

          <s.HeaderDiv>
            <s.socialDiv>
              <a href={CONFIG.Twitter} target={"_blank"}>
                <s.Icons src="/config/images/twitter.svg" alt="twitter" />
              </a>
              <a href={CONFIG.MARKETPLACE_LINK} target={"_blank"}>
                <s.Icons src="/config/images/opensea.svg" alt="opensea" />
              </a>
            </s.socialDiv>
            <WalletBox>
              {blockchain.account !== "" ? (
                <>
                  <s.TextSubTitle style={{ fontSize: "1rem", color: "white" }}>
                    <Badge color={DOT} /> {walletAddress}
                  </s.TextSubTitle>
                </>
              ) : null}
            </WalletBox>
          </s.HeaderDiv>
        </ResponsiveWrapperHeader>
        <s.SpacerLarge />

        <s.Container flex={1} jc={"center"} ai={"center"}>
        <br></br>
        <br></br>
          <s.TextTitle>Mint Your {CONFIG.NFT_NAME}</s.TextTitle>
        </s.Container>

        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <StyledImg src={"/config/images/11.gif"} alt="image" />
          <s.SpacerSmall />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextSub
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                    fontFamily: "coder",
                  }}
                >
                  The sale has ended.
                </s.TextSub>
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                    fontFamily: "coder",
                  }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextSub
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                    fontFamily: "coder",
                  }}
                >
                  {data.totalSupply} | {CONFIG.MAX_SUPPLY}
                </s.TextSub>
                <s.SpacerSmall />
                <s.TextTotal
                  style={{
                    background: "white",
                    borderRadius: 5,
                    padding: 8,
                    color: "black",
                  }}
                >
                  Price&emsp;&emsp;&emsp;&emsp;&emsp;{CONFIG.DISPLAY_COST}{" "}
                  {CONFIG.NETWORK.SYMBOL}
                </s.TextTotal>
                <s.SpacerMedium />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <>
                    <s.Container ai={"center"} jc={"center"}>
                      <s.SpacerSmall />
                      <CTNButton
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(connect());
                          getData();
                        }}
                      >
                        CONNECT Wallet
                        <img
                          style={{ width: 30, paddingLeft: 10 }}
                          src={"/config/images/mm.svg"}
                        />
                      </CTNButton>
                      {blockchain.errorMsg !== "" ? (
                        <>
                          <s.SpacerSmall />
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--accent-text)",
                              fontFamily: "coder",
                              fontSize: 20,
                            }}
                          >
                            {blockchain.errorMsg}
                          </s.TextDescription>
                        </>
                      ) : null}
                    </s.Container>
                  </>
                ) : (
                  <>
                    <s.AmountContainer
                      style={{
                        border: brd,
                        boxShadow: bxsh,
                      }}
                    >
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementtokens();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.TEXTamount>
                        &ensp;&ensp;&ensp;&ensp;{tokens}&ensp;&ensp;&ensp;&ensp;
                      </s.TEXTamount>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementtokens();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.AmountContainer>
                    <s.SpacerSmall />
                    <Maxbtn
                      onClick={(e) => {
                        e.preventDefault();
                        settokens(CONFIG.MAX_PER_TX);
                      }}
                    >
                      SetMax
                    </Maxbtn>
                    <s.SpacerSmall />
                    <s.SpacerSmall />
                    <s.TextTotal style={{ color: "black" }}>
                      Total&emsp;&emsp;&emsp;&emsp;&emsp;
                      {(CONFIG.DISPLAY_COST * tokens)
                        .toString()
                        .substring(0, 6)}{" "}
                      {CONFIG.NETWORK.SYMBOL}
                    </s.TextTotal>
                    <s.SpacerSmall />
                    <s.SpacerXSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"column"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? (
                          <Loader speed="fast" content="Minting..." />
                        ) : (
                          "MINT"
                        )}
                      </StyledButton>
                    </s.Container>
                    <s.SpacerXSmall />
                    <s.TextSubTitle style={{ fontSize: 15 }}>
                      Max {CONFIG.MAX_PER_TX} Per Tx
                    </s.TextSubTitle>
                    <s.SpacerXSmall />
                    <s.TextSubTitle
                      style={{ textAlign: "center", fontSize: "1rem" }}
                    >
                      {feedback}
                    </s.TextSubTitle>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>

        <s.SpacerLarge />
        <s.SecContainer id="story">
          <s.TextTitle>Bored Ape Yacht Club</s.TextTitle>
          <s.TextTitle>Yuga Labs</s.TextTitle>
          <s.SpacerLarge />
          <s.TextP>
          Satirical Collections History
            <br></br>
            <br></br>
            All Started with Ryder Ripps recent NFT work has been centered
            around provocations and inquiries regarding the nature of NFT,
            provenance and digital ownership. Provenance has always been the
            definitive aspect in establishing an artwork’s meaning and value.
            The technology of NFTs is widely misunderstood, but in its greatest
            form, it enables an immutable trace of origin in time to the
            publisher/creator of a digital work.
            <br></br>
            <br></br>
            Since December of 2021, RR have been investigating the most
            prominent NFT project, Bored Ape Yacht Club and its creators, Yuga
            Labs. Through months of intensive research, RR and other community
            members have discovered extensive connections between BAYC and
            subversive internet nazi troll culture. You can read the findings at:
             <a href="https://GordonGoner.com">GordonGoner.com</a> made by Ryder Ripps, warning this website
            contains sensitive content not suitable for children.
            <br></br>
            <br></br>
            On Wednesday, May 13th 2022, Ryder Ripps began creating new work in
            the form of NFTs, based on the BAYC images. Through the process of
            “re-minting”, the original BAYC images are recontextualized –
            illuminating truths about their origins and meanings as well as the
            nature of Web3 – the power of NFTs to change meaning, establish
            provenance and evade censorship.
            <br></br>
            <br></br>
            On April 2022, NFT2626 began Minting Otherdeed for Otherside NFTS as Contemporary Conceptual Narrative Artwork. OtherDeed
            just like RR/BAYC uses satire and appropriation to protest and
            educate people regarding Otherdeed for Otherside and the framework
            of NFTs. The work is an extension of and in the spirit of other
            artists who have worked within the field of appropriation art.
            <br></br>
            <br></br>
            OtherDeed uses the ERC721A standard, which saves significant gas
            fees for minting. you can mint multiple NFTs at about the same cost
            as minting a single NFT. Thanks to the Azuki team who leaders have
            been exposed by the web3 pioneer @Pauly0x.
            <br></br>
            <br></br>
            NFT2626
          </s.TextP>
          <br></br>
            <br></br>
          <img src="/config/images/2.gif" />
        </s.SecContainer>

        <s.SecContainer id="sneak">
          <s.TextTitle>Sneak Peaks</s.TextTitle>
          <s.SpacerLarge />
          <s.CBOX>
            <Carousel autoplay className="custom-slider">
              <img src="/config/images/1.png" />
              <img src="/config/images/2.png" />
              <img src="/config/images/3.png" />
              <img src="/config/images/4.png" />
              <img src="/config/images/5.png" />
            </Carousel>
          </s.CBOX>
        </s.SecContainer>

        <s.SecContainer id="faq">
          <s.TextTitle>FAQ</s.TextTitle>
          <s.SpacerLarge />
          <PanelGroup
            style={{ width: "80%", borderColor: "#A9D0D2" }}
            accordion
            bordered
          >
            <Panel header="What is a Otherdeed ?" defaultExpanded>
              <s.TextP style={{ textAlign: "left" }}>
                Satirical Conceptual Narrative Art Appropriation by @nft2626
                where images are recontextualized – illuminating truths about
                their origins and meanings. Following the path made by Ryder Ripps
                with his work on RRBAYC Collection and other Web3 pionner like
                Pauly.
              </s.TextP>
            </Panel>
            <Panel header="how can i mint">
              <s.TextP style={{ textAlign: "left" }}>
                Connect with metamask to Ethereum Mainnet and proceed
              </s.TextP>
            </Panel>
            <Panel header="Are the original devs involved?">
              <s.TextP style={{ textAlign: "left" }}>
                No, @NFT2626 is the only Artist/Dev behind the Conceptual Art.
              </s.TextP>
            </Panel>
            <Panel header="Where are the original images stored?">
              <s.TextP style={{ textAlign: "left" }}>
                All images and metadata are securely stored on
                IPFS.
              </s.TextP>
            </Panel>
            <Panel header="What the future of this project?">
              <s.TextP style={{ textAlign: "left" }}>
                There is no Rodmap its an Artistic Performance to denounce
                Racism and Antisemitism hiding behind NFTs Collections
              </s.TextP>
            </Panel>
            <Panel header="Who runs the Otherdeed ?">
              <s.TextP style={{ textAlign: "left" }}>
                Otherdeed is a fully decentralized community with no leader.
                Anyone is free to contribute. No approval is needed. We run
                autonomously.
              </s.TextP>
            </Panel>
          </PanelGroup>
        </s.SecContainer>

        <s.SecContainer id="">
          <s.socialDiv>
            <a href={CONFIG.Twitter} target={"_blank"}>
              <s.Icons src="/config/images/twitter.svg" alt="twitter" />
            </a>
            <a href={CONFIG.MARKETPLACE_LINK} target={"_blank"}>
              <s.Icons src="/config/images/opensea.svg" alt="opensea" />
            </a>
          </s.socialDiv>
          <s.SpacerLarge />
          <s.TextP>Copyright © 2022 {CONFIG.NFT_NAME}</s.TextP>
        </s.SecContainer>

        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
