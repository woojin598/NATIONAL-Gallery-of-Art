import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from './Contact.module.css';

const Contact = () => {
    return (
        <div className={`container-xxl py-5`}>
            <div className={`container`}>
                <div className={`text-center wow fadeInUp`} data-wow-delay="0.1s">
                    <h5 className={styles.sectionTitle}>NATIONAL GALLERY OF ART</h5>
                    <h1 className={styles.customFont}>Contact For Any Query</h1>
                </div>
                <div className="row g-4">
                    <div className={`col-lg-4 col-md-6 wow fadeInUp ${styles.contactContainer}`} data-wow-delay="0.1s">
                        <h5 className={styles.contactHeader}>Get in Touch</h5>
                        <p className={styles.contactDescription}>NATIONAL GALLERY OF ART에 대해<br /> 궁금한 사항은 문의해주세요.<br /> 문의주신 내용은 담당자 확인 후 <br />신속하게 답변을 드리도록 하겠습니다.</p>
                        <h5 className={styles.contactTitle}>Office</h5>
                        <p className={styles.contactInfo}>서울특별시 마포구 노고산동 신촌로 94</p>
                        <h5 className={styles.contactTitle}>Mobile</h5>
                        <p className={styles.contactInfo}>+012 345 67890</p>
                        <h5 className={styles.contactTitle}>Email</h5>
                        <p className={styles.contactInfo}>info@example.com</p>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp">
                        <iframe className="position-relative rounded w-100 h-100"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d197.68776709694592!2d126.9359613!3d37.5549631!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c99c095008d7b%3A0xe42795a7607f9d24!2z7J20656c65Oc67O17ZWp6rSAIOyLoOy0jOygkA!5e0!3m2!1sko!2sus!4v1690424785271!5m2!1sko!2sus"
                            frameborder="0" style={{ minHeight: "300px", border: "0" }} allowFullScreen={true} aria-hidden={false}
                            tabIndex={0}></iframe>
                    </div>
                    <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                        <Form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <Form.Control type="text" id="name" placeholder="Your Name" />
                                        <label htmlFor="name">Your Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <Form.Control type="email" id="email" placeholder="Your Email" />
                                        <label htmlFor="email">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <Form.Control type="text" id="subject" placeholder="Subject" />
                                        <label htmlFor="subject">Subject</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <Form.Control as="textarea" placeholder="Leave a message here" id="message" style={{ height: "100px" }} />
                                        <label htmlFor="message">Message</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <Button className="w-100 py-3" type="submit" style={{ backgroundColor: "#3f51b5" }}>Send Message</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;






