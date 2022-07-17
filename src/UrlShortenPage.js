import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import urlPic from "../src/img/link.png";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import createShortenURL from "./api/urlAPI";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const UrlShorten = () => {
  const [url, setUrl] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shortenLink, setShortenLink] = useState("");
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const onSubmit = async () => {
    setCopiedSuccess(false);
    setIsLoading(true);
    if (!urlPatternValidation(url)) {
      setInvalidInput(true);
      return;
    }

    await createShortenURL(url).then((result) => {
      setShortenLink(result.shortUrl);
      setIsLoading(false);
    });
  };

  var urlPatternValidation = (URL) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(URL);
  };

  const onChange = (val) => {
    setInvalidInput(false);
    if (!urlPatternValidation(val.target.value)) {
      setInvalidInput(true);
    }
    setUrl(val.target.value);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const onClickCopied = () => {
    navigator.clipboard.writeText(shortenLink);
    setCopiedSuccess(true);
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
            <StyledButton
              disabled={invalidInput}
              onClick={onSubmit}
              variant="contained"
            >
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
                  <StyledCopyButton variant="contained" onClick={onClickCopied}>
                    Copy
                  </StyledCopyButton>
                </StyledDiv>
                {copiedSuccess && (
                  <Snackbar
                    open={copiedSuccess}
                    autoHideDuration={1500}
                    onClose={() => setCopiedSuccess(false)}
                  >
                    <Alert severity="success" sx={{ width: "100%" }}>
                      Link copied!
                    </Alert>
                  </Snackbar>
                )}
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
  @media only screen and (max-width: 359px) {
    width: 130px;
    font-size: 10px;
  }
  @media only screen and (min-width: 360px && max-width: 419px) {
    width: 190px;
    font-size: 10px;
  }
  @media only screen and (min-width: 420px && max-width: 700px) {
    width: 220px;
  }
  padding-left: 5px;
  font-size: 12px;
  display: inline-block;
  width: 340px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
