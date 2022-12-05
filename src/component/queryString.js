export function queryStringJson() {
    const query = new URLSearchParams(window.location.search);
    let qs = query.toString().split("&");
    let fqs = {};
    if (qs[0]) {
      fqs = qs.reduce((final, curr) => {
        const [key, value] = curr.split("=");
        final[key] = value;
        return final;
      }, {});
    }
  
    return {
      isQueryString: !!qs[0],
      queryString: fqs,
    };
  }
  