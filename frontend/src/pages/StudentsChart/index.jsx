import React, { useState, useCallback, useLayoutEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import Main from '../../components/Main';

import api from '../../service/api'

const headerProps = {
  icon: 'users',
  title: 'Students Chart',
  subtitle: 'Gráfico de students por degrees',
};

const StudentsChart = () => {
  const [students, setStudent] = useState([]);
  const [degrees, setDegrees] = useState([]);

  var counter = [];

  useLayoutEffect(() => {
    api.get('students').then(response => {
      setStudent(response.data);
    });
    api.get('degrees').then(response => {
      setDegrees(response.data);
    });
  }, []);

  const degreesName = degrees.map(degree => {
    return degree.name
  });

  const degreesIds = degrees.map(degree => {
    return degree.id
  });

  const getStudentsByDegree = useCallback(() => {
    var contador = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    degreesIds.forEach((element, idx) => {
      students.map(({ degreeId }) => {
        if (degreeId === element) {
          contador[idx]++;
        }
        return element
      })
    });

    return contador
  }, [degreesIds, students])

  counter = getStudentsByDegree();

  const chart = useCallback(() => {
    const data = {
      labels: degreesName,
      datasets: [{
        label: 'Students by degree',
        data: counter,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }],
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              beginAtZero: true
            }
          }]
        }
      }
    }
    return data
  }, [counter, degreesName])

  return (
    <Main {...headerProps}>
      <div>
        <Bar data={() => chart()} />
      </div>
    </Main>
  )
}

export default StudentsChart;