import React, { useState } from 'react'
import { Form , Button} from 'react-bootstrap';
import axios from 'axios';
import { ENDPOINT } from './App';
import { useHistory } from 'react-router';

function Signup() 
{
    const history = useHistory();
    let isLoading = false;
    const [formData, setFormData] = useState({
        display_name: ""
    })

    function handleChange(ev)
    {
        let {target} = ev;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        setFormData({
            [name]: value
        })
    }

    function handleSubmit(ev)
    {
        ev.preventDefault();
        isLoading = true;

        axios.post(`${ENDPOINT}/signup`, formData)
            .then((res) => { 
                if(res.status === 201)
                {
                    localStorage.user_id = res.data.user_id["S"];
                    onSuccess();
                }
                else
                {
                    onFail();
                }

                isLoading = false;
            }
        )
    }

    function onSuccess()
    {
        history.push("/");
    }
    
    function onFail()
    {
        console.log("Something went wrong with signup");
    }

    return (
        <div>
            <h1>Sign Up!</h1>
            <h3>Just input a username and that's all you'll need!</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                type="input"
                placeholder="Display Name"
                name="display_name"
                value={formData.display_name}
                onChange={handleChange}
                />
                <Button 
                type="submit"
                variant="primary"
                disabled={(isLoading || !formData.display_name)}
                >
                    Sign Up    
                </Button>
            </Form>
        </div>
    )
}

export default Signup
