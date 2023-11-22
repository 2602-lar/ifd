import { toast } from "react-toastify";

export const TxtInput = ({ label, type, value, setvalue, id, placeholder }) => {
    return (
        <div className='flex flex-col self-center w-full py-2'>
            <div>
                <label>{label}</label>
            </div>
            <div className="border-2 border-gray-400 border-solid rounded-lg">
                <input
                    className='w-full p-2 rounded-lg'
                    id={id}
                    type={type}
                    value={value}
                    onChange={e => setvalue(e.target.value)}
                    placeholder={placeholder} />
            </div>
        </div>
    )
}

export const SelectInput = ({ options, label, value, setvalue, id }) => {
    return (
        <div className='flex flex-col self-center w-full py-2'>
            <div>
                <label>{label}</label>
            </div>
            <div className=" border-2 border-black border-solid h-10 rounded-lg">
                <select
                    value={value}
                    onChange={e => setvalue(e.target.value)}
                    className="w-full h-full rounded-lg"
                    id={id}
                >
                    <option selected disabled value={''}>Click to select an option</option>
                    {options.map(options => {
                        return (
                            <option className="w-full h-full ">{options.option}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export const FileInput = ({ label, value, setvalue, id }) => {

    const handleChange = (e) => {
        const uploadedfile = e.target.files
        console.log(uploadedfile[0].type.slice(0, 5))
        if (uploadedfile) {
            if (uploadedfile[0].type.slice(0, 5) === 'image') {
                setvalue(uploadedfile[0])
                console.log('image')
            } else {
                console.log('not image')
                const uploader = document.getElementById(id)
                uploader.value = null
                toast.warning('Please select a jpeg, jpg, tif or png image format for logo .')
            }
        }

    }

    return (
        <div className='flex flex-col self-center w-full py-2'>
            <div>
                <label>{label}</label>
            </div>
            <div className="border-2 border-[#5a62f7] border-solid rounded-lg">
                <input
                    className='w-full p-2'
                    id={id}
                    type='file'
                    value={value}
                    onChange={e => handleChange(e)}
                />
            </div>
        </div>
    )
}