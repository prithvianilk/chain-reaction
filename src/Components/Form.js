import React, { useState } from 'react';
import { Button, ButtonGroup } from "@chakra-ui/core";
import { Input } from "@chakra-ui/core";
import '../Styles/Form.css';

const Form = () => {
    const [srn, SetSRN] = useState("");
    
    const onSubmit = (gender) => {
        console.log(gender, srn);
    }
    
    return (
        <form className = "form">
            <Input placeholder = "SRN" value = {srn} onChange = {(e) => SetSRN(e.target.value)}/>
            <div className = "btn-group">
                <ButtonGroup spacing={10}>
                    <Button variantColor="blue" size = "md" onClick = {() => onSubmit(false)} borderRadius = "28px" padding = "0 25px">Boy</Button>
                    <Button variantColor="pink" size = "md" onClick = {() => onSubmit(true)} borderRadius = "28px" padding = "0 25px">Girl</Button>
                </ButtonGroup>
            </div>            
        </form>
    )
}

export default Form;