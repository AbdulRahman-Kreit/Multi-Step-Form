import { useContext, useState } from "react";
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
    const [isYearly, setIsYearly] = useState<boolean>(false);
    const context = useContext(StepContext);

    if (!context) {
        return null;
    }

    const { formData, errors, dispatch } = context;

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

    // Style Varaibles
    const cardsContainer = `flex flex-col md:flex-row gap-3 md:gap-4 w-full 
    my-4 md:my-6`;

    const baseCardStyle = `flex flex-row md:flex-col items-center md:items-start 
    justify-start md:justify-between p-4 md:p-5 w-full md:w-[125px] md:flex-1 
    rounded-lg border transition-all duration-200 cursor-pointer text-left`;

    const planCardPassive = `${baseCardStyle} bg-white border-[#d6d9e6] 
    hover:border-[#473dff]`;

    const planCardActive = `${baseCardStyle} bg-[#e9e7ff] border-[#473dff]`;

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
                                    ${card.value}/mo
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="">
                <span className="">
                    Monthly
                </span>
                <div className="">
                    <div onClick={() => setIsYearly(true)} className=""></div>
                </div>
                <span className="">
                    Yearly
                </span>
            </div>
        </form>
    )
}