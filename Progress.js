function Progress(props) {
    return ( 
        <>
            <header className="progress" >
            <progress max={props.numQuestions} value={props.index + Number(props.answer !== null)} />
                <p>Question <strong >{props.index}</strong> / {props.numQuestions} </p>
                <p>
                    <strong>
                       Points {props.points} / {props.maxPoints}
                    </strong>
                </p>
            </header>
        </>
     );
}

export default Progress;