import { useEffect } from 'react';

const tg = window.Telegram.WebApp;

function App() {
	useEffect(() => {
		tg.ready();
		tg.expand();
	}, []);

	const onClose = () => {
		tg.close();
	};

	const ADMIN_ID = 6842203850;
	const user = tg.initDataUnsafe.user;
	const isAdmin = user?.id === ADMIN_ID;

	return (
		<div style={{ padding: 20, fontFamily: 'sans-serif' }}>
			<h1>Вы — {isAdmin ? 'администратор' : 'обычный пользователь'}</h1>
			<button onClick={onClose}>Закрыть</button>
		</div>
	);
}

export default App;
