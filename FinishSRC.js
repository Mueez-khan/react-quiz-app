function FinishSRC(props) {
  const percentage = (props.points / props.maxPoints) * 100;

  let emoji;
  if(percentage === 100) emoji = "🥇";
 if(percentage >= 80 && percentage < 100) emoji = "🥳";
 if(percentage >= 50 && percentage < 80) emoji = "😃";
 if(percentage > 0 && percentage < 50) emoji = "🤔";
if(percentage === 0) emoji = "🤦🏻‍♂️";

  return (
    <>
      <p className="result">
       <spam>{emoji}</spam> Your Scored <strong>{props.points}</strong> Out of {props.maxPoints} ({" "}
        {Math.ceil(percentage)}% )
      </p>
      <p className="highscore">
      ( Highscore : {props.highScore} Points )
      </p>
      <button className="btn btn-ui" onClick={() => props.dispatch({type:"restart"})}>Restart Quiz</button>
    </>
  );
}

export default FinishSRC;
