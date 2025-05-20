import {useRef, useState} from "react"

function AskQuery()
{
    let [text, setText] = useState("")
    let inputRef = useRef()
    let buttonRef = useRef()

    async function ragResponse()
    {
        try{
        let response = await fetch("http://localhost:8000//ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query: `${inputRef.current.value}`})
        })
            let data = await response.json()
            console.log(data.answer)
            let cleanedText = data.answer.replace(/\*+/g, "")
            let seperatedText = cleanedText.split(".")
            console.log(seperatedText)
            setText(cleanedText)
        }catch(e)
        {
            console.log(e)
        }
    }

    return(
        <div className="query-container">
            <h1>All Laws ⚖️</h1>
            <input ref={inputRef} type="text" placeholder="Ask........." name="query-input"></input><br></br>
            <button ref={buttonRef} onClick={() => ragResponse()}>Search</button><br></br>
            <div className="response-area">{text}</div>
        </div>
    )
}

export default AskQuery