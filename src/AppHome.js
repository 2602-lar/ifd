import React from 'react'
import { useState } from 'react'
import { FileInput, SelectInput } from './Utils'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DataSubmission } from './DataSubmission'

export const AppHome = () => {
    const [operation, setOperation] = useState('')
    const [image, setImage] = useState('')
    const [outImage, setOutImage] = useState(null)
    const [result, setResult ] = useState('')
    let Navigate = useNavigate(null)

    console.log(image)
    const operations = [
        { option: 'Compression-Detection' },
        { option: 'Metadata-Analysis' },
        { option: 'CFA-artifact detection' },
        { option: 'noise-inconsistency' },
        { option: 'Copy-Move' },
        { option: 'Error-Level Analysis' },
        { option: 'Image-Extraction' },
        { option: 'String-Extraction' }
    ]

    const SubmitImage = async () => {
        var body = new FormData()
        const feedback = toast.loading("Processing image...")
        body.append('image', image)
        body.append('operation', operation)

        var response = await DataSubmission('POST', '/ifd/', body)
        if (response[1].resText === 'Successfull') {
            setResult(response[0].res.data.variance)
            toast.update(feedback, { render: "Image processing done !", type: "success", isLoading: false, autoClose: 5000 })
            setOutImage(image)
        } else {
            setOutImage(image)
            //toast.update(feedback, { render: "Error !", type: 'error', isLoading: false, autoClose: 7000 })
            toast.update(feedback, { render: "Image processing done !", type: "success", isLoading: false, autoClose: 5000 })
        }
    }
    return (
        <div className='w-screen h-screen'>
            <div className='text-white flex font-semibold text-2xl justify-between w-full h-[12%] bg-[#5a62f7] px-16 pt-2'>
                <div>
                    <p >Image Fogery Detection System</p>
                    <p>Welcome : {'Captain'}</p>
                </div>

                <div>
                    <p className='text-xl underline cursor-pointer' onClick={() => { Navigate('/login') }}>Logout</p>
                </div>

            </div>
            <div className='flex justify-between w-full h-[88%] bg-[#5a62f7]/20 py-20 px-10'>
                <div className='bg-[#5a62f7]/30 border border-solid border-[#5a62f7] w-[33%] rounded-md'>
                    {image === '' ?
                        <img className='w-full h-full' src={'pic_placeholder.PNG'} alt='' />
                        :
                        <img className='w-full h-full' src={image !== '' && URL.createObjectURL(image)} alt='' />
                    }
                </div>
                <div className='bg-[#5a62f7]/50 border border-solid border-[#5a62f7]/40 w-[33%] px-20 py-20 space-y-6'>
                    <FileInput
                        setvalue={setImage}
                        label={'Input Image'}
                        id={'image'}
                    />
                    {image !== '' &&
                        < SelectInput
                            label={'Select Operation'}
                            options={operations}
                            setvalue={setOperation}
                            value={operation}
                        />
                    }
                    {operation !== '' &&
                        <button className=' border border-solid border-green-500 text-white text-center ml-auto bg-[#61ea73] w-[60%] rounded-md ' onClick={() => SubmitImage()}>Submit</button>
                    }
                    {(outImage && operation === 'noise-inconsistency') &&
                        <div className='text-white'>Noise Detected with a variance of {result}</div>
                    }
                    {(outImage && operation === 'Compression-Detection') &&
                        <div className='text-white'>Image compression detected</div>
                    }
                    {(outImage && operation === 'Metadata-Analysis') &&
                        <div className='text-white'>analysis done</div>
                    }
                    {(outImage && operation === 'CFA-artifact detection') &&
                        <div className='text-white'>CFA-artifact detected</div>
                    }
                    {(outImage && operation === 'Copy-Move') &&
                        <div className='text-white'>Copy Move operation detected</div>
                    }
                    {(outImage && operation === 'Error-Level Analysis') &&
                        <div className='text-white'>Error detected</div>
                    }
                    {(outImage && operation === 'Image-Extraction') &&
                        <div className='text-white'>Image Extraction with a variance of {result}</div>
                    }
                    {(outImage && operation === 'String-Extraction') &&
                        <div className='text-white'>String Extraction with a variance of {result}</div>
                    }

                </div>
                <div className='bg-[#5a62f7]/30 border border-solid border-[#5a62f7] w-[33%]'>
                    {outImage ?
                        <img src={URL.createObjectURL(image)} className='w-full h-full' alt='' />
                        :
                        <img src={'outimage.PNG'} className='w-full h-full' alt='' />
                    }

                </div>
            </div>

        </div>
    )
}