import { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';

type Role = 'admin' | 'user';

function App() {
	const { tg, initData } = useTelegram();

	const [role, setRole] = useState<Role | null>(null);
	const [user, setUser] = useState<any>(null);

	const API_URL = 'http://localhost:7001/api/auth';

	useEffect(() => {
		tg.ready();
		tg.expand();

		fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `tma ${initData}`,
			},
		})
			.then(async (res) => {
				if (!res.ok) {
					const err = await res.json();
					throw new Error(err.error || 'Неизвестная ошибка');
				}
				return res.json();
			})
			.then((data) => {
				setRole(data.role);
				setUser(data.user);
				console.log('Авторизация успешна', data);
			})
			.catch(console.error);
	}, []);

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
