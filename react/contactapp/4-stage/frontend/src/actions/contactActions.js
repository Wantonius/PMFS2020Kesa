import {loading,endLoading,logoutSuccess} from './loginActions'

export const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS"
export const FETCH_CONTACTS_FAILED = "FETCH_CONTACTS_FAILED"
export const ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS"
export const ADD_CONTACT_FAILED = "ADD_CONTACT_FAILED"
export const REMOVE_CONTACT_SUCCESS = "REMOVE_CONTACT_SUCCESS"
export const REMOVE_CONTACT_FAILED = "REMOVE_CONTACT_FAILED"
export const EDIT_CONTACT_SUCCESS = "EDIT_CONTACT_SUCCESS"
export const EDIT_CONTACT_FAILED = "EDIT_CONTACT_FAILED"
export const CLEAR_CONTACTREDUCER_STATE = "CLEAR_CONTACTREDUCER_STATE"
export const CHANGE_MODE = "CHANGE_MODE"

//ASync actions

export const getContacts = (token) => {
	return dispatch => {
		let request = {
			method:"GET",
			mode:"cors",
			headers: {"Content-type":"application/json",
			"token":token}
		}
		dispatch(loading());
		fetch("/api/contact",request).then(response => {
			dispatch(endLoading());
			if(response.ok) {
				response.json().then(data => {
					dispatch(fetchContactsSuccess(data))
				}).catch(error => {
					dispatch(fetchContactsFailed("Failed to parse data. Try again"))
				})
			} else {
				if(response.status === 403) {
					dispatch(fetchContactsFailed("Server responded with a session failure. Logging out!"));
					dispatch(logoutSuccess());
					dispatch(clearContactReducerState());
				} else {
					dispatch(fetchContactsFailed("Server responded with a status:",response.status))
				}
			}
		}).catch(error => {
			dispatch(endLoading());
			dispatch(fetchContactsFailed("Server responded with an error:",error))
		})
	}
}

//Action creators

export const fetchContactsSuccess = (list) => {
	return {
		type:FETCH_CONTACTS_SUCCESS,
		list:list
	}
}

export const fetchContactsFailed = (error) => {
	return {
		type:FETCH_CONTACTS_FAILED,
		error:error
	}
}

export const addContactSuccess = () => {
	return {
		type:ADD_CONTACT_SUCCESS
	}
}

export const addContactFailed = (error) => {
	return {
		type:ADD_CONTACT_FAILED,
		error:error
	}
}

export const removeContactSuccess = () => {
	return {
		type:REMOVE_CONTACT_SUCCESS
	}
}

export const removeContactFailed = (error) => {
	return {
		type:REMOVE_CONTACT_FAILED,
		error:error
	}
}

export const editContactSuccess = () => {
	return {
		type:EDIT_CONTACT_SUCCESS
	}
}

export const editContactFailed = (error) => {
	return {
		type:EDIT_CONTACT_FAILED,
		error:error
	}
}

export const clearContactReducerState = () => {
	return {
		type:CLEAR_CONTACTREDUCER_STATE
	}
}

export const changeMode = (mode,contact) => {
	return {
		type:CHANGE_MODE,
		mode:mode,
		contact:contact
	}
}