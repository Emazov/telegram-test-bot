import { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';

type Role = 'ADMIN' | 'USER';

function App() {
	const { tg, initData } = useTelegram();
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
				Вы — {role === 'ADMIN' ? 'администратор' : 'обычный пользователь'}
			</h1>
		</div>
	);
}

export default App;
