import React from "react";

import {
  TextField,
  Box,
  Typography,
  Button,
  Container,
  Chip,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import { fetchWords, IWord } from "../actions/FetchWords";

import { TransitionGroup, CSSTransition } from "react-transition-group";

const FindWord = () => {
  const [searchWord, setSearchWord] = React.useState("");
  const [rhymeWords, setRhymeWords] = React.useState<IWord[]>([]);
  const [isFetching, setIsFetching] = React.useState(0);

  const handleSearch = async () => {
    setIsFetching(1);
    const res: IWord[] = await fetchWords(searchWord);
    setRhymeWords(res);
    setIsFetching(2);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#1976d2",
          py: 3,
        }}
      >
        <Container>
          <Typography
            variant="h5"
            component="div"
            sx={{ mr: 1, color: "white" }}
          >
            Find the words that rhyme with
          </Typography>
        </Container>
      </Box>
      <Container>
        <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
          <TextField
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            variant="outlined"
            label="Type a word"
            inputProps={{
              "data-testid": "word-input",
            }}
          />
          <Button
            variant="contained"
            size="large"
            sx={{ ml: 3, borderRadius: "30px", position: "relative" }}
            disabled={isFetching === 1}
            onClick={handleSearch}
            data-testid="search-button"
          >
            Search
            {isFetching === 1 && (
              <CircularProgress
                size={28}
                thickness={8}
                sx={{
                  color: "#226644",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-14px",
                  marginLeft: "-14px",
                }}
              />
            )}
          </Button>
        </Box>
        {rhymeWords.length === 0 && isFetching === 2 && (
          <Typography sx={{ mr: 1 }}>No words found.</Typography>
        )}
        <TransitionGroup>
          {rhymeWords.map((word: IWord, i) => {
            const tooltipTitle = `${word.numSyllables} Syllables`;
            return (
              <CSSTransition
                key={word.word}
                classNames={{
                  enterActive: "animate__animated animate__fadeInUp",
                  exitActive: "animate__animated animate__fadeOut",
                }}
                timeout={300}
              >
                <Tooltip title={tooltipTitle} arrow>
                  <Chip
                    label={word.word}
                    sx={{ m: 1 }}
                    color="primary"
                    variant="outlined"
                    data-testid="word-chip"
                  />
                </Tooltip>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </Container>
    </>
  );
};

export default React.memo(FindWord);
