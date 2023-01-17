import React from "react";
import ReactGA from 'react-ga';
import {DfHeaderbar} from "./components";
// import SignUp from "./components/signupForm";
import {SignupPage, SignupSuccessPage, SignupWarningPage} from "./pages";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {WithAnalytics} from "./withAnalytics";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true, staleTime: 60 * 1000, cacheTime: 60 * 1000,
        },
    },
});

ReactGA.initialize('UA-254359085-1');

function App() {
    return (<QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WithAnalytics>
                        <SignupPage/>
                    </WithAnalytics>}/>
                    {/* <Route path="/" element={<SignUp />} /> */}
                    <Route
                        path="/success"
                        element={<WithAnalytics>
                            <DfHeaderbar/>
                            <SignupSuccessPage/>
                        </WithAnalytics>}
                    />
                    <Route
                        path="/error"
                        element={<WithAnalytics>
                            <DfHeaderbar/>
                            <SignupWarningPage/>
                        </WithAnalytics>}
                    />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
        </QueryClientProvider>);
}

export default App;
