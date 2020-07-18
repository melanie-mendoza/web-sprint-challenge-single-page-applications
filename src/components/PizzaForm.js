import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

// name validation schema
const formSchema = yup.object().shape({
    name: yup.string().required('Name is a required field').min(2, 'That\'s not a name'),
    size: yup.string().required(),
    pepperoni: yup.string(),
    cheese: yup.string(),
    sausage: yup.string(),
    bacon: yup.string(),
    instructions: yup.string()
});

const PizzaForm = () => {
    // state to hold data for form inputs
    const [formState, setFormState] = useState({
        name: '',
        size: '',
        pepperoni: '',
        cheese: '',
        sausage: '',
        bacon: '',
        instructions: ''
    });

    // state for whether the button should be disabled or not.
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // Every time the formState changes, check to see if it passes verification.
    //If it does, then enable the submit button, otherwise disable.
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    // state to hold data for error messages
    const [errorState, setErrorState] = useState({
        name: '',
        size: '',
        pepperoni: '',
        cheese: '',
        sausage: '',
        bacon: '',
        instructions: ''
    });

    // state to set the POST request. 
    const [post, setPost] = useState([]);

    // validation; validate event against the schema
    // use reach() which allows us to test one piece of it a time
    const validateChange = (e) => {
        let value =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        yup
            .reach(formSchema, e.target.name)
            .validate(value)
            .then(valid => {
                console.log('this is valid');
                setErrorState({
                    ...errorState,
                    [e.target.name]: ''
                });
            })
            .catch(err => {
                console.log('this is not valid');
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            });
    };

     // onChange Function
     const inputChange = e => {
        e.persist();
        validateChange(e)
        let value = 
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        // console.log("name is: ", e.target.name);
        setFormState({ ...formState, [e.target.name]: value })
    };

    // onSubmit Function
    // POSTs data to server
    const formSubmit = e => {
        e.preventDefault();
        console.log('form submitted!');

        axios
            .post('https://reqres.in/api/users', formState)
            .then(response => {
                console.log(response)
                setPost(response.data);

                // reset form if successful
                setFormState({
                    name: '',
                    size: '',
                    pepperoni: '',
                    cheese: '',
                    sausage: '',
                    bacon: '',
                    instructions: ''
                });
            })
            .catch(err => console.log(err.response));
    };
    
    return (
        <form onSubmit={formSubmit}>
            <p  className="intake-header">
                Let's get you started! <br/>SCROLL DOWN to make your PIZZA!.
            </p>
            <div className='form-style'>
                <label htmlFor='name' className='nameText'>
                  Name
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formState.name}
                    onChange={inputChange} 
                    data-cy="name"
                />
                </label>
                {errorState.name.length > 0 ? (
                <p className='error'>{errorState.name}</p>
                ) : null}
                <label htmlFor='size' className='sizeDropdown'>
                    Select Size
                    <select
                        value={formState.size}
                        name='size'
                        id='size'
                        onChange={inputChange}
                    >
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                        <option value='extra-large'>Extra Large</option>
                    </select>
                </label>
                <p className="toppingsCheckbox">  Choose Your Toppings 
                <label htmlFor='pepperoni'>
                <input
                    type='checkbox'
                    id='pepperoni'
                    name='pepperoni'
                    checked={formState.pepperoni}
                    onChange={inputChange}
                    />
                    Pepperoni
                </label>
                <label htmlFor='Cheese'>
                <input
                    type='checkbox'
                    id='cheese'
                    name='cheese'
                    checked={formState.cheese}
                    onChange={inputChange}
                />
                    Cheese
                </label>
                <label htmlFor='sausage'>
                <input
                    type='checkbox'
                    id='sausage'
                    name='sausage'
                    checked={formState.sausage}
                    onChange={inputChange}
                />
                    Sausage
                </label>
                <label htmlFor='bacon'>
                <input
                    type='checkbox'
                    id='bacon'
                    name='bacon'
                    checked={formState.bacon}
                    onChange={inputChange}
                    />
                    Bacon
                </label>
              </p>
              <label htmlFor='instructions' className='instructionsTextArea'>
                    Tell us more. Please provide special instructions.
                <textarea
                    name='instructions'
                    id='instructions'
                    value={formState.instructions}
                    onChange={inputChange}
                    />
                </label>
            </div>
            <pre>{JSON.stringify(post, null, 2)}</pre> 
            <button disabled={buttonDisabled}>Submit</button> 
        </form>

    )
}

export default PizzaForm;