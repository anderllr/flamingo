import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import Main from '../template/Main';
import { GET_USERS } from '../resources/queries/userQuery';
import { CREATE_USER, UPDATE_PASSWORD, DELETE_USER } from '../resources/mutations/userMutation';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

const initialState = {
    user: {
        id: '',
        email: '',
        password: ''
    },
    alert: {
        type: '',
        title: '',
        msg: ''
    }
}

class UserCrud extends Component {
    state = { ...initialState }

    handleErrors(e, title) {
        //Simple aproach to show error messages -- The better way is create a centralized function using apollo link
        //See documentation to understand another way: https://www.apollographql.com/docs/react/features/error-handling.html
        if (e.graphQLErrors) {
            this.setState({
                alert: {
                    type: 'danger',
                    title: `Error on ${title}`,
                    msg: e.graphQLErrors[0].message
                }
            });
        }
    }

    componentWillMount() {
        //TODO: Catch all users to send to component
    }

    clear(e) {
        this.setState({ ...initialState });
    }

    save() {
        const { id, email, password } = this.state.user;

        if (id !== '') { //In update mode

            const userPasswordInput = {
                password
            }

            this.props.updatePassword({ variables: { id, userPasswordInput } })
                .then(() => {
                    this.setState({ user: initialState.user });
                })
                .catch(e => {
                    this.handleErrors(e, 'Update Password!');
                })
        } else { //New user
            const userInput = {
                email,
                password
            }

            this.props.createUser({ variables: { userInput } })
                .then(() => {
                    this.props.data.refetch();
                    this.setState({ user: initialState.user });
                })
                .catch(e => {
                    this.handleErrors(e, 'Create a New User!');
                })
        }
    }

    select(user) {
        const { id, email } = user
        this.setState({
            user: {
                ...this.state.user,
                id,
                email
            }
        });
    }

    delete(user) {
        const { id } = user;
        this.props.deleteUser({ variables: { id } })
            .then(() => {
                this.props.data.refetch();
                this.setState({ user: initialState.user });
            })
            .catch(e => {
                this.handleErrors(e, 'Delete an User!');
            })
    }

    changeField(e) {
        const user = { ...this.state.user }
        user[e.target.name] = e.target.value
        this.setState({ user, alert: initialState.alert })
    }

    renderAlert() {
        const { type, title, msg } = this.state.alert;
        if (msg !== '') {
            return (
                <div className={`alert alert-${type}`} role="alert">
                    <h4 className="alert-heading">{title}!</h4>
                    <p>{msg}</p>
                </div>
            )
        }
    }

    renderUsers() {
        if (this.props.data.loading) { return <div>Loading...</div>; }
        if (!this.props.loading) {
            return this.props.data.users.map((user) => {
                return (

                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {user.email}
                        <div>
                            <button className="btn btn-warning" onClick={() => this.select(user)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2" onClick={() => this.delete(user)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>

                    </li>
                );
            });
        }
    }
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.changeField(e)}
                                disabled={this.state.user.id !== ''}
                                placeholder="E-mail" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" className="form-control"
                                name="password"
                                type="password"
                                value={this.state.user.password}
                                onChange={e => this.changeField(e)}
                                placeholder="Change or New Password" />
                        </div>
                    </div>
                </div>
                {this.renderAlert()}
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save()}>
                            Salvar
                        </button>

                        <button className="btn btn-info ml-2"
                            onClick={e => this.clear(e)}>
                            Novo
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>

            </div>

        )
    }
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}

                <ul className="list-group col-lg-8">
                    <li key={0} className="list-group-item d-flex justify-content-between align-items-center" >
                        <div>
                            E-mail
                        </div>
                        <div>
                            Actions
                        </div>
                    </li>
                    {this.renderUsers()}
                </ul>

            </Main>
        )
    }
}

export default compose(
    graphql(GET_USERS),
    graphql(CREATE_USER, { name: 'createUser' }),
    graphql(UPDATE_PASSWORD, { name: 'updatePassword' }),
    graphql(DELETE_USER, { name: 'deleteUser' })
)(UserCrud);