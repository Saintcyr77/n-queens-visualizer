import React, { useContext, useEffect, useState } from "react";
import nqueens from "../NQueens/nqueens.css";
import cloneDeep from "lodash/cloneDeep";
import { Appcontext } from "../../App";
import { useRef } from "react";

const Nqueens = () => {
  const [n, setN] = useState(0);
  const [problem, setProblem] = useState(0);
  const [step, setStep] = useState(0);
  const { setResult, result } = useContext(Appcontext);
  const ansRef = useRef([]);
  let dumb = [];

  useEffect(() => {
    setResult([]);
    ansRef.current = [];
    setProblem(0);
  }, [n]);

  const settingCounter = () => {
    if (problem > 0) {
      setProblem((prev) => prev - 1);
    }
  };

  const handleClick = () => {
    solveNQueens(n);
    setStep((prev) => prev + 1);
  };

  const solveNQueens = (n) => {
    const currentN = n;
    const board = Array.from({ length: currentN }).map(() =>
      Array.from({ length: currentN }).fill(".")
    );

    backtrack(0, board, currentN);
    console.log(board);
    console.log(`inside result ${result}`);
  };

  function backtrack(col, board, n) {
    console.log(n);
    if (col == n) {
      setResult(board.map((row) => row.join("")));
      ansRef.current.push(cloneDeep(board.map((row) => row.join(""))));
      // console.log(`inside ans ${ans}`);

      console.log("i got here");
      return;
    }

    for (let row = 0; row < n; row++) {
      if (isSafe(row, col, board, n)) {
        console.log("inside safe");
        board[row][col] = "Q";
        backtrack(col + 1, board, n);
        board[row][col] = ".";
      }
    }
  }

  function isSafe(row, col, board, n) {
    let i = row;
    let j = col;
    console.log(`is safe n ${n}`);
    while (j >= 0) {
      if (board[i][j] == "Q") {
        return false;
      }
      j--;
    }
    j = col;

    while (i >= 0 && j >= 0) {
      if (board[i][j] == "Q") {
        return false;
      }
      i--;
      j--;
    }
    i = row;
    j = col;

    while (i < n && j >= 0) {
      if (board[i][j] === "Q") {
        return false;
      }
      i++;
      j--;
    }

    return true;
  }
  dumb.push(ansRef.current);
  console.log(result);
  console.log(`this is the length of my ansRef ${ansRef.current}`);
  console.log(`this is my ans ${ansRef.current}`);
  console.log(`this is my real ans ${ansRef.current.length}`);
  console.log(`this is my dumb ${dumb}`);
  console.log(`this is my index ${problem}`);

  return (
    <div className="container-fluid">
      {step === 0 && (
        <div class="form-group my-form">
          <label for="exampleInputEmail1">
            Please enter The number of Queens
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Queens"
            onChange={(e) => setN(e.target.value)}
          />
          <small id="emailHelp" class="form-text text-muted">
            Phew Phew
          </small>
          <div className="btn-div">
            <button
              className="btn my-btn"
              style={{ color: "white", backgroundColor: "red" }}
              onClick={handleClick}
            >
              Solve
            </button>
          </div>
        </div>
      )}
      {step == 1 && (
        <div className="container-fluid queens-container">
          <div className="inside-style">
            {ansRef.current.map((row, iter) => (
              <div>
                {iter == problem && (
                  <div style={{ display: "flex", gap: "5px" }}>
                    {row.map((char, index) => (
                      <div key={index}>
                        {char.split("").map((element) => (
                          <>
                            {element === "Q" ? (
                              <div
                                style={{
                                  backgroundColor: "white",
                                  marginBottom: "10px",
                                  padding: "10px",
                                }}
                              >
                                <img
                                  src="crown.png"
                                  alt="Q"
                                  height="30px"
                                  width="30px"
                                ></img>
                              </div>
                            ) : (
                              <div
                                style={{
                                  backgroundColor: "white",
                                  marginBottom: "10px",
                                  padding: "10px",
                                }}
                              >
                                <img
                                  src="strategy.png"
                                  alt="Q"
                                  height="30px"
                                  width="30px"
                                ></img>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="button-containers">
            <div className="inside-inside-buttons">
              <button
                className="btn bg-primary text-light"
                onClick={() => setProblem((prev) => prev + 1)}
              >
                Next Solution
              </button>

              <button
                className="btn bg-primary  text-light"
                onClick={settingCounter}
              >
                Prev Solution
              </button>
              <button
                className="btn bg-primary  text-light"
                onClick={() => setStep((prev) => prev - 1)}
              >
                Go Back
              </button>
            </div>
          </div>
          

          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Total Solutions: {ansRef.current.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(Nqueens);
