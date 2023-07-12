import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishSRC from "./FinishSRC";
import Footer from "./Footer";
import Timer from "./Timer";

const SEC = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining : null,

};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "Error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining : state.questions.length * SEC ,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextButton":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highScore: state.highScore,
        questions: state.questions,
        status: "ready",
        secondRemaining : 10,
      };
      case "tick" :
        return {
          ...state,
          secondRemaining : state.secondRemaining - 1,
          status : state.secondRemaining === 0 ? "finished" : state.status,
        }
    default:
      throw new Error("Unknown Actin error");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;
  const maxPoints = state.questions.reduce((pre, cur) => pre + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <div className="app">
        <Header></Header>

        {/* <p>1/15</p>
        <p>Question ? </p> */}
        <Main>
          {" "}
          {state.status === "loading" ? <Loader /> : " "}
          {state.status === "error" ? <Error /> : " "}
          {state.status === "ready" ? (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          ) : (
            " "
          )}
          {state.status === "active" ? (
            <>
              <Progress
                index={state.index}
                numQuestions={numQuestions}
                points={state.points}
                maxPoints={maxPoints}
                answer={state.answer}
              ></Progress>
              <Questions
                question={state.questions[state.index]}
                dispatch={dispatch}
                answer={state.answer}
              />

              <Footer>
                <NextButton
                  dispatch={dispatch}
                  answer={state.answer}
                  index={state.index}
                  numQuestions={numQuestions}
                />
                <Timer dispatch={dispatch} secondRemaining={state.secondRemaining} ></Timer>
              </Footer>
            </>
          ) : (
            " "
          )}
          {state.status === "finished" && (
            <FinishSRC
              dispatch={dispatch}
              points={state.points}
              maxPoints={maxPoints}
              highScore={state.highScore}
            ></FinishSRC>
          )}
        </Main>
      </div>
    </>
  );
};

export default App;
