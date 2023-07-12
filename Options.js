function Options(props) {
    return ( <>

<div className="options">
        {props.question.options.map((option, index) => (
          <button
            className={`btn btn-option ${
              index === props.answer ? "answer" : "" }
              ${ props.isClicked ? index === props.question.correctOption ? 'correct' : 'wrong' : ""}` }
            key={option}
            disabled={props.isClicked}
            onClick={() => {
              props.dispatch({ type: "newAnswer", payload: index });
            }}
          >
            {option}
          </button>
        ))}
      </div>

    </> );
}

export default Options;