export type Request = {
    caller?: string | null
    op: string
    data?: any
}

export type Response = {
    code: number
    message?: string
    error?: string
    data?: any
}

export default async ({caller, op, data}: Request): Promise<Response> => {
  const body: Partial<Request> = { op }
  if (caller !== undefined) {body.caller = caller}
  if (data !== undefined) {body.data = data}

  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return await response.json()
};
