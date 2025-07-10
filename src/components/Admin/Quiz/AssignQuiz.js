import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import { getAllQuiz, getAllUser, postAssignQuizToUser } from '../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const AssignQuiz = () => {
  const { t } = useTranslation();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [listUser, setListUser] = useState([]);
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchGetAllQuiz();
    fetchGetAllUser();
  }, []);
  const fetchGetAllQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      let options = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(options);
    }
  };
  const fetchGetAllUser = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      let options = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} -${item.email}`,
        };
      });
      setListUser(options);
    }
  };
  const handleAssign = async () => {
    const res = await postAssignQuizToUser(selectedQuiz.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setSelectedQuiz(null);
      setSelectedUser(null);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="assignQuiz-container row">
      <div className=" col-6 ">
        <label>{t('admin.quiz.update_qa.select_quiz')}</label>
        <div className="mt-2">
          <Select value={selectedQuiz} options={listQuiz} onChange={setSelectedQuiz} />
        </div>
      </div>
      <div className=" col-6">
        <label>{t('admin.quiz.update_qa.title-2')}</label>
        <div className="mt-2">
          <Select value={selectedUser} options={listUser} onChange={setSelectedUser} />
        </div>
      </div>
      <button className="btn btn-primary col-1 m-3" onClick={() => handleAssign()}>
        {t('admin.quiz.assign')}
      </button>
    </div>
  );
};

export default AssignQuiz;
