import React, {useEffect, useState} from 'react';
import {
    Anchor, Button,
    Box, Form, FormField, Heading, Select, Spinner, Text, TextInput
} from "grommet";
import {fetchAvailableSpaces, fetchCountries, fetchSignUp} from "../actions";
import Modal from "./modals/modal";
import licenseContent from "../euula.pdf";

const DEFAULT_COUNTRIES = [{label: "Select Country", value: ""}];
const LABEL_WIDTH = "100px";

function SignUp() {
    const [isLoading, setIsLoading] = useState(true);
    const [showAgreement, setShowAgreement] = useState(false);
    // const [acceptedAgreement, setAcceptedAgreement] = useState(false);
    const [countries, setCountries]  = useState(DEFAULT_COUNTRIES);
    const [spaces, setSpaces]  = useState(null);
    const [signupStatus, setSignupStatus] = useState({
        error: null,
        isInitialised: false,
        isFetchingSignup: false,
        isSuccess: false
    });

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        surname: "",
        country: "",
    });

    const onSubmit = ()=>{
        setSignupStatus({
            error: null,
            isInitialised: true,
            isFetchingSignup: true,
            isSuccess: false
        })
        const signupData = {
            email: formData.email.trim(),
            name: formData.name.trim(),
            surname: formData.surname.trim(),
            country: formData.country.value,
            };
        fetchSignUp(signupData)
            .then(resp=>{
                if (resp?.status === "OK") {
                    setSignupStatus({ error: null,
                        isInitialised: true,
                        isFetchingSignup: false,
                        isSuccess: true
                    })
                    localStorage.setItem("isRegistered", "1");
                } else {
                    setSignupStatus({
                        error: resp?.message || "backend error",
                        isInitialised: true,
                        isFetchingSignup: false,
                        isSuccess: false
                    })
                }
            }).catch((err)=>{
                setSignupStatus({
                    error: err,
                    isInitialised: true,
                    isFetchingSignup: false,
                    isSuccess: false
                })
        })
    }
    useEffect(()=>{
            fetchAvailableSpaces().then((data)=>{
                if (data?.status === "OK"){
                    setSpaces(data?.data || [])
                }
            }).finally(()=>{
                setIsLoading(false)
            });

        fetchCountries().then((data)=>{
            if (data?.status === "OK"){
                setCountries([
                    ...DEFAULT_COUNTRIES,
                    ...data?.data || []
                ])
            }
        });
    }, []);
    if (signupStatus.isSuccess ||  localStorage.getItem("isRegistered") === "1") {
        return <Box>
            <Box align={"center"} justify={"center"}>
                <Heading level={4}>Registration is complete.</Heading>
            </Box>
            <Text size={"large"}>
                Please check your email and activate your HPE consumer account with the link provided in the email.<br/>
                Once your account is activated, you can access your fabric by clicking
                <Anchor margin={{left: "xsmall"}} href="https://client.greenlake.hpe-gl-intg.com" label="HPE Ezmeral Data Fabric" />
            </Text>
        </Box>
    }

    if (spaces !== null && !spaces?.length) {
        return <Box>
            <Box align={"center"} justify={"center"}>
                <Text>We are unable to activate early access for HPE Ezmeral Data Fabric. We have noted your request and someone from HPE Ezmeral will connect with you via the email you provided.</Text>
            </Box>
        </Box>
    }
    if (isLoading || signupStatus.isFetchingSignup){
        return  <Box align={"center"} justify={"center"}>
            <Spinner size={"medium"} />
        </Box>
    }

    return (
            <Form
                value={formData}
                onChange={nextValue => setFormData(nextValue)}
                onSubmit={onSubmit}
            >
                <Heading level={4} >
                    Sign up for Ezmeral Data Fabric early access
                </Heading>
                <Box>
                    <Box direction={"row"} width={"100%"}>
                    <Box direction={"row"}  width={"50%"}>
                        <Box width={LABEL_WIDTH} justify={"center"} >
                                <Text>Name*</Text>
                        </Box>
                        <Box>
                            <FormField
                                htmlFor="text-input-id-name"
                                name="name"
                            >
                                <TextInput
                                    autoFocus={true}
                                    id="text-input-id-name"
                                    name="name"
                                />
                            </FormField>
                        </Box>
                    </Box>
                    <Box direction={"row"}  width={"50%"}>
                        <Box justify={"center"} width={LABEL_WIDTH}>
                            <Text>Surname*</Text>
                        </Box>
                        <Box>
                            <FormField
                                htmlFor="text-input-id-name"
                                name="surname"
                            >
                                <TextInput
                                    id="text-input-id-name"
                                    name="surname"
                                />
                            </FormField>
                        </Box>
                    </Box>
                        </Box>
                    <Box direction={"row"}>
                        <Box width={LABEL_WIDTH} justify={"center"} >
                            <Text>Email*</Text>
                        </Box>
                        <Box >
                            <FormField
                                htmlFor="text-input-id-email"
                                name="name"
                            >
                                <TextInput
                                    id="text-input-id-email"
                                    name="email"
                                />
                            </FormField>
                        </Box>
                    </Box>
                    <Box direction={"row"}>
                        <Box width={LABEL_WIDTH} justify={"center"} >
                            <Text>Country*</Text>
                        </Box>
                        <Box width={"400px"}>
                            <FormField htmlFor="select-size" name={"country"} className={"width-50"}>
                                <Select
                                    id="select-country"
                                    placeholder="Select Country"
                                    options={countries}
                                    labelKey={"label"}
                                    valueKey={"value"}
                                    onChange={({ option }) => setFormData({
                                        ...formData,
                                        country: option
                                    })}
                                    value={formData.country}
                                />
                            </FormField>
                        </Box>
                    </Box>
                </Box>
                {signupStatus.error
                    ? <Box margin={{top: "small"}}><Text weight={"bold"} color={"red"} size={"medium"}>Error: {signupStatus.error}</Text></Box>
                    : null
                }
                <Box margin={{vertical: "medium"}}  align={"center"} direction={"row"}>
                    <Button
                        primary
                        label={"Read license and Register "}
                        onClick={()=>setShowAgreement(true)}
                    />
                    {/*<Anchor onClick={()=>setShowAgreement(true)} label={"Please click here to read the end user license agreement and register"}/>*/}
                    {/*<Text size={"large"} margin={{right: "medium"}}>End User License Agreement*</Text>*/}
                    {/*<Button label={"Read and accept"} onClick={()=>setShowAgreement(true)} secondary={true}/>*/}
                </Box>
                <Text>
                    Once registration is complete, you will receive an email with the link to activate your HPE consumer account. <br/>Once your account is activated, login at
                    <Anchor margin={{horizontal: "xsmall"}} href={"https://client.greenlake.hpe-gl-intg.com/"} label={"https://client.greenlake.hpe-gl-intg.com/"}/>
                    for early access.
                </Text>
                {/*<Button*/}
                {/*    label={"Register"}*/}
                {/*    type={"submit"}*/}
                {/*    primary={true}*/}

                {/*/>*/}
                {showAgreement && <Modal
                    displayPrimaryButton
                    displaySecondaryButton
                    width
                    // full
                    isPrimaryBtnIsSubmit
                    isPrimaryBtnDisabled={signupStatus.isFetchingSignup || isLoading || !formData.name || !formData.email || !formData.country || !formData.surname}
                    onSecondaryClick={()=>setShowAgreement(false)}
                    onClose={()=>setShowAgreement(false)}
                    secondaryLabel={"Exit"}
                    primaryLabel={"Accept and Register"}
                    onPrimaryClick={()=> {
                        onSubmit();
                        setShowAgreement(false)
                    }}
                >
                    <Box>
                        <object
                            className="pdf-area"
                            data={licenseContent}
                        >
                        </object>
                    </Box>
                </Modal>}
            </Form>
    );
}

export default SignUp;