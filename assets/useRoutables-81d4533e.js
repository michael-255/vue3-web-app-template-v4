import{b8 as I,bg as D,t as R,K as u}from"./index-ef11a4d2.js";function V(){const r=I(),a=D(),{log:t}=R(),p=Array.isArray(r.params.id)?r.params.id[0]:r.params.id,n=Array.isArray(r.params.coreId)?r.params.coreId[0]:r.params.coreId,i=Array.isArray(r.params.type)?r.params.type[0]:r.params.type,d=Array.isArray(r.params.group)?r.params.group[0]:r.params.group,g=p||void 0,m=n||void 0,y=i||void 0,h=d||void 0;function l(){try{a.push({name:u.Values.DataLogs})}catch(o){t.error("Error accessing logs data route",o)}}function f(o,e){try{a.push({name:u.Values.DataRecords,params:{group:o,type:e}})}catch(s){t.error("Error accessing records data route",s)}}function A(o,e,s){try{a.push({name:u.Values.Create,params:{group:o,type:e,coreId:s}})}catch(c){t.error("Error accessing create route",c)}}function b(o,e,s){try{a.push({name:u.Values.Edit,params:{group:o,type:e,id:s}})}catch(c){t.error("Error accessing edit route",c)}}function E(){var o,e,s;try{(s=(e=(o=a==null?void 0:a.options)==null?void 0:o.history)==null?void 0:e.state)!=null&&s.back?a.back():a.push({name:u.Values.Dashboard})}catch(c){t.error("Error accessing go back route",c)}}return{routeId:g,routeCoreId:m,routeType:y,routeGroup:h,goToLogsData:l,goToRecordsData:f,goToCreate:A,goToEdit:b,goBack:E}}export{V as u};
