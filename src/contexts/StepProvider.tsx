/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useState, useEffect } from 'react';
import { validateStep } from "../utils/validation";
import type { MultiStepFormData, StepAction, StepContextType, FormErrors } from '../utils/types';

const initialFormData: MultiStepFormData = {
    name: '',
    email: '',
    phone: '',
    plan: 'arcade',
    onlineService: false,
    largerStorage: false,
    customizableProfile: false,
};

type State = {
    activeStep: number,
    formData: MultiStepFormData,
    errors: FormErrors
}

const initialState: State = {
    activeStep: 3,
    formData: initialFormData,
    errors: {},
}

const initForm = (defaultState: State) => {
    try {
        const savedData = localStorage.getItem('savedState');
        return savedData ? JSON.parse(savedData) : defaultState;
    } catch(err) {
        console.error('Error in local storage data reading', err);
        return defaultState;
    }
}

const initPeriod = () => {
    try {
        const savedPeriod = localStorage.getItem('savedPeriod');
        return savedPeriod ? JSON.parse(savedPeriod) : false;
    } catch(err) {
        console.error('Error in period saving', err);
        return false;
    }
}

function stepReducer(state: State, action: StepAction) {
    switch (action.type) {
        case "NEXT_STEP": {
            const { isValid, errors } = validateStep(state.activeStep, state.formData);
            
            if (!isValid) {
                return {
                    ...state,
                    errors: errors,
                }
            }
            
            return {
                ...state, 
                activeStep: Math.min(state.activeStep + 1, 4),
                errors: {},
            }
        }
        
        case "PREV_STEP":
            return {
                ...state, 
                activeStep: Math.max(state.activeStep - 1, 1),
                errors: {}
            }

        case "SET_STEP":
            return {
                ...state, 
                activeState: action.payload,
                errors: {}
            }
        
        case "UPDATE_FORM_DATA":
            return {
                ...state,
                formData: {...state.formData, ...action.payload}
            }
        
        case "SET_ERRORS":
            return {
                ...state,
                errors: action.payload
            }

        default:
            return state;
    }
}

export const StepContext = createContext<StepContextType | undefined>(undefined);

export default function StepProvider({ children } : { children : React.ReactNode }) {
    const [state, dispatch] = useReducer(stepReducer, initialState, initForm);
    const [isYearly, setIsYearly] = useState<boolean>(initPeriod);
    
    useEffect(() => {
        try {
            localStorage.setItem('savedState', JSON.stringify(state));
        } catch(err) {
            console.error('Error in local storage data saving!', err);
        }
    }, [state]);

    useEffect(() => {
        try {
            localStorage.setItem('savedPeriod', JSON.stringify(isYearly));
        } catch(err) {
            console.error('Error in local storage data saving!', err);
        }
    }, [isYearly]);

    return (
        <StepContext.Provider value={{
            activeStep: state.activeStep,
            formData: state.formData,
            errors: state.errors,
            dispatch,
            isYearly,
            setIsYearly
        }}>
            {children}
        </StepContext.Provider>
    )
}
