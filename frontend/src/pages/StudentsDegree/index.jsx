import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Main from '../../components/Main';
import getById from '../../utils/getById';

import api from '../../service/api'

const headerProps = {
  icon: 'users',
  title: 'Students by Degree',
  subtitle: 'Lista de students por degree',
};

const StudentsDegree = () => {
  const [students, setStudent] = useState([]);
  const [classes, setClasses] = useState([]);
  const [degrees, setDegrees] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    api.get('students').then(response => {
      setStudent(response.data);
    });
    api.get('classes').then(response => {
      setClasses(response.data);
    });
    api.get('degrees').then(response => {
      setDegrees(response.data);
    });
  }, []);

  const getDegreeId = useCallback(() => {
    return students.filter(student => {
      return Number(student.degreeId) === Number(id) && student
    })
  }, [id, students]);

  const tableRows = useCallback(() => {
    const filteredStudents = getDegreeId()

    return filteredStudents.map(student => {
      return (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.ra}</td>
          <td>{student.name}</td>
          <td>{getById(student.degreeId, degrees)}</td>
          <td>{getById(student.classId, classes)}</td>
        </tr>
      );
    });
  }, [classes, degrees, getDegreeId])

  return (
    <Main {...headerProps}>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>RA</th>
            <th>Nome</th>
            <th>Degree</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>{tableRows()}</tbody>
      </table>
    </Main>
  );
}

export default StudentsDegree;