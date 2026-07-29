// Icon
import { Check } from 'lucide-react';

// Style Variables
import { heading } from '../utils/styles';
import { description } from '../utils/styles';

export default function Thanks() {
    return (
        <div className='flex flex-col justify-center items-center flex-1 
        px-4 py-6 md:px-20 md:py-8 h-full main-font text-center'>
            <div className="flex items-center justify-center w-20 h-20 
            rounded-full bg-[#F48691] mb-6">
                <div className="flex justify-center items-center w-12 h-12
                bg-white rounded-full">
                    <Check className='text-[#F57C8A] w-8 stroke-4' />
                </div>
            </div>
            <h1 className={heading}>
                Thank you!
            </h1>
            <p className={description}>
                Thanks for confirming your subscription! We hope you have 
                fun using our platform. If you ever need support, please feel 
                free to email us at support@loremgaming.com.
            </p>
        </div>
    )
}
