import { createContext } from "react";
import runChat from "../config/gemini"
import { useState } from "react";

export const Context=createContext()

export const ContextProvider=({children})=>{
  const [input,setInput]=useState("")
  const [recentPrompt,setRecentPrompt]=useState("")
  const [prevPrompts,setPrevPrompts]=useState([])
  const [showResult,setShowResult]=useState(false)
  const [loading,setLoading]=useState(false)
  const [resultData,setResultData]=useState('')    

  const delayPara=(index,nextWord)=>{
    setTimeout(()=>{
      setResultData(prev=>prev+nextWord)
    },75*index)
  }

  const newChat=()=>{
    setShowResult(false)

  }

  const onSent= async (prompt)=>{
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response
    if (prompt !==input){
      response=await runChat(prompt)
      
    }
    else{
    setPrevPrompts(prev=>[...prev,input])
    setRecentPrompt(input)
    response=await runChat(prompt)

    }
    let responseArray=response.split("**")
    let newArray=""
    for (let i=0;i<responseArray.length;i++){
      if(i%2==0){
        newArray+=responseArray[i]
      } 
      else{
        newArray+="<b>"+responseArray[i]+"</b>"
      }
    }
    newArray=newArray.split("*").join("</br>")
    newArray=newArray.split(" ")
    for (let i=0;i<newArray.length;i++){
      const nextWord=newArray[i]
      delayPara(i,nextWord+" ")
    }
    setLoading(false)
    setInput("")

  }

  
  const contextValue={
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    loading,
    resultData,
    input,
    setInput,
    showResult,
    newChat

  }

  

  


  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
  
}
