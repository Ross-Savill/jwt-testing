import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  state = {};
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  }
  submitForm = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const url = "http://localhost:8000/auth/login";
    const data = {
      username,
      password
    }
    axios.post(url, data)
      .then(resp => {
        const { token } = resp.data;
        localStorage.setItem('token', token);
        // RE-ROUTE TO HOMEPAGE
        this.setState({ message: 'Correct username or password...moron', error: undefined });
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 403) {
          this.setState({ error: 'Incorrect username or password. Try again...moron', message: undefined });
        }
      });
  }

  ///////////////////////////REGISTER FORM NEW BUTTON///////////////////////////

  registerForm = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const url = "http://localhost:8000/auth/register";
    const data = {
      username,
      password
    }
    axios.post(url, data)
      .then(resp => {
        const { token } = resp.data;
        localStorage.setItem('token', token);
        // RE-ROUTE TO HOMEPAGE
        this.setState({ message: 'Correct username or password...moron', error: undefined });
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 403) {
          this.setState({ error: 'Incorrect username or password. Try again...moron', message: undefined });
        }
      });
  }

  ////////////////////////////////REGISTER FORM END//////////////////////////

  handleProtectedRequest = (e) => {
    // e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      const url = "http://localhost:8000/protected/resources";
      const options = {
        headers: {
          token
        }
      }
      axios.get(url, options)
        .then(resp => {
          this.setState({ message: resp.data, error: undefined });
        })
        .catch(error => {
          this.setState({ error: error.response, message: undefined });
        })
    } else {
      this.setState({ error: 'Not authenticated. Please log in', message: undefined })
    }
  }

  render() {
    const { error, message } = this.state;
    return (
      <>
        <form>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" onChange={this.handleInputChange} />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" onChange={this.handleInputChange} />
          <button onClick={this.submitForm}>Login</button>
          <button onClick={this.registerForm}>Register</button>
          <button onClick={this.logoutForm}>Logout</button>
        </form>
        { error && <p>{ error }</p> }
        { message && <p>{ message }</p> }
        <button onClick={this.handleProtectedRequest}>Request protected</button>
      </>
    );
  }
}

export default Form;