const ADMIN_BASE_URL = "http://localhost:8081/admin";
const EMPLOYEE_BASE_URL = "http://localhost:8082/employee";
const CLIENT_BASE_URL = "http://localhost:8082/client";
const TOKEN =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDc2NzYxNzEsImlhdCI6MTcwNzA3MTM3MSwiaXNzIjoidS1zdXNoaSIsInVzZXJUeXBlIjoiQWRtaW4ifQ.jissKfOKFQ6n-o5YD2P6KrkD06X9K0kEAEagsxndPL4-5SebZC1lxUxjZXUD25AWuWoTfrww0IexH25Vt7ffrTftVGiwM5CoLv8YFu6e8_tBLm5KnnkJMyC4qeH8du3C6WDxhZx9LpYPh_qrGJCdVKpL_PcASNHuBQxA-wYa81hcTsqCE3TrWxMdFGoDzqGr25-vrdiulOUySiMwtCSAUt8RdhWLUY_lQo5wjhmSK1oL0943Wp4D5ef_6koMPvLWWpOXzYR4-XCznih9WVPmbQAuejGUNFe0AjaSzkTUSqGlHcLcQu81XafmbjUArqRuPwJMnnnz42pwQCOrG-iNgA";

export async function fetchTable<T>(url: string): Promise<T[]> {
  const req = await fetch(`${ADMIN_BASE_URL}/${url}`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  return req.json();
}

export async function createReq(url: string, body: any): Promise<Response> {
  const res = await fetch(`${ADMIN_BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      Authorization: TOKEN,
    },
    body: JSON.stringify(body),
  });
  return res;
}

export async function updateReq(
  url: string,
  body: any,
  { method } = { method: "PUT " }
): Promise<Response> {
  const res = await fetch(`${ADMIN_BASE_URL}/${url}`, {
    method: method,
    headers: {
      Authorization: TOKEN,
    },
    body: JSON.stringify(body),
  });
  return res;
}

export async function deleteReq(url: string): Promise<Response> {
  const res = await fetch(`${ADMIN_BASE_URL}/${url}`, {
    method: "DELETE",
    headers: {
      Authorization: TOKEN,
    },
  });
  return res;
}
