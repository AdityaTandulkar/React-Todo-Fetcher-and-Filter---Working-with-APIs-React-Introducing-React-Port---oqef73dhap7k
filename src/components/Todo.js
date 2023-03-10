 import React from 'react';

 export const Todo  = ({id, title, completed}) =>{
    return (
        <div id={'todo-'+id} className="todo">
            <div className="todo-title todo-text">{title}</div>
            <div className="todo-status">{
                completed ? "Complete" : "Incomplete"
            }</div>
        </div>
    )
 }