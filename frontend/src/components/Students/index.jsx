import React from 'react';
import Main from '../template/Main';
import { Component } from 'react';

import api from '../../service/api'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastros de usuários: Incluir, Listar, Alterar e Excluir',
};

const initialState = {
  student: { ra: 0, name: '', degreeId: 0, classId: 0 },
  list: [],
};

export default class UserCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    api.get('students').then(response => {
      console.log(response);
      this.setState({ list: response.data });
    });
  }

  clear() {
    this.setState({ student: initialState.student });
  }

  save() {
    const student = this.state.student;
    if (student.id) {
      api.put(`students/${student.id}`, student).then(resp => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ student: initialState.student, list });
      });
    } else {
      api.post('students', student).then(resp => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ student: initialState.student, list });
      });
    }
  }

  updateField(event) {
    const student = { ...this.state.student };
    student[event.target.name] = event.target.value;
    this.setState({ student });
  }

  renderForm() {
    return (
      <div className="form">

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.student.name}
                onChange={e => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>RA</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.student.ra}
                onChange={e => this.updateField(e)}
                placeholder="Digite o RA..."
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>degreeId</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.student.degreeId}
                onChange={e => this.updateField(e)}
                placeholder="Digite o RA..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>classId</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.student.classId}
                onChange={e => this.updateField(e)}
                placeholder="Digite o RA..."
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>
              Salvar
            </button>

            <button
              className="btn btn-secondary ml-2"
              onClick={e => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>RA</th>
            <th>DegreeId</th>
            <th>ClassId</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map(student => {
      return (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.ra}</td>
          <td>{student.name}</td>
          <td>{student.degreeId}</td>
          <td>{student.classId}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(student)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(student)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  getUpdatedList(student, add = true) {
    const list = this.state.list.filter(u => u.id !== student.id);
    if (add) list.unshift(student);
    return list;
  }

  load(student) {
    this.setState({ student });
  }

  remove(student) {
    api.delete(`students/${student.id}`).then(resp => {
      const list = this.getUpdatedList(student, false);
      this.setState({ list });
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
