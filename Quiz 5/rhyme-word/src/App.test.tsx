import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

const server = setupServer(
  rest.get(
    "https://api.datamuse.com/words?rel_rhy=forgetful",
    (req, res, ctx) => {
      return res(
        ctx.json([
          { word: "fretful", score: 398, numSyllables: 2 },
          { word: "regretful", score: 302, numSyllables: 3 },
          { word: "threatful", score: 129, numSyllables: 2 },
          { word: "netful", score: 28, numSyllables: 2 },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders hero text, word input and search button", () => {
  render(<App />);

  const headingText = screen.getByText(/Find the words that rhyme with/i);
  expect(headingText).toBeInTheDocument();

  const wordInput = screen.getByTestId("word-input");
  expect(wordInput).toBeInTheDocument();

  const searchButton = screen.getByTestId("search-button");
  expect(searchButton).toBeInTheDocument();
});

test("fetch words works", async () => {
  server.use(
    rest.get("/greeting", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<App />);

  const wordInput = screen.getByTestId("word-input");
  let event = { target: { value: "forgetful" } };
  fireEvent.change(wordInput, event);

  const searchButton = screen.getByTestId("search-button");
  fireEvent.click(searchButton);

  await waitFor(() => screen.findByText("fretful"));

  const chips = screen.queryAllByTestId("word-chip");
  expect(chips.length).toBe(4);
  expect(screen.getByText(/fretful/i)).toBeInTheDocument();
  expect(screen.getByText(/regretful/i)).toBeInTheDocument();
  expect(screen.getByText(/threatful/i)).toBeInTheDocument();
  expect(screen.getByText(/netful/i)).toBeInTheDocument();
});
