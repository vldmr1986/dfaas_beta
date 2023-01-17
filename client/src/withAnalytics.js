import ReactGA from 'react-ga';
import {useEffect} from "react";

export const WithAnalytics = (props)=>{
    useEffect(()=>{
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return props.children;
}


