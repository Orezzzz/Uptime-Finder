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
  let [previousactive, setPreviousactive] = useState(true)
  let [nextactive, setNextactive] = useState(null)
  let [yoururlstitle, setYoururlstitle] =useState("Searched URL list")
  let [count, setCount] = useState(0)
  let [hidehistory, setHidehistory] = useState(true)


  

  let {authTokens, searchurl, yoururls, deletedlist, deletedurls} = useContext(AuthContext)

  console.log(urlshistory.length)
  let searchUrl = async (e) =>{
        
    e.preventDefault();
    console.log('searching url status');
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
        console.log(data)
    }
    else{
      setTypeurl("website not available")
      alert('something went wrong')
    }
  }


  useEffect(() => {
    const interval = setInterval(() => {
      urlshistoryList()
      console.log("create Hiistory")
    }, 6000);
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
      console.log(data)
      //setUrlshistory(data)
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
      console.log(data)
      setUrlslist(data)
  } 


  let urlHistory = async (url) =>{
        
    //e.preventDefault();
    console.log('searching url history');
    console.log(url);
    setHistoryurl(url)
    console.log(nextactive)
    console.log(previousactive)
    let response = await fetch('http://127.0.0.1:8000/history/?page='+ (previousactive ?Previous.current:Next.current ), {
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
        console.log(data.count)
        setCount(data.count)
        //console.log(data.next)
        //console.log(data.next[data.next.length - 1])
        //console.log(Number(data.next[data.next.length - 1]) )
        //Next.current=data.next[data.next.length - 1]
        //Previous.current=Number(data.next[data.next.length - 1]) -1
    }
    else{
      alert('something went wrong')
    }
  }

  let deleteUrlHistory = async (url) =>{
        
    //e.preventDefault();
    console.log('deleting history');
    console.log(url);
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
        //setHistory(data.url_name)
        searchedUrls()
        console.log(data)
    }
    else{
      alert('something went wrong')
    }
  }


  let activeUrls = ()=> {
    setActiveurls(true)
    setSearchedurls(null)
    setYoururlstitle("Active Urls")
  }

  let searchUrls = ()=> {
    setActiveurls(null)
    setSearchedurls(true)
    setYoururlstitle("Searched URL list")
  }

  let previousActive =()=> {
    setPreviousactive(true)
    if(Previous.current>1){
      console.log("yes")
      Previous.current = Number(Next.current) - 1
      Next.current = Number(Next.current) - 1
    }

    console.log(Next.current)
    console.log(Previous.current)
    urlHistory(historyurl)
  }

  let nextActive =() =>{
    setPreviousactive(null)
    if(Next.current<(Number(count)/10)){
      Next.current = Number(Next.current) + 1
    Previous.current = Number(Next.current) - 1
    }
    console.log(Next.current)
    console.log(Previous.current)
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
            <h3 className="urllist-h3" key={url.id} onClick={() => {urlHistory(url.url_name); setHidehistory(true)}}><p className="urllist-p" >{url.url_name}</p> 
              <button className="urllist-delete-btn" value="delete" onClick={() => deleteUrlHistory(url.url_name)}> delete </button>
            </h3>
          </div>
        ))}

      {hidehistory&&(<>{activeurls && urlslist.filter(url => url.status.includes('ACTIVE'))  .map((url) => (
                <div className="urllist-container">
                  <h3 className="urllist-h3" key={url.id} onClick={() => urlHistory(url.url_name)}><p className="urllist-p" >{url.url_name}</p> 
                    <button className="urllist-delete-btn" value="delete" onClick={() => deleteUrlHistory(url.url_name)}> delete </button>
                  </h3>
                </div>
              ))}

            <div>
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
                  <button  onClick={()=>setHidehistory(null)}>Hide history</button>
                </>)
              }
              
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