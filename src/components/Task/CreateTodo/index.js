import { useFormik } from 'formik'
import React from 'react'
import style from './style.module.css'

const initialState = {
    taskname: "",
    taskDescription: ""
}


const CreateTodo = ({ onTaskCreate }) => {
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
        handleBlur
    } = useFormik({
        initialValues: {
            taskname: '',
            taskDescription: '',
        },
        validate,
        onSubmit: values => { onTaskCreate(values) },
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

                <button className={style.submit_button} type='submit'>Create Todo</button>
            </form>
        </div>
    )
}

export default CreateTodo