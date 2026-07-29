import { useContext } from "react";
import { StepContext } from "../contexts/StepProvider";

import { motion } from "framer-motion";

// Data
import { addOnsCards, planCards } from "../utils/data";

// Style Variables
import { stepContainer } from "../utils/styles";
import { headingContainer } from "../utils/styles";
import { heading } from "../utils/styles";
import { description } from "../utils/styles";
import { confirmButton } from "../utils/styles";
import { goBackButton } from "../utils/styles";

export default function Summary() {
    const context = useContext(StepContext);

    if (!context) {
        return null;
    }

    const { formData, dispatch, isYearly, togglePopup } = context;

    const selectedPlan = planCards.find((card) => card.planKey === formData.plan);

    const planPrice = isYearly ? selectedPlan?.value * 10 : selectedPlan?.value;

    const selectedAddOns = addOnsCards.filter((card) => Boolean(formData[card.key]))

    const addOnsTotalPrice = selectedAddOns.reduce((total, addon) => {
        const price = isYearly ? addon.value * 10 : addon.value;
        return total + price;
    }, 0);

    const totalPrice = planPrice + addOnsTotalPrice;

    const periodText = isYearly ? 'Yearly' : "Monthly";
    
    const periodSuffix = isYearly ? 'yr' : 'mo';

    const handlePlanEdit = () => {
        dispatch({ type: "SET_STEP", payload: 2 });
    };

    const handleGoingBack = () => {
        dispatch({ type: "PREV_STEP" });
    };
    
    return (
        <div
        className={stepContainer}>
            <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={headingContainer}>
                <h1 className={heading}>Finishing up</h1>
                <p className={description}>
                    Double-check everything looks OK before confirming.
                </p>
            </motion.div>

            {/* Summary Card */}
            <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 rounded-xl bg-blue-50/60 p-6">
                {/* Plan */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-[#02295a] font-bold text-xl">
                            {selectedPlan?.name} ({periodText})
                        </h2>

                        <button
                            type="button"
                            onClick={handlePlanEdit}
                            className="mt-1 text-sm text-[#9699ab] underline hover:text-[#473dff] transition-colors"
                        >
                            Change
                        </button>
                    </div>

                    <span className="font-bold text-[#02295a] text-xl">
                        ${planPrice}/{periodSuffix}
                    </span>
                </div>

                { selectedAddOns.length > 0 && (
                    <div className="my-6 h-px bg-[#d6d9e6]" />
                )}


                <div className="space-y-4">
                    {selectedAddOns.map((addon) => {
                        const addonPrice = isYearly ? addon.value * 10 : addon.value;

                        return (
                            <div key={addon.id} className="flex justify-between">
                                <span className="text-[#9699ab] text-sm">
                                    {addon.name}
                                </span>

                                <span className="text-[#02295a] text-sm font-medium">
                                    +${addonPrice}/{periodSuffix}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Total */}
            <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex items-center justify-between px-6">
                <span className="text-sm text-[#9699ab]">
                    Total ({isYearly ? 'per year' : 'per month'})
                </span>

                <span className="text-2xl font-bold text-[#473dff]">
                    ${totalPrice}/{periodSuffix}
                </span>
            </motion.div>

            {/* Buttons */}
            <div className="flex justify-between w-full mt-10 md:mt-auto pt-4">
                <button
                    type="button"
                    onClick={handleGoingBack}
                    className={goBackButton}
                >
                    Go Back
                </button>

                <button
                    type="submit"
                    onClick={togglePopup}
                    className={`${confirmButton}`}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}
