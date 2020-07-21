import React, { FunctionComponent } from 'react';

//whenever you make a title component, if you don't add the title prop, the ts check will fail
interface ITitleComponentProps {
    title:string
    size:string
}

export const TitleComponent:FunctionComponent<ITitleComponentProps> = (props) => {
    switch(props.size) {
        case 'small': {
            return (
                <h6>{props.title}</h6>
            );
        }
        case 'medium': {
            return (
                <h3>{props.title}</h3>
            );
        }
        case 'large': {
            return (
                <h1>{props.title}</h1>
            );
        }
        default: {
            return (
                <h4>{props.title}</h4>
            );
        }
    }
} 

