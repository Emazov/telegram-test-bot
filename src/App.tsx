import { useEffect, useState } from 'react';

type Role = 'ADMIN' | 'USER';

function App() {
	const [role, setRole] = useState<Role | null>(null);

	useEffect(() => {
		// если нет Telegram.WebApp — прекращаем
		if (!(window as any).Telegram?.WebApp) {
			console.warn('Запустите приложение из Telegram');
			return;
		}

		const tg = (window as any).Telegram.WebApp;
		tg.ready();

		const user = tg.initDataUnsafe.user;
		const userId = user?.id;
		if (!userId) {
			console.error('Не удалось получить id пользователя');
			return;
		}

		fetch(`${import.meta.env.VITE_API_URL}/api/user-role`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId }),
		})
			.then((res) => res.json())
			.then((data) => setRole(data.role as Role))
			.catch(() => setRole('USER'));
	}, []);

	if (!role) return <div>Загрузка…</div>;

	return (
		<div style={{ padding: 20, fontFamily: 'sans-serif' }}>
			{role === 'ADMIN' ? (
				<h1>Вы — администратор</h1>
			) : (
				<h1>Вы — обычный пользователь</h1>
			)}
		</div>
	);
}

export default App;
