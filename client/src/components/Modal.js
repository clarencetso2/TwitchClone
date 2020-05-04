import React from 'react';
import ReactDOM from 'react-dom';
import History from '../history';

const Modal = props =>{
	return ReactDOM.createPortal(
		<div onClick={props.onDismiss}  className= "ui dimmer modals visible active">
			//stopPropogation: onDismiss function will not be applied after this div
			//otherwise onclick gets bubbled up to parent, which will call onDismiss
			<div  onClick={(e)=> e.stopPropagation()} className="ui standard modal visible active">
				<div className="header">{props.title}</div>
				<div className="content">
					{props.content}
				</div>
				<div className="actions">
					{console.log(props.actions)}
					{props.actions}
				</div>
			</div>
		</div>,
		document.querySelector('#modal')
		
	);// <div></div>;
};

export default Modal;