function NextButton(props) {

    if(props.answer === null ) return null;
     console.log(props.index);
     console.log(props.numQuestions);
    if(props.index < props.numQuestions  - 1)
    return (
     <>
    <button className="btn btn-ui" onClick={() =>{
        props.dispatch({type:"nextButton" })
    }}>
        Next
    </button>
    </>
    );
    if(props.index === props.numQuestions - 1)
    return (
     <>
    <button className="btn btn-ui" onClick={() =>{
        props.dispatch({type:"finished" })
    }}>
        Finished
    </button> 
    </> 
    );
}

export default NextButton;