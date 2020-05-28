import React, { useState, useEffect } from 'react';

function Child(props){
  // console.log(props.name())
  return <h1></h1>
}

// sort排序
const sort = (array,callback)=>{
  for(const n in array){
    for(const m in array){
      if(callback(array[n],array[m]) < 0){
        const temp = array[n];
        array[n] = array[m];
        array[m] = temp;
      }
      
    }
  }
  return array;
}


function Comment() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
    console.table(sort([2,3,1,4,6,9],(a,b)=>{return a-b}))
  });

  let pElement

    const changeColor =()=>{
      // pElement.style.color = 'red'
      console.log('aaaaaaa')
  }

  return (
    <div>
      <p ref={p=> pElement=p} >You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      {/* <button onClick={changeColor}>log</button> */}
      <Child name={changeColor} />
    </div>
  );


  

 







  
}

export default Comment;