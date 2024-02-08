import { SushiUserType } from "../models/sushi_user";

const ADMIN_BASE_URL = "https://u-sushi.it/api/admin";
const EMPLOYEE_BASE_URL = "https://u-sushi.it/api/employee";
const CLIENT_BASE_URL = "https://u-sushi.it/api/client";

export async function fetchLimited<T>(
  url: string,
  { user } = { user: SushiUserType.Admin }
): Promise<T[]> {
  const items = [];
  const limit = 10;
  let offset = 0;
  while (true) {
    const req = await request(`${url}?limit=${limit}&offset=${offset}`, {
      method: "GET",
      body: undefined,
      user: user,
    });
    let others = await req.json();
    items.push(...others);
    if (others.length < limit) {
      return items;
    }
    offset += limit;
  }
}

export async function fetchTable<T>(
  url: string,
  { user } = { user: SushiUserType.Admin }
): Promise<T[]> {
  const req = await request(url, {
    method: "GET",
    body: undefined,
    user: user,
  });
  if (req.status !== 200) {
    return [];
  }
  return req.json();
}

function urlFromUser(user: SushiUserType): string {
  switch (user) {
    case SushiUserType.Admin:
      return ADMIN_BASE_URL;
    case SushiUserType.Client:
      return CLIENT_BASE_URL;
    case SushiUserType.Employee:
      return EMPLOYEE_BASE_URL;
  }
}

function tokenFromUser(user: SushiUserType): string {
  const key = `${user.toUpperCase()}_TOKEN`;
  return localStorage.getItem(key) ?? "";
}

type RequestArgs = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: any;
  user: SushiUserType;
};

async function request(
  url: string,
  { method, body, user }: RequestArgs = {
    method: "POST",
    body: undefined,
    user: SushiUserType.Admin,
  }
) {
  const baseUrl = urlFromUser(user);
  const token = tokenFromUser(user);
  return fetch(`${baseUrl}/${url}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export async function fetchReq<T>(
  url: string,
  { user } = { user: SushiUserType.Admin }
): Promise<T> {
  const req = await request(url, {
    method: "GET",
    body: undefined,
    user: user,
  });
  return req.json();
}

export async function postReq(
  url: string,
  body: any,
  { user }: { user: SushiUserType } = { user: SushiUserType.Admin }
): Promise<Response> {
  return request(url, { method: "POST", body: body, user: user });
}

export async function putReq(
  url: string,
  body: any,
  { user }: { user: SushiUserType } = { user: SushiUserType.Admin }
): Promise<Response> {
  return request(url, { method: "PUT", body: body, user: user });
}

export async function deleteReq(url: string): Promise<Response> {
  return request(url, {
    method: "DELETE",
    body: undefined,
    user: SushiUserType.Admin,
  });
}
