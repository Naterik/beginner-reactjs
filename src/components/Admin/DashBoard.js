import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import './DashBoard.scss';
import { getDashboardOverview } from '../../services/apiService';

const DashBoard = () => {
  const [overviewList, setOverviewList] = useState(null);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    fetchGetOverview();
  }, []);
  const fetchGetOverview = async () => {
    const res = await getDashboardOverview();
    if (res && res.EC === 0) {
      setOverviewList(res.DT);
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          name: 'Quiz',
          Qz: Qz,
        },
        {
          name: 'Question',
          Qs: Qs,
        },
        {
          name: 'Answer',
          As: As,
        },
      ];
      setDataChart(data);
      console.log('data:', data);
      console.log(res.DT);
    }
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">dashboard</div>
      <div className="dashboard-content">
        <div className="c-left row">
          <div className="child col-3">
            <span className="text-total">Total user</span>
            <span className="text-number">
              {/* {overviewList.users.countUsers ? <>{overviewList.users.countUsers}</> : <>0</>} */}
            </span>
          </div>
          <div className="child col-3">
            <span className="text-total">Total Quizzes</span>
            <span className="text-number">
              {/* {overviewList.others.countQuiz ? <>{overviewList.others.countQuiz}</> : <>0</>}{' '} */}
            </span>
          </div>
          <div className="child col-3">
            <span className="text-total">Total Questions</span>
            <span className="text-number">
              {/* {overviewList.others.countQuestions ? (
                <>{overviewList.others.countQuestions}</>
              ) : (
                <>0</>
              )} */}
            </span>
          </div>
          <div className="child col-3">
            <span className="text-total">Total Answers</span>
            <span className="text-number">
              {/* {overviewList.others.countAnswers ? <>{overviewList.others.countAnswers}</> : <>0</>} */}
            </span>
          </div>
        </div>
        <div className="c-right">
          {' '}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Qz"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="#8884d8" />}
              />
              <Bar
                dataKey="Qs"
                fill="#ffc107"
                activeBar={<Rectangle fill="pink" stroke="#ffc107" />}
              />
              <Bar
                dataKey="As"
                fill="#0d6efd"
                activeBar={<Rectangle fill="pink" stroke="#0d6efd" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
