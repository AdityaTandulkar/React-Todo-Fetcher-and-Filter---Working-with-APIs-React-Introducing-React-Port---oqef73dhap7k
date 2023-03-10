import React, {useState, useEffect} from 'react'
import '../styles/App.css';
import { Loader } from './Loader';
import { Todo } from './Todo';
const App = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(true);
    const [isIncompleted, setIsIncompleted] = useState(true);

    function getData(){
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(resp => resp.json())
            .then((resp)=>{
                let temp = [];
                for(let i=0; i<20; i++){
                    temp[i] = resp[i];
                }
                setData(temp);
                setIsLoading(false);
            })

    }

    function checkHandler(e){
        if(e.target.id === "completed-checkbox" && !e.target.checked){
            let temp = data.filter((item)=>{
                return item.completed === true;
            })
            setData(temp);
        }
        else if(e.target.id === "incompleted-checkbox" && !e.target.checked){
            let temp = data.filter((item)=>{
                return item.completed === false;
            })
            setData(temp);
        }
        else{
            getData();
        }
    }

    useEffect(()=>{
        getData()
    },[])

    return (
        <div className="filter-holder">
            {
                isLoading ?
                <Loader />
                :
                <>
                    {
                        data.map((item, idx)=>(
                            (isCompleted && isIncompleted) ? <Todo key={item+idx} id={item.id} title={item.title} completed={item.completed}/>
                            :
                            ((isCompleted && !isIncompleted) ? (item.completed && <Todo key={item+idx} id={item.id} title={item.title} completed={item.completed}/>)
                            :
                            (!isCompleted && isIncompleted) && (!item.completed && <Todo key={item+idx} id={item.id} title={item.title} completed={item.completed}/>))
                        ))
                    }
                    <label htmlFor="completed-checkbox">Show completed</label>
                    <input type="checkbox" id="completed-checkbox" onChange={(e)=>setIsCompleted(e.target.checked)} checked={isCompleted}/>
                    <br />
                    <label htmlFor="incompleted-checkbox">Show incompleted</label>
                    <input type="checkbox" id="incompleted-checkbox" onChange={(e)=>setIsIncompleted(e.target.checked)}checked={isIncompleted}/>
                </>
            }
        </div>
    )
}


export default App;
