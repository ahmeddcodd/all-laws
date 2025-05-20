import { useState } from "react"
function ResponseBox({isUser, answer})
{
    let [cursor, setCursor] = useState(true)
    return(
        <div className="response-container">
            <h5>{isUser == true? "You😎" : "Law⚖️"}</h5>
            <hr></hr>
            <p>{answer}</p>
        </div>
    )
}

export default ResponseBox