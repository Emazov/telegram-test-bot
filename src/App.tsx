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

	const API_URL = 'https://telegram-bot-test-server.onrender.com';

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
				<p>ID: {user?.id}</p>
				<p>Username: {user?.username}</p>
				<p>First Name: {user?.first_name}</p>
			</div>
		</div>
	);
}

export default App;
