import React from 'react';
import Demo from "./demo/demo";
import DemoExample from "./demo/example";


const IconExample: React.FunctionComponent = () => {
 return(
   <Demo code={require('!!raw-loader!./demo/example').default}>
     <DemoExample/>
   </Demo>
 )
};

export default IconExample;