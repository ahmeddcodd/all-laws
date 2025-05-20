import { useRef, useState, useEffect } from "react"
import { Typewriter } from 'react-simple-typewriter';
import ResponseBox from "./component/ResponseBox"
function ChatLaw()
{
    let [responses, setResponses] = useState([])
    let inputRef = useRef("")
    let scrollViewRef = useRef()

    useEffect(() => {
        requestAnimationFrame(() => {
            scrollViewRef.current?.scrollIntoView({ behavior: "smooth" });
          });
    },[responses])

    async function askQuery()
    {
        setResponses((prev) => [...prev, [inputRef.current.value, true]])
        console.log("Working")
        try
        {
            let response = await fetch("http://localhost:8000/ask", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({query: inputRef.current.value})
            })
            let data = await response.json()
            console.log(data.answer)
            let cleanedText = data.answer.replace(/\*+/g, "")
            setResponses((prev) => [...prev, [cleanedText, false]])
        }catch(e)
        {
            console.log(e)
        }
    }

    return (
        <div className = "main-container">
            <div className = "chat-container">
                <div className={responses.length === 0?"unscrollWrapper" : "scrollWrapper"}>
                    {
                        responses.length === 0? (<div className="substitute-text"><h1><Typewriter words={["ALL PAK LAWS 🧑‍⚖️"]}
                            typeSpeed={100}
                            cursor
                            cursorStyle=" =>"
                            loop={1}
                            onLoopDone={() => setShowCursor(false)}></Typewriter></h1></div>):
                    (responses.map((response, index) => 
                    (<ResponseBox key={index} isUser = {response[1]} answer = {response[0]}></ResponseBox>
                    )))}
                    <div ref={scrollViewRef}></div>
                </div>
            </div>
            <div className  = "search-container">
                <input type="text" ref={inputRef} placeholder="Search" onKeyDown={(e) => {if(e.key === "Enter") askQuery()}}></input><br></br>
                <button onClick={() => askQuery()}>➡️</button>                      
            </div>
        </div>
    )
}

export default ChatLaw