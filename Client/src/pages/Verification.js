import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import verifySuccessImage from '../Images/verifyImage.png';
import verifyErrorImage from '../Images/verifyWrongImage.png';
import axios from 'axios';

function Verification() {
    const { token } = useParams();
    const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(false);
    const [isVerificationComplete, setIsVerificationComplete] = useState(false);

    useEffect(() => {
        if (isVerificationSuccessful) {
            setTimeout(() => {
                window.location.href = '/signin';
            }, 1000);
        }
    }, [isVerificationSuccessful]);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.post(`/api/user/verify/${token}`);
                if (response.data.status === 'success') {
                    setIsVerificationSuccessful(true);
                } else {
                    setIsVerificationSuccessful(false);
                }
            } catch (error) {
                setIsVerificationSuccessful(false);
            } finally {
                setIsVerificationComplete(true);
            }
        };
        verifyUser();
    }, [token]);

    return (
        <div className="osahan-verify">
            <div className="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
                <center>  <h5 className="font-weight-normal mb-0 text-white">
                    <a className="text-danger mr-3" href="/getstart">
                        <i className="icofont-rounded-left"></i>
                    </a>
                    <h2>Account Verification</h2>
                </h5></center>
            </div>
            <div className="p-3">
                {isVerificationComplete && (
                    <div>
                        {isVerificationComplete && (
                            <div>
                                {isVerificationSuccessful ? (
                                    <div>
                                        <center><p>Account Verified successfully.</p></center>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={verifySuccessImage} alt="Verification Successful" />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <center><p>Verification failed. Please try again.</p></center>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={verifyErrorImage} alt="Verification Failed" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Verification;
