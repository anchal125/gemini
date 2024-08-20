import "./Sidebar.css"
import {assets} from "../assets/assets.js"
import { useContext, useState } from "react"
import { Context } from "../Store/Context.jsx"

export const Sidebar = () => {
  const [Extend,setExtend]=useState(false)
  const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)

  const loadPrompt=async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }


  return (
    <div className="sidebar">
      <div className="top">
        <img className="menu" src={assets.menu_icon} alt="" onClick={()=>{setExtend(prev=>!prev)}} />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {Extend?<p>New Chat</p>:null}
        </div>

        {Extend?
        <div className="recent">
          <p className="recent-title">Recent</p>
          {prevPrompts.map((item)=>{
            return (
            <div className="recent-entry" onClick={()=>loadPrompt(item)}>
            
              <img className="msg" src={assets.message_icon} alt="Message icon" />
              <p>{item.slice(0,18)} ...</p>
    
            </div>
            )
          })

          }
          
          
        </div>:null}
        
      </div>
      <div className="bottom">
        <div>
          <img src={assets.question_icon} alt="" />
          
          {Extend?<p>Help</p>:null}
        </div>
        <div>
          <img src={assets.history_icon} alt="" />
          
          {Extend?<p>Activity</p>:null}
        </div>
        <div>
          <img src={assets.setting_icon} alt="" />
          
          {Extend?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  )
}
