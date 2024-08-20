import "./Main.css"
import { assets } from "../assets/assets"
import { useContext } from "react"
import { Context} from "../Store/Context"

export const Main = () => {
  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)

  return (
    <div className="main">
      <div className="main-top">
        <h3>Gemini</h3>
        <img src={assets.user_icon} alt="" />

      </div>
      <div className="container">
      {!showResult ? (
        <>
          <div className="heading">
            <h1 className="head1">Hello, Dev.</h1>
            <h1 className="head2">How can I help you today?</h1>
          </div> 

          <div className="cards">
            <div className="card">
              <p>Suggest beautiful places to see on an upcoming road trip</p> 
              <img src={assets.compass_icon} alt="Compass Icon" />
            </div>
            <div className="card">
              <p>Briefly summarize this concept: urban planning</p> 
              <img src={assets.bulb_icon} alt="Bulb Icon" />
            </div>
            <div className="card">
              <p>Brainstorm team bonding activities for our work retreat</p> 
              <img src={assets.message_icon} alt="Message Icon" />
            </div>
            <div className="card">
              <p>Tell me about React js and React native</p> 
              <img src={assets.code_icon} alt="Code Icon" />
            </div>
          </div>
        </>
      ) : 
        <div className="result">
          <div className="result-title">
            <img className="user" src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading?
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
            :
            <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
          </div>

        </div>
      
      
      
      }
      </div>
      

      <div className="main-bottom">
        <div className="input-box">
          <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter prompt here."/>
          <div className="images">
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            {input?<img src={assets.send_icon} alt="" onClick={()=>onSent(input)} />:null}
          </div>
        </div>
        <p className="bottom-para">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
      </div>

    </div>
  )
}
