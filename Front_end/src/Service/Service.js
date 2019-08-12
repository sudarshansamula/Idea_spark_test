export const Service = {
    callApi: async (request) => {
        try {
            let response = await fetch(
                request.url,
                {
                    method:request.method,
                    headers:request.headers,
                    body:request.query
                }
            );
            if (isValidResponse(response)) {
               const data = await response.json();
               console.log("data******",data)
               return data;
            }            
        } catch (e) {
            throw e;
        }
    }
}

const isValidResponse = (response) => {
   if (response.status === 200) {
        return response;
    } else {
        throw response;
    }
}