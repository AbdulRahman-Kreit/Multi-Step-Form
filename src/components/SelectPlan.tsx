import { useContext } from "react";
import { StepContext } from "../contexts/StepProvider";

// Icons
import Arcade from '../../public/icon-arcade.svg';
import Advanced from '../../public/icon-advanced.svg';
import Pro from '../../public/icon-pro.svg';

// Style Variables
import { stepContainer } from "../utils/styles";
import { headingContainer } from "../utils/styles";
import { heading } from "../utils/styles";
import { description } from "../utils/styles";
import { nextStepButton } from "../utils/styles";
import { goBackButton } from "../utils/styles";

type Card = {
    id: number,
    icon: string,
    alt: string,
    name: string,
    value: number,
    planKey: 'arcade' | 'advanced' | 'pro'
}

const planCards: Card[] = [
    { id: 1, icon: Arcade, alt: 'Arcade Icon', name: 'Arcade', value: 9, planKey: 'arcade' },
    { id: 2, icon: Advanced, alt: 'Advanced Icon', name: 'Advanced', value: 12, planKey: 'advanced' },
    { id: 3, icon: Pro, alt: 'Pro Icon', name: 'Pro', value: 15, planKey: 'pro' },
]

export default function SelectPlan() { 
    const context = useContext(StepContext);

    if (!context) {
        return null;
    }

    const { formData, dispatch, isYearly, setIsYearly } = context;

    const handleSelectPlan = (planKey: 'arcade' | 'advanced' | 'pro') => {
        dispatch({
            type: "UPDATE_FORM_DATA",
            payload: { plan: planKey }
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "NEXT_STEP" });
    };

    const handleGoingBack = () => {
        dispatch({ type: "PREV_STEP" });
    };

    // Style Varaibles
    const cardsContainer = `flex flex-col md:flex-row gap-3 md:gap-4 w-full 
    my-2 md:my-4`;

    const baseCardStyle = `flex flex-row md:flex-col items-center md:items-start 
    justify-start md:justify-between p-4 md:p-5 w-full md:w-[125px] md:flex-1 
    rounded-lg border transition-all duration-200 cursor-pointer text-left`;

    const planCardPassive = `${baseCardStyle} bg-white border-[#d6d9e6] 
    hover:border-[#473dff]`;

    const planCardActive = `${baseCardStyle} bg-[#f8f9ff] border-[#473dff]`;

    return (
        <form onSubmit={handleSubmit} className={stepContainer}>
            <div className={headingContainer}>
                <h1 className={heading}>Select your plan</h1>
                <p className={description}>You have the option of monthly or yearly billing</p>
            </div>
            
            <div className={cardsContainer}>
                {planCards.map((card) => {
                    const isSelected = formData.plan === card.planKey;

                    return (
                        <button
                            key={card.id}
                            type="button"
                            onClick={() => handleSelectPlan(card.planKey)}
                            className={isSelected ? planCardActive : planCardPassive}
                        >
                            <img 
                                src={card.icon} 
                                alt={card.alt}
                                className="w-10 h-10 mr-4 md:mr-0 md:mb-10 object-contain" 
                            />

                            <div>
                                <h3 className="text-[#022959] font-bold text-base 
                                md:text-lg">
                                    {card.name}
                                </h3>
                                <p className="text-[#9699ab] text-[16px] font-normal">
                                    {!isYearly ? 
                                    `$${card.value}/mo` : 
                                    `$${card.value * 10}/yr`}
                                </p>
                                <p className={isYearly ? `text-sm text-[#03336d]` : `hidden`}>
                                    2 months free
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-row justify-around items-center w-full 
            bg-[#f8f9ff] p-4 mt-4 main-font font-semibold rounded-lg">
                <span className={!isYearly ? 'text-[#022959]' : 'text-[#9699ab]'}>
                    Monthly
                </span>
                <button type="button" onClick={() => setIsYearly(!isYearly)} 
                className="w-10 h-5 rounded-2xl bg-[#022959] cursor-pointer">
                    <div className={`w-4 h-4 rounded-2xl bg-white  duration-200
                    ${isYearly ? 'ml-5.5' : 'ml-0.5'}`}></div>
                </button>
                <span className={isYearly ? 'text-[#022959]' : 'text-[#9699ab]'}>
                    Yearly
                </span>
            </div>
            <div className="flex justify-between w-full mt-8 md:mt-auto pt-4">
                <button 
                    type="button" 
                    onClick={handleGoingBack}
                    className={goBackButton}
                >
                    Go Back
                </button>
                <button 
                    type="submit" 
                    className={nextStepButton}
                >
                    Next Step
                </button>
            </div>
        </form>
    )
}