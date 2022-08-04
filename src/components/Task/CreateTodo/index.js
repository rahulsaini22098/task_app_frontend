import { useFormik } from 'formik'
import React from 'react'
import style from './style.module.css'

const CreateTodo = ({
    selectedTask,
    onTaskCreate,
    onTaskUpdate
}) => {

    console.log("55555555555555555555", selectedTask);
    const isTaskSelected = Object.keys(selectedTask).length !== 0

    const validate = values => {
        const { taskname, taskDescription } = values
        const errors = {};
        if (!taskname || taskname.length === 0) {
            errors.taskname = 'Required';
        }

        if (!taskDescription || taskDescription.length === 0) {
            errors.taskDescription = 'Required';
        }

        return errors;
    };

    const {
        values,
        touched,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        resetForm
    } = useFormik({
        initialValues: {
            taskname: selectedTask?.taskname || '',
            taskDescription: selectedTask?.taskDescription || ''
        },
        enableReinitialize: true,
        validate,
        onSubmit: values => {
            isTaskSelected
                ? onTaskUpdate(selectedTask.id, values, resetForm)
                : onTaskCreate(values, resetForm)
        },
    });

    return (
        <div className={style.todo_container}>
            <form className={style.task_form} onSubmit={handleSubmit}>
                <div className={style.group_input}>
                    <label>Task Name</label>
                    <input
                        className={style.task_input}
                        type='text'
                        name='taskname'
                        placeholder='example: My first task'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.taskname}
                        error={touched.taskname && errors.taskname ? 'true' : 'false'}
                    />
                </div>

                <div className={style.group_input}>
                    <label>Task Description</label>
                    <textarea
                        className={style.task_textarea}
                        name='taskDescription'
                        rows={5}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.taskDescription}
                        error={touched.taskDescription && errors.taskDescription ? 'true' : 'false'}
                    ></textarea>
                </div>

                <button className={style.submit_button} type='submit'>{isTaskSelected ? 'Update Task' : 'Create Task'}</button>
            </form>
        </div>
    )
}

export default CreateTodo