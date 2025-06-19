import { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';

type Role = 'admin' | 'user';

function App() {
	const { tg, initData, user } = useTelegram();
	const [role, setRole] = useState<Role | null>(null);

	useEffect(() => {
		tg.ready();
		tg.expand();
	}, []);

	const API_URL = 'http://localhost:7001/api/get-role';

	// Отправляем его на бэкенд
	fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ initData }),
	})
		.then((res) => res.json())
		.then((data: { role: Role }) => {
			setRole(data.role);
		})
		.catch(console.error);

	return (
		<div style={{ padding: 20, fontFamily: 'sans-serif' }}>
			<h1>
				Вы — {role === 'admin' ? 'администратор' : 'обычный пользователь'}
			</h1>
			<div>
				{user?.id}
				{user?.username}
				{user?.first_name}
			</div>
		</div>
	);
}

export default App;
