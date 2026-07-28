import { useContext } from "react";
import { StepContext } from "../contexts/StepProvider";

// Data
import { addOnsCards } from "../utils/data";

// Style Variables
import { stepContainer } from "../utils/styles";
import { headingContainer } from "../utils/styles";
import { heading } from "../utils/styles";
import { description } from "../utils/styles";
import { nextStepButton } from "../utils/styles";
import { goBackButton } from "../utils/styles";



export default function AddOns() {
    const context = useContext(StepContext);

    if (!context) {
        return null;
    }

    const { formData, dispatch, isYearly } = context;

    const handleToggleAddOn = (key: 'onlineService' | 'largerStorage' | 'customizableProfile') => {
        dispatch({
            type: "UPDATE_FORM_DATA",
            payload: { [key]: !formData[key] }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "NEXT_STEP" });
    };

    const handleGoingBack = () => {
        dispatch({ type: "PREV_STEP" });
    };

    return (
        <form onSubmit={handleSubmit} className={stepContainer}>
            <div>
                <div className={headingContainer}>
                    <h1 className={heading}>Pick add-ons</h1>
                    <p className={description}>Add-ons help you to enhance your gaming experience.</p>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 my-4 md:my-6">
                    {addOnsCards.map((card) => {
                        const isChecked = Boolean(formData[card.key]);

                        const cardStyle = `flex items-center justify-between p-4 md:p-5 border rounded-lg cursor-pointer transition-all duration-200 ${
                            isChecked 
                                ? 'bg-[#f8f9ff] border-[#473dff]' 
                                : 'bg-white border-[#d6d9e6] hover:border-[#473dff]'
                        }`;

                        return (
                            <label key={card.id} className={cardStyle}>
                                <div className="flex items-center gap-4 md:gap-6">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleToggleAddOn(card.key)}
                                        className="w-5 h-5 accent-[#473dff] rounded cursor-pointer"
                                    />
                                    
                                    <div className="text-left">
                                        <h3 className="text-[#022959] font-bold text-sm md:text-base">
                                            {card.name}
                                        </h3>
                                        <p className="text-[#9699ab] text-xs md:text-sm font-normal">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>

                                <span className="text-[#473dff] text-xs md:text-sm font-medium">
                                    {!isYearly ? 
                                    `$${card.value}/mo` : 
                                    `$${card.value * 10}/yr`}
                                </span>
                            </label>
                        );
                    })}
                </div>
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
    );
}