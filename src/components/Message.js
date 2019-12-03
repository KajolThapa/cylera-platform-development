import React from 'react';
import { List, Header} from "semantic-ui-react";

export const Message = ({message}) => {
    console.log(message)
    return (
        <List>
            {message.bts.map(m => {
                // console.log(m)
                return (
                    <List.Item key={m.sumOfBytes}>
                        <Header>{m.sumOfBytes}</Header>
                    </List.Item>
                )
            })}
            {/* {message.map(m => {
                return (
                    m.points.map( num => {
                        return (
                            <List.Item key={num}>
                             <Header>{num}</Header>
                           </List.Item>   

                        )

                    }
                        
                    )
                     
                )    
            })} */}
        </List>
       
    )

}