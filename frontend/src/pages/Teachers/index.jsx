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
    degrees: {
      degreeId: '',
      classes: [{ classPosition: 0 }]
    }
  },
  list: [],
  classes: [{ id: 0, name: '' }],
  degrees: [{ id: 0, name: '' }],
  teachers: [{ id: 0, name: '' }],
  matters: [{ id: 0, name: '' }],
  searchDegreeIdField: '',
  searchClassIdField: ''
};

export default class Teachers extends Component {
  state = { ...initialState };

  componentWillMount() {
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

  save() {
    const relationship = this.state.relationship;
    if (relationship.id) {
      api.put(`relationships/${relationship.id}`, relationship).then(response => {
        const list = this.getUpdatedList(response.data);
        this.setState({ relationship: initialState.relationship, list });
      });
    } else {
      api.post('relationships', relationship).then(response => {
        const list = this.getUpdatedList(response.data);
        this.setState({ relationship: initialState.relationship, list });
      });
    }
  }

  updateField(event) {
    const relationship = { ...this.state.relationship };
    relationship[event.target.name] = event.target.value;
    this.setState({ relationship });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Teacher Name</label>
              <input
                type="number"
                className="form-control"
                name="teacherId"
                value={this.state.relationship.teacherId}
                onChange={e => this.updateField(e)}
                placeholder="Digite o TeacherId... (ex.: 1,2,3)"
              // placeholder="Digite o nome do(a) professor(a)..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Matéria</label>
              <input
                type="number"
                className="form-control"
                name="matterId"
                value={this.state.relationship.matterId}
                onChange={e => this.updateField(e)}
                placeholder="Digite o MatterId... (ex.: 1,2,3)"
              // placeholder="Digite o nome da matéria..."
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>degreeId</label>
              <input
                type="number"
                className="form-control"
                name="degreeId"
                value={this.state.relationship.degrees.degreeId}
                onChange={e => Number(this.updateField(e))}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>classId</label>
              <input
                type="number"
                className="form-control"
                name="classPosition"
                value={this.state.relationship.degrees.classes.classPosition}
                onChange={e => Number(this.updateField(e))}
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

  // renderSearchField() {
  //   return (
  //     <div className="form">
  //       <div className="row">
  //         <div className="col-12 col-md-6">
  //           <div className="form-group">
  //             <label>DegreeId</label>
  //             <input
  //               type="text"
  //               className="form-control"
  //               onChange={e =>
  //                 this.setState({ searchDegreeIdField: e.target.value })
  //               }
  //               placeholder="Filtre por Degree..."
  //             />
  //           </div>
  //         </div>

  //         <div className="col-12 col-md-6">
  //           <div className="form-group">
  //             <label>ClassId</label>
  //             <input
  //               type="text"
  //               className="form-control"
  //               onChange={e =>
  //                 this.setState({ searchClassIdField: e.target.value })
  //               }
  //               placeholder="Filtre por Class..."
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Matter(subject)</th>
            <th>Degrees</th>
            <th>Classes</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    const { list } = this.state;
    // const { list, searchDegreeIdField, searchClassIdField } = this.state;

    // const filteredStudentsByDegreeId = list.filter(student =>
    //   String(getDegreeById(student.degreeId, this.state.degrees)).toLowerCase()
    //     .includes(searchDegreeIdField.toLowerCase())
    // );

    // const filteredStudentsByClassId = filteredStudentsByDegreeId
    //   .filter(student =>
    //     String(getClassById(student.classId, this.state.classes)).toLowerCase()
    //       .includes(searchClassIdField.toLowerCase())
    //   );

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
                console.log(classes);
                let classesName = []
                return (
                  <div>
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
        {/* {this.renderSearchField()} */}
        {this.renderTable()}
      </Main>
    );
  }
}
