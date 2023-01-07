import React, { useState, useContext, useEffect, useRef } from 'react'
import AuthContext from './../context/AuthContext';

const HomePage = () => {

  let [typeurl, setTypeurl] =useState(null)
  let [urlslist, setUrlslist] =useState([])
  let [urlstatus, setUrlstatus] =useState(null)
  let [urlshistory, setUrlshistory] =useState([])
  let [historyurl, setHistoryurl] =useState(null)
  let [activeurls, setActiveurls] =useState(null)
  let [searchedurls, setSearchedurls] =useState(true)
  let Previous = useRef(1)
  let Next = useRef(2)
  let previousactive = useRef(true)
  let nextactive = useRef(null)
  let [yoururlstitle, setYoururlstitle] =useState("Searched URL list")
  let [count, setCount] = useState(0)
  let [hidehistory, setHidehistory] = useState(null)


  

  let {authTokens, searchurl, yoururls, deletedlist, deletedurls} = useContext(AuthContext)

  let searchUrl = async (e) =>{
        
    e.preventDefault();
    let response = await fetch('http://127.0.0.1:8000/create/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Token ' + String(authTokens)
        },
        body:JSON.stringify({"url_name":e.target.typeurl.value})
    })
    let data = await response.json()
    
    if(response.status === 201){       
        setTypeurl(data.url_name)
        setUrlstatus(data.status)

    }
    else{
      setTypeurl("website not available")
      setUrlstatus("Invalid input")
      
    }
  }


  useEffect(() => {
    const interval = setInterval(() => {
      urlshistoryList()
    }, 60000);
    return () => clearInterval(interval)
    
  },[])
  



  let urlshistoryList = async()=>{
    let response = await fetch('http://127.0.0.1:8000/createhistory/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Token ' + String(authTokens)
        },
      })   
      
      let data = await response.json()
  } 


  useEffect(() => {
    searchedUrls()
  },[typeurl])
  



  let searchedUrls = async()=>{
    let response = await fetch('http://127.0.0.1:8000/urlslist/', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Token ' + String(authTokens)
        },
      })   
      
      let data = await response.json()
      setUrlslist(data)
  } 


  let urlHistory = async (url) =>{
        
    setHistoryurl(url)

    let response = await fetch('http://127.0.0.1:8000/history/?page='+ (previousactive.current ? Previous.current:"") +(nextactive.current ? Next.current:""), {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Token ' + String(authTokens)
        },
        body:JSON.stringify({"url_name":String(url)})
    })
    let data = await response.json()
    
    if(response.status === 200){       
        setUrlshistory(data.results)
        setCount(data.count)
    }
    else{
      alert('something went wrong')
    }
  }

  let deleteUrlHistory = async (url) =>{
        
    let response = await fetch('http://127.0.0.1:8000/urlslist/', {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Token ' + String(authTokens)
        },
        body:JSON.stringify({"url_name":String(url)})
    })
    let data = await response.json()
    
    if(response.status === 200){       
        searchedUrls()
    }
    else{
      alert('something went wrong')
    }
  }


  let activeUrls = ()=> {
    setActiveurls(true)
    setSearchedurls(null)
    setHidehistory(null)
    setYoururlstitle("Active Urls")
  }

  let searchUrls = ()=> {
    setActiveurls(null)
    setSearchedurls(true)
    setHidehistory(null)
    setYoururlstitle("Searched URL list")
  }

  let previousActive =()=> {
    previousactive.current=true
    nextactive.current=null
    if(Previous.current>1){
      
      Previous.current = Number(Previous.current) - 1
      Next.current = Number(Next.current) - 1
    }

    urlHistory(historyurl)
  }

  let nextActive =() =>{
    previousactive.current=null
    nextactive.current=true
    if(Next.current<(Number(count)/10)){
      Next.current = Number(Next.current) + 1
    Previous.current = Number(Next.current) - 1
    }

    urlHistory(historyurl)
  }
  


  return (
    <>
      <div style={{display: searchurl }}>
        <h1 className="search-text">Find the status of the URL</h1><p style={{textAlign:'center'}}>(Example format: https://www.example.com/)</p>
        <form className="search-container"onSubmit={searchUrl}>
          <input className="search-inputbox" type="text" name='typeurl'placeholder='Enter Url'/>
          <input className="search-submit" value="status" type="submit" />
        </form>
        {typeurl && <h2 className="search-result">{typeurl +"   -   "} {urlstatus==="ACTIVE" ? <span style={{color:'green'}}>{urlstatus}</span> : <span style={{color:'Red'}}>{urlstatus}</span>}</h2>}
      </div>
      
      
      <div style={{display: yoururls}}>
        <div className="yourls-button-container">
        <button onClick={activeUrls}>Active urls</button>
        <button onClick={searchUrls}>searched urls</button>
        </div>
        
        <h1 className="yoururls-text">{yoururlstitle}</h1>
      <div className="urllist">
        {searchedurls && urlslist.map((url) => (
          <div className="urllist-container">
            <h3 className="urllist-h3" key={url.id} onClick={() => { Previous.current = 1; Next.current=2;previousactive.current=true; nextactive.current=null; setHidehistory(true); urlHistory(url.url_name);}}><p className="urllist-p" >{url.url_name}</p> 
              <button className="urllist-delete-btn" value="delete" onClick={() => deleteUrlHistory(url.url_name)}> delete </button>
            </h3>
          </div>
        ))}

            {activeurls && urlslist.filter(url => url.status.includes('ACTIVE'))  .map((url) => (
                <div className="urllist-container">
                  <h3 className="urllist-h3" key={url.id} onClick={() => {Previous.current = 1; Next.current=2;previousactive.current=true; nextactive.current=null;setHidehistory(true); urlHistory(url.url_name)}}><p className="urllist-p" >{url.url_name}</p> 
                    <button className="urllist-delete-btn" value="delete" onClick={() => deleteUrlHistory(url.url_name)}> delete </button>
                  </h3>
                </div>
              ))}

              {hidehistory&&(<><div><h1>History</h1>
              {(urlshistory.length !=0) && urlshistory.map((url) => (
                
                  <p className="urllist-h3" key={url.id}>{historyurl} &nbsp;&nbsp;{url.status} &nbsp;&nbsp; {url.created_at}
                  </p>

              ))}
              {count >10 &&
                (
                <>
                  <div>
                    <button  onClick={previousActive}>previous</button> &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={nextActive}>next</button>
                  </div>
                  
                </>)
              }
              <button  onClick={()=>setHidehistory(null)}>Hide history</button>
            </div></>)}
                      
      </div>
      </div>


      <div style={{display: deletedurls}}>

      <h1 className="yoururls-text">Deleted URLS</h1>
      {deletedlist.map((url) => (
        <h3 className="urllist-h3" key={url.id}>{url.url_name} </h3>
      ))}
      </div>    
      
        
    </>
  )
}

export default HomePage