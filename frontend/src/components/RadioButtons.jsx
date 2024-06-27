
const RadioButtons = ({ inputValue, change}) => {
    return (
        <div className='flex gap-2 py-1'>
            <input
                name="r"
                type="radio"
                value={inputValue}
                onChange={change}
                className='w-4'
            />
            <label className='text-lg font-semibold'>
                {inputValue}
            </label>
        </div>
    );
};

export default RadioButtons;