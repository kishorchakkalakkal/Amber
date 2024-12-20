import React, { useState } from 'react'
import contactGIF from '../../assets/lottie/Contact-Animation-1734379789543.lottie'
import Form from '../Form'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Modal } from 'react-bootstrap';


function Footer() {

  const [ workMailCopied, setWorkMailCopied ] = useState( false )
  const [ enqMailCopied, setEnqMailCopied ] = useState( false )

  const handleCopyItem = (mail) => {
    navigator.clipboard.writeText(mail)
  }

  const [showModal1, setShowModal1] = useState(false);

  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const [showModal2, setShowModal2] = useState(false);

  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  return (
    <>
      <footer className='siteFooter'>
        <div className='siteFooter_Contact'>
          <div className='imgLeft' >
            <DotLottieReact
              loop
              autoplay
              src={contactGIF}
            />
          </div>
          <div className='siteFooter_Contact_item' onClick={() => {
            handleCopyItem( 'business@ambercomm.ae' )
            setWorkMailCopied(true)
          }} >
            <hr />
            <h6 className='hasHover' >
              <span>{ !workMailCopied ? 'Got a communication problem?' : 'E-mail copied to clipboard' }</span>
              <span>Copy e-mail</span>
            </h6>
            <h5>
            Partner with us
            </h5>
            <h4>
              business@ambercomm.ae
            </h4>
          </div>
          <div className='siteFooter_Contact_item' onClick={() => {
            handleCopyItem(  'info@ambercomm.ae' )
            setEnqMailCopied(true)
          }} >
            <hr />
            <h6 className='hasHover' >
              <span>{ !enqMailCopied ? 'Just want to say hi?' : 'E-mail copied to clipboard' }</span>
              <span>Copy e-mail</span>
            </h6>
            <h5>
            Drop us a line
            </h5>
            <h4>
              info@ambercomm.ae
            </h4>
          </div>
          <div className='siteFooter_Contact_item' onClick={handleShowModal1} >
              <hr />
              <h6>
                <span>Want to join the collective?</span>
              </h6>
              <h5>
                Send us your work
              </h5>
              <h4>
                Apply here
              </h4>
          </div>
          <div className='siteFooter_Contact_item' onClick={handleShowModal2} >
              <hr />
              <h6>
                <span>Want to Learn?</span>
              </h6>
              <h5>
                Become an intern
              </h5>
              <h4>
                Apply here
              </h4>
          </div>
        </div>
        <div className='siteFooter_Locations' id='contact_section' >
          <h3 className='mb-3' >
          When work isn't a job.
          </h3>
          <p className='mb-4' >
          Out with the mundane and in with the untapped. Be it working with us or for us, you
          can be sure of work that works. Get in touch and we can talk about the possibilities.
          </p>
          <div className='d-flex'>
            <div className='siteFooter_Locations_item'>
              <a href='https://maps.app.goo.gl/DCn54aL3TWoZBFPEA' target='_blank' title='View on maps' >
                <h5>
                Dubai
                </h5>
                <p>
                Office 229-232, Building 7<br />
                Dubai Media City<br />
                PO Box 502161<br />
                Dubai, UAE
                </p>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Modal show={showModal2} onHide={handleCloseModal2} centered >
        <Modal.Header closeButton>
          <h5 className="modal-title fw-semibold" id="BecomeInternLabel">Become an Intern</h5>
        </Modal.Header>
        <Modal.Body>
          <Form subject="Intern Request" />
        </Modal.Body>
      </Modal>
      <Modal show={showModal1} onHide={handleCloseModal1} centered >
        <Modal.Header closeButton>
        <h5 className="modal-title fw-semibold" id="JobProfileLabel">Send us your work</h5>
        </Modal.Header>
        <Modal.Body>
        <Form subject="Work Profile" />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Footer