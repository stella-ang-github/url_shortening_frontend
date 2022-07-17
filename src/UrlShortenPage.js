import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import urlPic from "../src/img/link.png";
import Button from "@mui/material/Button";
import validator from "validator";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import createShortenURL from "./api/urlAPI";

const UrlShorten = () => {
  const [url, setUrl] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shortenLink, setShortenLink] = useState("");

  const onSubmit = async () => {
    setIsLoading(true);
    if (!validator.isURL(url)) {
      setInvalidInput(true);
      return;
    }

    await createShortenURL(url).then((result) => {
      setShortenLink(result.shortUrl);
      setIsLoading(false);
    });
  };

  const onChange = (val) => {
    setInvalidInput(false);
    if (!validator.isURL(val.target.value)) {
      setInvalidInput(true);
    }
    setUrl(val.target.value);
  };

  return (
    <ContentDiv>
      <StyledBox>
        <Stack spacing={3}>
          <StyledImg src={urlPic} alt="Url Logo" />
          <Title>URL Shorten Service</Title>
          <StyledStack direction="row" justifyContent="center" spacing={2}>
            <StyledTextField
              required
              id="outlined-required"
              label="Enter URL"
              onChange={onChange}
              color={invalidInput ? "warning" : "primary"}
            />
            <StyledButton onClick={onSubmit} variant="contained">
              Shorten
            </StyledButton>
          </StyledStack>
          {invalidInput && <StyledErrorMsg>Invalid Input</StyledErrorMsg>}
          <br />
          {shortenLink !== "" && (
            <>
              <StyledSuccessMsg>
                Link has been shorten successfully.{" "}
              </StyledSuccessMsg>
              <StyledStack direction="row" justifyContent="center" spacing={3}>
                <StyledDiv>
                  <StyledSpan>{shortenLink}</StyledSpan>
                  &nbsp; &nbsp;
                  <StyledCopyButton
                    variant="contained"
                    onClick={navigator.clipboard.writeText(shortenLink)}
                  >
                    Copy
                  </StyledCopyButton>
                </StyledDiv>
              </StyledStack>
            </>
          )}
        </Stack>
      </StyledBox>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ContentDiv>
  );
};

export default UrlShorten;

const StyledSpan = styled.span`
  padding-left: 5px;
  font-size: 12px;
`;
const StyledDiv = styled.div`
  background-color: #eee2dc;
  border-radius: 5px;
`;

const StyledCopyButton = styled(Button)`
  && {
    background-color: white;
    position: relative;
    color: black;
    font-weight: 600;
  }
`;

const StyledSuccessMsg = styled.h3`
  text-align: center;
`;

const StyledErrorMsg = styled.p`
  color: red;
  text-align: center;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #123c69;
  }
`;

const StyledBox = styled(Box)`
  width: 100%;
  padding: 10px;
  margin: auto;
  align-items: center;
`;

const StyledImg = styled.img`
  @media only screen and (min-width: 280px) {
    width: 100px;
    height: 100px;
  }

  @media only screen and (min-width: 360px) {
    width: 100px;
    height: 100px;
  }

  @media only screen and (min-width: 375px) {
    width: 100px;
    height: 100px;
  }

  @media only screen and (min-width: 390px) {
    width: 100px;
    height: 100px;
  }

  @media only screen and (min-width: 540px) {
    width: 100px;
    height: 100px;
  }

  @media only screen and (min-width: 667px) {
    width: 100px;
    height: 100px;
  }

  @media only screen and (min-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media only screen and (min-width: 830px) {
    width: 100px;
    height: 100px;
  }

  @media only screen and (min-width: 912px) {
    width: 100px;
    height: 100px;
  }
  @media only screen and (min-width: 992px) {
    width: 100px;
    height: 100px;
  }
  @media only screen and (min-width: 1200px) {
    width: 100px;
    height: 100px;
  }

  width: 200px;
  height: 200px;
  margin: auto;
`;

const StyledStack = styled(Stack)`
  margin: auto;
`;

const StyledTextField = styled(TextField)`
  width: 60%;
  margin: auto;
`;

const ContentDiv = styled.div`
  background-color: #ffffff;
  border-radius: 10px;

  @media only screen and (min-width: 280px) {
    width: 37vh;
    height: 80vh;
}

  @media only screen and (min-width: 360px) {
    width: 42vh;
    height: 80vh;
}

  @media only screen and (min-width: 375px) {
      width: 50vh;
      height: 80vh;
  }

  @media only screen and (min-width: 390px) {
    width: 42vh;
    height: 80vh;
    }

    @media only screen and (min-width: 540px) {
        width: 65vh;
    }

    @media only screen and (min-width: 667px) {
        width: 100vh;
    }

  @media only screen and (min-width: 768px) {
    width: 60vh;
  }

  @media only screen and (min-width: 830px) {
    width: 120vh;
}

@media only screen and (min-width: 912px) {
    width: 60vh;
}
  @media only screen and (min-width: 992px) {
    width: 120vh;
  }
  @media only screen and (min-width: 1200px) {
    width: 130vh;
  }

  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display flex
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin: auto;
  color: #19181a;
  display: block;
`;