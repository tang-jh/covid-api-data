import React, {useState, useEffect} from 'react'

const Infocard = () => {

    const APIADD = `https://covid-api.mmediagroup.fr/v1/cases?ab=sg`;

    const [status, setStatus] = useState("idle")
    const [info, setInfo] = useState("COVID_DATA")
    useEffect(()=> {
        const fetchData = (async () => {
        setStatus("pending");
        try{
            const res = await fetch(APIADD);
            const data = await res.json();
            setStatus("resolved");
            // console.log(data)
            setInfo(data);
        } catch(error) {
            setStatus("error");
        }})();
    },[])


    return (
      <div>
        <p>{`Country: ${info?.All?.country}, Population: ${info?.All?.population}`}</p>
      </div>
    );
}

export default Infocard
