import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component{
	renderError({error,touched}){
		if(touched && error){
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}
	renderInput= ({input, label, meta})=>{
		const className= `field ${meta.error && meta.touched ? 'error' : ''}`
		return(
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete='off'/> //input automatically mapped as props
				{this.renderError(meta)}
			</div>
		);
	}
	
	onSubmit = (formValues) =>{
		//formValues automtically passed from react-form
		//Each field name is a prop, with ur input as its values
		//handleSubmit automatically does event.preventDefault()
		this.props.onSubmit(formValues);
	}
	
	render(){
		return(
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="title" component={this.renderInput} label="Enter Title"/>
				<Field name="description" component={this.renderInput} label="Enter Description"/>
				<button className="ui button primary">submit</button>
			</form>
		);
	}
	
};

const validate = (formValues)=>{
	const errors={};
	if(!formValues.title){
		errors.title= 'You must enter a title'
	}
	if(!formValues.description){
		errors.description= 'You must enter a description'
	}
	
	return errors;
}

export default reduxForm({
	form: 'streamForm',
	validate: validate
})(StreamForm);

