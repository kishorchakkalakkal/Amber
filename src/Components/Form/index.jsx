import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import 'parsleyjs';
import classes from './form.module.css'

function Form( { subject } ) {

    const fileInputtext = useRef()

    const [formData, setFormData] = useState({
        subject: subject,
        name: "",
        email: "",
        phone: ""
    });

    const [file, setFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        $('#requestForm').parsley();
    }, []);

    const fileLabel = subject === 'Job Profile' ? 'Work Profile' : 'CV/Resume'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setResponseMessage("Please wait...");

        const data = new FormData();
        data.append('subject', formData.subject);
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        if (file) {
        data.append('file', file);
        }

        try {
            const response = await fetch('https://viralfever.in/amber/mailer/sendmail.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: data,
            });
      
            const result = await response.json();
            //setResponseMessage(result.message);
            setResponseMessage("Thank you for your submission. We'll get back to you shortly!");
          } catch (error) {
            setResponseMessage('An error occurred. Please try again.');
            console.error('Error:', error);
          }
    }

    return (
        <div className={`${classes.formWrap}`} >
            <form id='requestForm' onSubmit={handleSubmit} encType="multipart/form-data" >
                <input type='hidden' name='subject' id='subject' value={subject} />
                <div className='row gy-4 gx-5 justify-content-end'>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label>Name *</label>
                            <input 
                                type='text' 
                                name='name' 
                                id='name' 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                className='form-control'
                                data-parsley-trigger="keyup"
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <label>Phone *</label>
                            <input 
                                type='text' 
                                name='phone' 
                                id='phone' 
                                value={formData.phone} 
                                onChange={handleChange} 
                                required 
                                className='form-control'
                                data-parsley-trigger="keyup"
                                data-parsley-type="digits"
                                minLength="6"
                                maxLength="12"
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <label>Email *</label>
                            <input 
                                type='email' 
                                name='email' 
                                id='email' 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                className='form-control'
                                data-parsley-trigger="keyup"
                            />
                        </div>
                    </div>
                    <div className='col-12'>
                        <label>{fileLabel} *</label>
                        <div className={`${classes.fileInput}`}>
                            <input 
                                type='file' 
                                name='cv' 
                                id='cv' 
                                onChange={handleFileChange} 
                                required 
                                accept='application/pdf'
                                className='form-control'
                                data-parsley-required="true"
                                data-parsley-filemaxsize="2048"
                                data-parsley-filemaxsize-message="File size should not exceed 2MB."
                            />
                            <span ref={fileInputtext} >No file selected.</span>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row align-items-center'>
                            <div className='col'>
                                {responseMessage && <p className='m-0' >{responseMessage}</p>}
                            </div>
                            <div className='col-auto'>
                                <button type="submit" className="btn btn-submit w-100">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form