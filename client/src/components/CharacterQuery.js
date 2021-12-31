import React, { useState } from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

const CharacterQuery = () => {
    const [ characterName, setCharacterName ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/character/'+characterName);
    }

    const handleInputChange = (e) => {
        setCharacterName(e.target.value)
    }

    return (
        <Form
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        >
            {/* <Form.Label>form label</Form.Label> */}
            <InputGroup className='mt-3'>
                <Form.Control type='text' placeholder='Character Name'/>
                <Button variant="primary" type="submit">Find Character!</Button>
            </InputGroup>
            {/* <Form.Text className='text-muted'>Who are we looking at today?</Form.Text> */}
        </Form>
    );
}

export default CharacterQuery;