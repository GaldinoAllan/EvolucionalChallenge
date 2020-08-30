import React from 'react';
import Main from '../../components/Main';
import { Component } from 'react';

import api from '../../service/api';
import getById from '../../utils/getById';

const headerProps = {
  icon: 'users',
  title: 'Teachers',
  subtitle: 'Lista e cadastros de teachers',
};

const initialState = {
  relationship: {
    teacherId: '',
    matterId: '',
    degrees: []
  },
  list: [],
  classes: [{ id: 0, name: '' }],
  degrees: [{ id: 0, name: '' }],
  teachers: [{ id: 0, name: '' }],
  matters: [{ id: 0, name: '' }],
  selectedDegree: '',
};

export default class Teachers extends Component {
  state = { ...initialState };

  componentDidMount() {
    api.get('relationships').then(response => {
      this.setState({ list: response.data });
    });
    api.get('classes').then(response => {
      this.setState({ classes: response.data });
    });
    api.get('degrees').then(response => {
      this.setState({ degrees: response.data });
    });
    api.get('teachers').then(response => {
      this.setState({ teachers: response.data });
    });
    api.get('matters').then(response => {
      this.setState({ matters: response.data });
    });
  }

  clear() {
    this.setState({ relationship: initialState.relationship });
  }

  async save() {
    let response;
    const relationship = this.state.relationship;
    const { teacherId, matterId } = relationship;

    const requestObj = {
      teacherId,
      matterId,
      degrees: relationship.degrees
    };

    if (relationship.id) {
      response = await api.put(`relationships/${relationship.id}`, requestObj);
    } else {
      response = await api.post('relationships', requestObj);
    }

    const list = this.getUpdatedList(response.data);
    this.setState({ relationship: initialState.relationship, list });

    this.clear();
  }

  updateField(event) {
    const relationship = { ...this.state.relationship };
    relationship[event.target.name] = event.target.value;
    this.setState({ relationship });
  }

  updateFieldDegree(event) {
    this.setState({ selectedDegree: event.target.value })
  }

  updateFieldClass(event) {
    const relationship = { ...this.state.relationship };
    // delete this.state.relationship.degrees;
    relationship.degrees.push({
      degreeId: this.state.selectedDegree,
      classes: [{
        classId: event.target.value
      }]
    });
    console.log('3:', relationship);
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <strong>Teacher</strong>
              <select
                name="teacherId"
                id="teacherId"
                className="form-control"
                onChange={e => this.updateField(e)}
              >
                <option value={this.state.relationship.teacherId}>
                  {
                    getById(this.state.relationship.teacherId, this.state.teachers)
                  }
                </option>
                {this.state.teachers.map(teacher => {
                  return <option
                    key={teacher.id}
                    value={teacher.id}>
                    {teacher.name}
                  </option>
                })}
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <strong>Matter</strong>
              <select
                name="matterId"
                id="matterId"
                className="form-control"
                onChange={e => this.updateField(e)}
              >
                <option value={this.state.relationship.matterId}>
                  {
                    getById(this.state.relationship.matterId, this.state.matters)
                  }
                </option>
                {this.state.matters.map(matter => {
                  return <option
                    key={matter.id}
                    value={matter.id}>
                    {matter.name}
                  </option>
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <strong>Degree</strong>
              {
                (this.state.relationship.degrees.length > 0)
                  ? this.state.relationship.degrees.map(({ degreeId }) => {
                    return (
                      <div style={{ display: "flex" }}>
                        <select
                          id="degreeId"
                          key={degreeId}
                          className="form-control"
                          onChange={e => this.updateFieldDegree(e)}
                        >

                          <option value={degreeId}>
                            {
                              getById(degreeId, this.state.degrees)
                            }
                          </option>

                          {this.state.degrees.map(degree => {
                            return (
                              <option
                                key={degree.id}
                                value={degree.id}>
                                {degree.name}
                              </option>
                            )
                          })}
                        </select>
                        <button
                          className="btn btn-secondary"
                          style={{ marginLeft: 8 }}
                          onClick={() => { }}
                        >
                          <i className="fa fa-minus" />
                        </button>
                      </div>
                    )
                  }) : (
                    <div style={{ display: "flex" }}>
                      <select
                        id="degreeId"
                        className="form-control"
                        onChange={e => this.updateFieldDegree(e)}
                      >
                        <option value=""></option>
                        {this.state.degrees.map(degree => {
                          return (
                            <option
                              key={degree.id}
                              value={degree.id}>
                              {degree.name}
                            </option>
                          )
                        })}
                      </select>
                      <button
                        className="btn btn-secondary"
                        style={{ marginLeft: 8 }}
                        onClick={() => { }}
                      >
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                  )
              }
            </div>
            <button className="btn btn-success" onClick={() => { }}>
              <i className="fa fa-plus" />
              Add Degree
            </button>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <strong>Class</strong>
              {
                (this.state.relationship.degrees.length > 0)
                  ? this.state.relationship.degrees.map(({ degreeId, classes }) => {
                    return (
                      <div key={degreeId}>
                        <div>
                          <label>{getById(degreeId, this.state.degrees)}</label>
                          {classes.map(({ classId }) => {
                            return (
                              <select
                                key={classId}
                                id="classeId"
                                className="form-control"
                                onChange={e => this.updateFieldClass(e)}
                              >
                                <option value={classId}>
                                  {
                                    getById(classId, this.state.classes)
                                  }
                                </option>
                                {this.state.classes.map(classe => {
                                  return <option
                                    key={classe.id}
                                    value={classe.id}>
                                    {classe.name}
                                  </option>
                                })}
                              </select>
                            )
                          })}
                        </div>
                        <button style={{ marginTop: 16, marginBottom: 16 }} className="btn btn-success" onClick={() => { }}>
                          <i className="fa fa-plus" />
                          Add Class
                        </button>
                      </div>
                    )
                  }) : (
                    <select
                      id="classeId"
                      className="form-control"
                      onChange={e => this.updateFieldClass(e)}
                    >
                      <option value=""></option>
                      {this.state.classes.map(classe => {
                        return <option
                          key={classe.id}
                          value={classe.id}>
                          {classe.name}
                        </option>
                      })}
                    </select>
                  )
              }
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
      </div >
    );
  }

  renderTable() {
    const { list } = this.state;
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Matter</th>
            <th>Degrees</th>
            <th>Classes</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows(list)}</tbody>
      </table>
    );
  }

  renderRows(list) {
    return list.map(relationship => {
      return (
        <tr key={relationship.id}>
          <td>{relationship.id}</td>
          <td>{getById(relationship.teacherId, this.state.teachers)}</td>
          <td>{getById(relationship.matterId, this.state.matters)}</td>
          <td>
            {
              relationship.degrees.map(({ degreeId }) => {
                return <div key={degreeId}>{getById(degreeId, this.state.degrees)}</div>
              })
            }
          </td>
          <td>
            {
              relationship.degrees.map(({ classes }) => {
                let classesName = []
                return (
                  <div key={classes.classId}>
                    {
                      classes.map(({ classId }) => {
                        classesName = getById(classId, this.state.classes)
                        return classesName;
                      })
                    }
                  </div>
                )
              })
            }
          </td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(relationship)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(relationship)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  getUpdatedList(relationship, add = true) {
    const list = this.state.list.filter(u => u.id !== relationship.id);
    if (add) list.unshift(relationship);
    return list;
  }

  load(relationship) {
    this.setState({ relationship });
  }

  remove(relationship) {
    api.delete(`relationships/${relationship.id}`).then(resp => {
      const list = this.getUpdatedList(relationship, false);
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
