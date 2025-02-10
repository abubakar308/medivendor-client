import { useEffect, useState } from "react";


const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);
  
    return <div className="text-white text-sm"> 
    <span>{time.toLocaleTimeString()}</span> <br />
    <span>{time.toLocaleDateString()}</span> 
  </div>
    
};

export default Clock;