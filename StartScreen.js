function StartScreen(props) {
    
    const startQuiz = () =>{
        props.dispatch({type: "start"})
    }

    return ( 
        <>
           <div className="start">
           <h2>
            Welcome to the Quiz
           </h2> 
           <h3>{props.numQuestions} Questions to check your React Mastery</h3>
        <button className="btn btn-ui" onClick={startQuiz}>Start Quiz</button>
           </div>
        </>
     );
}

export default StartScreen;