import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { login, getCategory, getRecipe } from '../services/HttpRequest'

class Login extends Component {


    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state);

        login(this.state.username, this.state.password, (j) => {
            getCategory();
            getRecipe();
        });

    }

    render() {
        const { username, password } = this.state
        return (
            <div>
                <Navbar />
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="username" value={username} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="password" value={password} onChange={this.changeHandler} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login