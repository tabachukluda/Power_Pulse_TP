import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ExercisesList.module.css'; 
import useExercise from '../../hooks/useExercise';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchExercisesItemsSelectedFilter } from '../../redux/exercises/exercisesOperations';
import ExercisesItem from '../ExercisesItem/ExercisesItem';
import { setItemsSelectedFilter } from '../../redux/exercises/exercisesSlice';

const ExercisesList = ({ selectedSubcategory }) => {
  const dispatch = useDispatch();
  const { exercisesItemsSelectFilter } = useExercise();

  useEffect(() => {
    const params = {
      page: 1,
      id: selectedSubcategory,
    };

    const source = axios.CancelToken.source();
    const cancelToken = source.token;

    dispatch(fetchExercisesItemsSelectedFilter({ params, cancelToken }));

    return () => source.cancel();
  }, [selectedSubcategory, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setItemsSelectedFilter());
    };
  }, [dispatch]);

  return (
    <div className={css.cardContainerBackground}>
      <div className={css.cardContainer}>
        {exercisesItemsSelectFilter.map((exercise) => (
          exercise._id && <ExercisesItem key={exercise._id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

ExercisesList.propTypes = {
  selectedSubcategory: PropTypes.string.isRequired, 
};
export default ExercisesList;
