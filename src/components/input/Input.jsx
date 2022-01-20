import React from 'react';

export default function Input({...props}) {
  
  if(props.type==='select'){
    return (
      <select {...props}> 
        <option value="">Select the option</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="male">Transgender</option>
      </select>
    )
  }
  else{
    return <input {...props}/>;
  }
}
