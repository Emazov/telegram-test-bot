import { useEffect, useState } from 'react';

type Role = 'ADMIN' | 'USER';

function App() {
	const [role, setRole] = useState<Role | null>(null);

	useEffect(() => {
		const tg = (window as any).Telegram.WebApp;
		tg.ready();

		const { id: userId } = tg.initDataUnsafe.user;

		fetch(`${import.meta.env.VITE_API_URL}/api/user-role`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId }),
		})
			.then((res) => res.json())
			.then((data) => setRole(data.role))
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
