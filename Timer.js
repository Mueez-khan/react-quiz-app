import { useEffect } from "react";
function Timer({ dispatch, secondRemaining }) {
  const mints = Math.floor(secondRemaining / 60);
  const sec = secondRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <>
      <p className="timer">
      {mints < 10 && "0"}{mints}:{sec < 10 && "0"}{sec}
      </p>
    </>
  );
}

export default Timer;
