// // components/TawkMessenger.jsx
// "use client";

// import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
// import { useEffect, useRef } from 'react';

// const TawkMessenger = ({
//     propertyId = "5d23319f22d70e36c2a4ad4a",
//     widgetId = "1is6fmlf2"
// }) => {


//     const initialRenderRef = useRef(false);

//     useEffect(() => {
//         initialRenderRef.current = true;
//     }, []);

//     return (
//         <div>

//             {
//                 initialRenderRef.current && (
//                     <TawkMessengerReact
//                         propertyId={propertyId}
//                         widgetId={widgetId}
//                         onLoad={() => { }}
//                         onBeforeLoad={() => { }}
//                         onStatusChange={() => { }}
//                         onChatMaximized={() => { }}
//                         onChatMinimized={() => { }}
//                         onChatHidden={() => { }}
//                         onChatStarted={() => { }}
//                         onChatEnded={() => { }}
//                     />
//                 )
//             }
//         </div>
//     );
// };

// export default TawkMessenger;
