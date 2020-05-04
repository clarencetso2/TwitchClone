import React from 'react';
import {connect } from 'react-redux';
import {signIn,signOut} from '../actions';
class GoogleAuth extends React.Component {

	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
			.init({
				clientId: '2371353250-ockh1cfqi8c089q0r7s5mgmhqbq4ln7n.apps.googleusercontent.com',
				scope: 'email'
			})
			.then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.onAuthChange(this.auth.isSignedIn.get());
				//listens for any changes to isSigned in. If so call onAuthChange
				this.auth.isSignedIn.listen(this.onAuthChange);
				
				
			});
		});
	}
	
	//if changed sign in status, change the state to reflect that
	onAuthChange = (isSignedIn) =>{
		//console.log("onAuthChange");
		if(isSignedIn){
			this.props.signIn(this.auth.currentUser.get().getId());
		}
		else{
			this.props.signOut();
		}
		
	};
	
	onSignInClick = () => {
		console.log("Attempting sign in...")
		this.auth.signIn();
	};
	
	onSignOutClick = () =>{
		this.auth.signOut();
	};
		
	
	renderAuthButton() {
		if(this.props.isSignedIn===null){
			return <div>idk if signed in</div>
		}
		else if(this.props.isSignedIn){
			return (
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon"/>
					Sign Out
				</button>
			) 
		}
		else{
			return (
				<button onClick={this.onSignInClick} className="ui red google button">
					<i className="google icon"/>
					Sign In With Google
				</button>
			) 
		}
		
		
	}
	render() {
		return <div>{this.renderAuthButton()}</div>
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn}
};

export default connect(mapStateToProps, {signIn,signOut})(GoogleAuth);