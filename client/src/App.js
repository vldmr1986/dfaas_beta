import React from "react";
import ReactGA from 'react-ga';
import {DfHeaderbar} from "./components";
// import SignUp from "./components/signupForm";
import {SignupPage, SignupSuccessPage, SignupWarningPage} from "./pages";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true, staleTime: 60 * 1000, cacheTime: 60 * 1000,
        },
    },
});

if (process.env.NODE_ENV === "production") {
    ReactGA.initialize('UA-254359085-1');
}

function App() {
    return (<QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <SignupPage/>
                    }/>
                    {/* <Route path="/" element={<SignUp />} /> */}
                    <Route
                        path="/success"
                        element={
                            <>
                                <DfHeaderbar/>
                                <SignupSuccessPage/>
                            </>
                        }
                    />
                    <Route
                        path="/error"
                        element={
                            <>
                                <DfHeaderbar/>
                                <SignupWarningPage/>
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
        </QueryClientProvider>);
}

export default App;
