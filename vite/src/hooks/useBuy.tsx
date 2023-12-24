import { useState } from "react";
import { useAuth } from ".";


export default async () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [toggler, toggle] = useState<boolean>(false)
  const token = useAuth()

  const buy = async () => {
    setLoading(true)
    const response = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({token, op: 'can_buy_a_card'}),
		})

    const data = await response.json()
    if (response.ok) toggle(!toggler)
    else throw new Error(data.message)
    setLoading(false)
  }

  return [ buy, loading, toggler ]
}