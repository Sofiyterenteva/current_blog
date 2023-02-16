export function postFetch(endpint, bodyObj) {
        return fetch(endpint, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          body: JSON.stringify(bodyObj),
        })
          .then(res => {
            return res.json();
          })
          .then(res => {
            if (res.success){
             console.log(res);
              return res;
            }
            throw Error(JSON.stringify(res));
          })
          .catch(e => {
            console.log(e);
            return{};
          });
}

export function getFetch(endpint, auth) {
  console.log(auth);
  return fetch(endpint, {
  headers: {
    Authorization: auth, 
  },
  method: 'GET',
  redirect: 'follow',
  })
  .then(res => {
  return res.json();
})
  .then(res => {
    if (res.success){
      return res;
    }
    throw Error(JSON.stringify(res));
  })
  .catch(e => {
    console.log(e);
    return {};
  });
}