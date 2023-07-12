import Options from "./Options";
function Questions(props) {
  // console.log(props.question);
  const isClicked = props.answer !== null;
  return (
    <>
      <h4>{props.question.question} </h4>
    <Options question={props.question} isClicked={isClicked} answer={props.answer} dispatch={props.dispatch}></Options>
     
    </>
  );
}

export default Questions;
