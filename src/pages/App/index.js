import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";

import { Container } from "./styles";
import { logout } from "../../services/auth";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { accounts: [] }
    };

    loadFromServer = async e => {
        const response = await api.get("/accounts");
        console.log(response.data._embedded.accounts)
        this.setState({
            accounts: response.data._embedded.accounts
        });
    };

    handleLogout = async e => {
        logout();
        this.props.history.push("/app");
    }

    componentDidMount() {
        this.loadFromServer();
    }

    render() {

        const accounts = this.state.accounts.map(account =>
            <Account key={account._links.self.href} account={account} />
        );

        return (
            <Container>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Priority</th>
                                <th>User</th>
                            </tr>
                            {accounts}
                        </tbody>
                    </table>
                    <br/>
                    <button onClick={this.handleLogout}>Sair</button>
                </div>
            </Container>
        );
    }
}

class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.account.name}</td>
                <td>{this.props.account.priority}</td>
                <td>{this.props.account.user.name}</td>
            </tr>
        )
    }
}

export default withRouter(App);