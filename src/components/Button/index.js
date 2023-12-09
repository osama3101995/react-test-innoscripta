import React from 'react'
import "./styles.scss";
import { Link } from 'react-router-dom';

function Button(props) {
    const buttonClasses = `${props.className ?? ''} button ${props.disabled ? '' : (props.type ?? 'plain')}`
    

    if(props?.behavior === "link") {

        return props.href ? (
            <a
                {...props}
                className={buttonClasses}
                id={props.id ?? ''}
                onClick={props.onClick ? () => props.onClick() : ()=>{}}
                >
                {props.children}
                </a>
        ) : (
            <Link
                {...props}
                className={buttonClasses}
                id={props.id ?? ''}
                onClick={props.onClick ? () => props.onClick() : ()=>{}}
                >
                {props.children}
                </Link>
        )
        

    }

    return (
        <button
            {...props}
            className={buttonClasses}
            id={props.id ?? ''}
            onClick={props.onClick ? () => props.onClick() : ()=>{}}

        >
            {props.children}
        </button>
    )

   

}

export default Button