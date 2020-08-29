import React from 'react';
import Main from '../../components/Main';
import { Component } from 'react';

import api from '../../service/api'
import getById from '../../utils/getById';

const headerProps = {
  icon: 'users',
  title: 'Students',
  subtitle: 'Lista e cadastros de students',
};

const initialState = {
  student: { ra: '', name: '', degreeId: '', classId: '' },
  list: [],
  classes: [{ id: 0, name: '' }],
  degrees: [{ id: 0, name: '' }],
  searchDegreeIdField: '',
  searchClassIdField: ''
};

export default class Student extends Component {
  state = { ...initialState };

  componentWillMount() {
    api.get('students').then(response => {
      this.setState({ list: response.data });
    });
    api.get('classes').then(response => {
      this.setState({ classes: response.data });
    });
    api.get('degrees').then(response => {
      this.setState({ degrees: response.data });
    });
  }

  clear() {
    this.setState({ student: initialState.student });
  }

  save() {
    const student = this.state.student;
    if (student.id) {
      api.put(`students/${student.id}`, student).then(response => {
        const list = this.getUpdatedList(response.data);
        this.setState({ student: initialState.student, list });
      });
    } else {
      api.post('students', student).then(response => {
        const list = this.getUpdatedList(response.data);
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
              <strong>Name</strong>
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
              <strong>RA</strong>
              <input
                type="text"
                className="form-control"
                name="ra"
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
              <strong>Degree</strong>
              <select
                name="degreeId"
                id="degreeId"
                className="form-control"
                onChange={e => this.updateField(e)}
              >
                <option value={this.state.student.degreeId}>
                  {
                    getById(this.state.student.degreeId, this.state.degrees)
                  }
                </option>
                {this.state.degrees.map(degree => {
                  return <option
                    value={degree.id}>
                    {degree.name}
                  </option>
                })}
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <strong>Class</strong>
              <select
                name="classId"
                id="classeId"
                className="form-control"
                onChange={e => this.updateField(e)}
              >
                <option value={this.state.student.classId}>
                  {
                    getById(this.state.student.classId, this.state.classes)
                  }
                </option>
                {this.state.classes.map(classe => {
                  return <option
                    value={classe.id}>
                    {classe.name}
                  </option>
                })}
              </select>
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

  renderSearchField() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>DegreeId</label>
              <input
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({ searchDegreeIdField: e.target.value })
                }
                placeholder="Filtre por Degree..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>ClassId</label>
              <input
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({ searchClassIdField: e.target.value })
                }
                placeholder="Filtre por Class..."
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>RA</th>
            <th>Nome</th>
            <th>Degree</th>
            <th>Class</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    const { list, searchDegreeIdField, searchClassIdField } = this.state;

    const filteredStudentsByDegreeId = list.filter(student =>
      String(getById(student.degreeId, this.state.degrees)).toLowerCase()
        .includes(searchDegreeIdField.toLowerCase())
    );

    const filteredStudentsByClassId = filteredStudentsByDegreeId
      .filter(student =>
        String(getById(student.classId, this.state.classes)).toLowerCase()
          .includes(searchClassIdField.toLowerCase())
      );

    return filteredStudentsByClassId.map(student => {
      return (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.ra}</td>
          <td>{student.name}</td>
          <td>{getById(student.degreeId, this.state.degrees)}</td>
          <td>{getById(student.classId, this.state.classes)}</td>
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
        {this.renderSearchField()}
        {this.renderTable()}
      </Main>
    );
  }
}
